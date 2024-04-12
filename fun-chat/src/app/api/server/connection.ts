import AlertComponent from "@/app/components/alert-stack/alert/alert.ts";
import { isSuccessAnswer, isErrorAnswer } from "@/app/utils/utils.ts";
import type AlertStack from "../../components/alert-stack/alert-stack.ts";
import type { ServerAnswer } from "../../utils/type.ts";
import type ServerResponse from "./server-response.ts";

export default class Connection {

  private readonly END_POINT = `ws://localhost:4000`;

  private alertStack: AlertStack

  private connection: WebSocket | null = null;

  private response: ServerResponse;

  constructor(alertStack: AlertStack, response: ServerResponse) {
    this.alertStack = alertStack;
    this.response = response;
    this.getNewConnection();
  }

  public sendMessage(message: ServerAnswer): void {

    if (this.connection && this.connection.readyState === WebSocket.OPEN) {
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
  
        if (isSuccessAnswer(response)) {
          this.response.read(response);
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

  
}



