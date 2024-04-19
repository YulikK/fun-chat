import AlertComponent from "@/app/components/alert-stack/alert/alert.ts";
import TXT from "@/app/utils/language.ts";
import Spinner from "@/app/components/spinner/spinner.ts";
import { isErrorAnswer, isSuccessAnswer } from "@/app/utils/validation-response.ts";
import type AlertStack from "../../components/alert-stack/alert-stack.ts";
import type { Callback, ServerAnswer } from "../../utils/type.ts";
import type ServerResponse from "./server-response.ts";


type reConnectCallback = () => boolean;

export default class Connection {

  private readonly END_POINT = `ws://localhost:4000`;

  private alertStack: AlertStack;

  private response: ServerResponse;

  private connectionWS: WebSocket;

  private spinner: Spinner

  private reConnectCallback: reConnectCallback | null = null;

  private closeConnectCallback: Callback | null = null;

  private isConnectionLost = false;

  constructor(alertStack: AlertStack, response: ServerResponse) {
    this.alertStack = alertStack;
    this.response = response;
    this.connectionWS = new WebSocket(`${this.END_POINT}`);
    this.spinner = new Spinner();
    this.getNewConnection();
  }

  public sendMessage(message: ServerAnswer): void {

    if (this.connectionWS && this.connectionWS.readyState === WebSocket.OPEN) {
      this.connectionWS.send(JSON.stringify(message));
    } else {
      this.onClose();
    }
  }

  public setReConnectCallback(callback: reConnectCallback): void {
    this.reConnectCallback = callback;
  }

  public setCloseConnectCallback(callback: Callback): void {
    this.closeConnectCallback = callback;
  }

  private getNewConnection(): void {
    this.connectionWS.addEventListener('open', this.onOpen);
    this.connectionWS.addEventListener('error', this.onError);
  }

  private onOpen = (): void => {
    this.spinner.hide();
    this.setListeners();
    if (this.isConnectionLost && this.reConnectCallback) {
      this.isConnectionLost = false;
      this.reConnectCallback();
    }
  }

  private onError = (event: Event): void => {
    if (event instanceof ErrorEvent && event.error && typeof event.error === 'string') {
      const alert = new AlertComponent(this.alertStack, event.error);
      alert.show();
      this.getNewConnection();
    }
  }

  private setListeners(): void {
    this.connectionWS.addEventListener('message', this.onMessage);
    this.connectionWS.addEventListener('close', this.onClose);
  }

  private onMessage = (message: MessageEvent): void => {
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
  }

  private onClose = (): void => {
    this.spinner.setMessage(TXT.messageServerDisconnect);
    this.spinner.show();
    this.isConnectionLost = true;
    if (this.closeConnectCallback) {
      this.closeConnectCallback();
    }
    this.tryReconnect();
  }

  private tryReconnect(): void {
    const interval = setInterval(() => {
      if (this.connectionWS.readyState === WebSocket.CLOSED) {
        this.connectionWS = new WebSocket(`${this.END_POINT}`);
        this.getNewConnection();

      } else {
        clearInterval(interval);
      }
    }, 2000);
  }

}



