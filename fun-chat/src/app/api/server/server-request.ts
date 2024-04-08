import getNewId from "@/app/utils/id-generator.ts";
import type { Auth, ServerMessage } from "@/app/utils/type.ts";
import { UserActions } from "@/app/utils/type.ts";
import type Connection from "./connection.ts";


export default class ServerRequest {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }
  
  public sendLogin(user: Auth): void {
    const request: ServerMessage = {
      id: getNewId(),
      type: UserActions.LOGIN,
      payload: {
        user
      },
    };
    this.connection.sendMessage(request);
  }
  
  
  public sendLogout(user: Auth): void {
    const request: ServerMessage = {
      id: getNewId(),
      type: UserActions.LOGOUT,
      payload: {
        user
      },
    };
    this.connection.sendMessage(request);
  }
  
  public sendGetActiveUsers(): void {
    const request: ServerMessage = {
      id: getNewId(),
      type: UserActions.USER_ACTIVE,
      payload: null,
    };
    this.connection.sendMessage(request);
  }
  
  public sendGetInactiveUsers(): void {
    const request: ServerMessage = {
      id: getNewId(),
      type: UserActions.USER_INACTIVE,
      payload: null,
    };
    this.connection.sendMessage(request);
  }
}
