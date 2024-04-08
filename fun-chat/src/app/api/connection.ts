import AlertComponent from "@/app/components/alert/alert.ts";
import type AlertStack from "../components/alert-stack/alert-stack.ts";
import getNewId from "../utils/id-generator.ts";
import { UserActions } from "../utils/type.ts";
import type { Auth, ServerMessage, User } from "../utils/type.ts";
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
  type: UserActions,
  payload: {
    user?: User,
    users?: User[] 
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
          this.readResponse(response);
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

  private readResponse(response: serverAnswerSuccess): void {
    if (this.controller && response) {
      switch (response.type) {
        case UserActions.LOGIN: {
          const { user } = response.payload;
          if (user) {
            this.controller.afterSuccessLogin(user);
          }
          break;
        }
        case UserActions.LOGOUT: {
          const { user } = response.payload;
          if (user) {
            this.controller.afterSuccessLogout(user);
          }
          break;
        }
        case UserActions.USER_ACTIVE: {
          const { users } = response.payload;
          if (users) {
            this.controller.afterSuccessGetActiveUsers(users);
          }
          break;
        }
        case UserActions.USER_INACTIVE: {
          const { users } = response.payload;
          if (users) {
            this.controller.afterSuccessGetInactiveUsers(users);
          }
          break;
        }
        default: {
          break;
        }
      }
    }
    
  }

  public sendLogin(user: Auth): void {
    const request: ServerMessage = {
      id: getNewId(),
      type: UserActions.LOGIN,
      payload: {
        user
      },
    };
    this.sendMessage(request);
  }


  public sendLogout(user: Auth): void {
    const request: ServerMessage = {
      id: getNewId(),
      type: UserActions.LOGOUT,
      payload: {
        user
      },
    };
    this.sendMessage(request);
  }

  public sendGetActiveUsers(): void {
    const request: ServerMessage = {
      id: getNewId(),
      type: UserActions.USER_ACTIVE,
      payload: null,
    };
    this.sendMessage(request);
  }

  public sendGetInactiveUsers(): void {
    const request: ServerMessage = {
      id: getNewId(),
      type: UserActions.USER_INACTIVE,
      payload: null,
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
      entity.type !== 'ERROR' &&
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

