import type Store from "../store/store";
import type AuthPage from "../pages/auth/auth";
import type ChatPage from "../pages/chat/chat.ts";
import Connection from "../api/connection.ts";
import type { Auth, User } from "../utils/type.ts";
import { Navigation } from "../utils/type.ts";
import { navigateTo } from "../api/router.ts";
import type Header from "../components/header/header.ts";
import type { BaseComponent } from "../components/base-components.ts";

export default class Controller {
  private store: Store

  private pageAuth: AuthPage;

  private pageChat: ChatPage

  private connection: Connection;

  private alertStack: BaseComponent;

  private header: Header


  constructor(store: Store, pageAuth: AuthPage, pageChat: ChatPage, alertStack: BaseComponent, header: Header) {
    this.store = store;
    this.pageAuth = pageAuth;
    this.pageChat = pageChat;
    this.alertStack = alertStack;
    this.header = header;
    this.connection = new Connection(this.alertStack);
    this.connection.setController(this);
  }

  public login(user: Auth): boolean {
    let result = false;
    if (user) {
      this.store.setAuthInfo(user);
      this.connection.sendLogin(user);
      result = true;
    }
    return result;
  }

  public startLogout(): boolean {
    let result = false;
    const authInfo = this.store.getAuthInfo();
    if (authInfo) {
      this.connection.sendLogout(authInfo);
      result = true;
    }
    
    return result;
  }

  public afterSuccessLogin(user: User): boolean {
    let result = false;
    if (user.isLogined) {
      this.store.login(user);
      result = true;
    }
    return result;
  }

  public afterSuccessLogout(user: User): boolean {
    let result = false;
    if (!user.isLogined) {
      this.store.logout();
      result = true;
    }
    return result;
  }

  public afterLogin(user: User): boolean {
    navigateTo(Navigation.chat);
    this.header.changeAuth(true, user);
    this.connection.sendGetActiveUsers();
    this.connection.sendGetInactiveUsers();
    return true;
  }

  public afterSuccessGetActiveUsers(users: User[]): boolean {
    let result = false;
    if (users) {
      this.store.setActiveUsers(users);
      this.pageChat.updateUsers(this.store.getUsersList());
      result = true;
    }
    return result;
  }

  public afterSuccessGetInactiveUsers(users: User[]): boolean {
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