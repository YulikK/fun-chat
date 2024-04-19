import type Store from "../store/store";
import type AuthPage from "../pages/auth/auth";
import type ChatPage from "../pages/chat/chat.ts";
import Connection from "../api/server/connection.ts";
import ControllerAuth from "./controller-auth.ts";
import ControllerUser from "./controller-user.ts";
import type Header from "../components/header/header.ts";
import type { BaseComponent } from "../components/base-components.ts";
import ServerRequest from "../api/server/server-request.ts";
import ServerResponse from "../api/server/server-response.ts";
import ControllerMessage from "./controller-message.ts";

export default class Controller {
  private store: Store

  private pageAuth: AuthPage;

  private pageChat: ChatPage

  private connection: Connection;

  private request: ServerRequest;

  private alertStack: BaseComponent;

  private header: Header

  private serverResponse: ServerResponse;

  public ctrAuth: ControllerAuth;

  public ctrUser: ControllerUser;

  public ctrMessage: ControllerMessage;

  constructor(store: Store, pageAuth: AuthPage, pageChat: ChatPage, alertStack: BaseComponent, header: Header) {
    this.store = store;
    this.pageAuth = pageAuth;
    this.pageChat = pageChat;
    this.alertStack = alertStack;
    this.header = header;
    this.serverResponse = new ServerResponse(this);
    this.connection = new Connection(this.alertStack, this.serverResponse);
    this.request = new ServerRequest(this.connection)
    this.ctrAuth = new ControllerAuth(this.store, this.pageAuth, this.pageChat, this.header, this.request);
    this.ctrUser = new ControllerUser(this.store, this.pageChat);
    this.ctrMessage = new ControllerMessage(this.store, this.pageChat, this.request);
    this.connection.setReConnectCallback(this.ctrAuth.reLogin);
    this.connection.setCloseConnectCallback(this.ctrAuth.closeConnection);
  }

}
