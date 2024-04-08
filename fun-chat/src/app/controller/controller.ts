import type Store from "../store/store";
import type AuthPage from "../pages/auth/auth";
import type ChatPage from "../pages/chat/chat.ts";
import Connection from "../api/server/connection.ts";
import type { Auth, User } from "../utils/type.ts";
import { Navigation } from "../utils/type.ts";
import { navigateTo } from "../api/router.ts";
import type Header from "../components/header/header.ts";
import type { BaseComponent } from "../components/base-components.ts";
import ServerRequest from "../api/server/server-request.ts";
import ServerResponse from "../api/server/server-response.ts";

export default class Controller {
  private store: Store

  private pageAuth: AuthPage;

  private pageChat: ChatPage

  private connection: Connection;

  private request: ServerRequest;

  private alertStack: BaseComponent;

  private header: Header

  private serverResponse: ServerResponse;

  constructor(store: Store, pageAuth: AuthPage, pageChat: ChatPage, alertStack: BaseComponent, header: Header) {
    this.store = store;
    this.pageAuth = pageAuth;
    this.pageChat = pageChat;
    this.alertStack = alertStack;
    this.header = header;
    this.serverResponse = new ServerResponse(this);
    this.connection = new Connection(this.alertStack, this.serverResponse);
    this.connection.setController(this);
    this.request = new ServerRequest(this.connection)
  }

  public login(user: Auth): boolean {
    let result = false;
    if (user) {
      this.store.setAuthInfo(user);
      this.request.sendLogin(user);
      result = true;
    }
    return result;
  }

  public startLogout(): boolean {
    let result = false;
    const authInfo = this.store.getAuthInfo();
    if (authInfo) {
      this.request.sendLogout(authInfo);
      result = true;
    }
    
    return result;
  }

  public responseLogin(user: User): boolean {
    let result = false;
    if (user.isLogined) {
      this.store.login(user);
      result = true;
    }
    return result;
  }

  public responseLogout(user: User): boolean {
    let result = false;
    if (!user.isLogined) {
      this.store.logout(user);
      result = true;
    }
    return result;
  }

  public responseUserLogin(user: User): boolean {
    let result = false;
    if (user.isLogined) {
      this.store.userLogin(user);
      this.pageChat.updateUsers(this.store.getUsersList());
      result = true;
    }
    return result;
  }

  public responseUserLogout(user: User): boolean {
    let result = false;
    if (!user.isLogined) {
      this.store.userLogout(user);
      this.pageChat.updateUsers(this.store.getUsersList());
      result = true;
    }
    return result;
  }

  public afterLogin(user: User): boolean {
    navigateTo(Navigation.chat);
    this.header.changeAuth(true, user);
    this.request.sendGetActiveUsers();
    this.request.sendGetInactiveUsers();
    return true;
  }

  public responseActiveUsers(users: User[]): boolean {
    let result = false;
    if (users) {
      this.store.setActiveUsers(users);
      this.pageChat.updateUsers(this.store.getUsersList());
      result = true;
    }
    return result;
  }

  public responseInactiveUsers(users: User[]): boolean {
    let result = false;
    if (users) {
      this.store.setInactiveUsers(users);
      this.pageChat.updateUsers(this.store.getUsersList());
      result = true;
    }
    return result;
  }

  public afterLogout(): boolean {
    navigateTo(Navigation.auth);
    this.pageAuth.resetForm();
    this.header.changeAuth(false);
    return true;
  }

}