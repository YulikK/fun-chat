import AlertComponent from "@/app/components/alert/alert.ts";
import type AlertStack from "../components/alert-stack/alert-stack.ts";
import getNewId from "../utils/id-generator.ts";
import { UserActions } from "../utils/type.ts";
import type { ServerMessage, User } from "../utils/type.ts";
import type Controller from "../controller/controller.ts";


type serverAnswerError= {
  id: string,
  type: 'ERROR',
  payload: {
    error: string
  },
}

type serverAnswerSuccess = {
  id: string,
  type: UserActions.LOGIN,
  payload: {
    user: {
      login: string,
      isLogined: boolean,
    },
  },
}
export default class Connection {
  private controller: Controller | null = null;

  private readonly END_POINT = `ws://localhost:4000`;

  private alertStack: AlertStack

  private connection: WebSocket | null = null;

  constructor(alertStack: AlertStack) {
    this.alertStack = alertStack;
    this.getNewConnection();
  }

  public setController(controller: Controller): boolean {
    let result = false;
    if (controller) {
      this.controller = controller;
      result = true;
    }
    return result;
  }

  private sendMessage(message: ServerMessage): void {

    if (this.connection) {
      this.connection.send(JSON.stringify(message));
    }

  }

  private getNewConnection(): void {
    const connection = new WebSocket(`${this.END_POINT}`);
    connection.addEventListener('open', () => {
      this.connection = connection;
      this.setListeners(connection);
    });
    connection.addEventListener('error', (event: Event) => {
      if (event instanceof ErrorEvent && event.error && typeof event.error === 'string') {
        const alert = new AlertComponent(this.alertStack, event.error);
        alert.show();
        this.getNewConnection();
      }
    });
  }

  private setListeners(connection: WebSocket): void {
    connection.addEventListener('message', (message: MessageEvent) => {
      if (typeof message.data === 'string') {
        const response: unknown = JSON.parse(message.data);
  
        if (isSuccessAnswer(response) && this.controller) {
          if (response.type === UserActions.LOGIN) {
            const { user } = response.payload;
            this.controller.afterSuccessLogin(user);
          } else if (response.type === UserActions.LOGOUT) {
            const { user } = response.payload;
            this.controller.afterSuccessLogout(user);
          }
          
        } else if (isErrorAnswer(response)) {
          const { error } = response.payload;
          const alert = new AlertComponent(this.alertStack, error);
          alert.show();
        }
      }
    });
    connection.addEventListener('close', () => {
      this.getNewConnection();
    });
  }

  public sendLogin(user: User): void {
    const request: ServerMessage = {
      id: getNewId(),
      type: UserActions.LOGIN,
      payload: {
        user
      },
    };
    this.sendMessage(request);
  }


  public sendLogout(user: User): void {
    const request: ServerMessage = {
      id: getNewId(),
      type: UserActions.LOGOUT,
      payload: {
        user
      },
    };
    this.sendMessage(request);
  }
}

function isSuccessAnswer(entity: unknown): entity is serverAnswerSuccess {
  return Boolean(
    typeof entity === 'object' &&
      entity &&
      'type' in entity &&
      typeof entity.type === 'string' &&
      'id' in entity &&
      typeof entity.id === 'string'
  );
}

function isErrorAnswer(entity: unknown): entity is serverAnswerError {
  return Boolean(
    typeof entity === 'object' &&
      entity &&
      'type' in entity &&
      typeof entity.type === 'string' &&
      entity.type === 'ERROR' &&
      'id' in entity &&
      typeof entity.id === 'string'
  );
}

