import type { Auth, ServerAnswer } from "@/app/utils/type.ts";
import type Connection from "./connection.ts";
import rqLogin from "./request/auth/login.ts";
import rqLogout from "./request/auth/logout.ts";
import rqUserActive from "./request/user/active.ts";
import rqUserInactive from "./request/user/inactive.ts";
import rqMsgSend from "./request/message/send.ts";
import rqMsgFromUser from "./request/message/from-user.ts";
import rqMsgRead from "./request/message/read.ts";
import rqMsgDelete from "./request/message/delete.ts";
import rqMsgEdit from "./request/message/edit.ts";

export default class ServerRequest {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }
  
  public sendLogin(user: Auth): void {
    this.sendRequest(rqLogin(user));
  }
  
  public sendLogout(user: Auth): void {
    this.sendRequest(rqLogout(user));
  }
  
  public sendGetActiveUsers(): void {
    this.sendRequest(rqUserActive());
  }
  
  public sendGetInactiveUsers(): void {
    this.sendRequest(rqUserInactive());
  }

  public sendMessage(user: string, text: string): void {
    this.sendRequest(rqMsgSend(user, text));
  }

  public sendGetMessages(user: string): void {
    this.sendRequest(rqMsgFromUser(user));
  }

  public sendRead(id: string): void {
    this.sendRequest(rqMsgRead(id));
  }
  
  public sendDelete(id: string): void {
    this.sendRequest(rqMsgDelete(id));
  }

  public sendEdit(id: string, text: string): void {
    this.sendRequest(rqMsgEdit(id, text));
  }

  private sendRequest(request: ServerAnswer): void {
    this.connection.sendMessage(request);
  }
}
