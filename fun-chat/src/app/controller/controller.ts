import type Store from "../store/store";
import type AuthPage from "../pages/auth/auth";
import type ChatPage from "../pages/chat/chat.ts";
import Connection from "../api/connection.ts";
import type { User } from "../utils/type.ts";
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

  public login(user: User): boolean {
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

  public afterLogin(): boolean {
    navigateTo(Navigation.chat);
    if (this.header) {
    this.header.changeAuth(true);
    }

    return true;
  }

  public afterLogout(): boolean {
    navigateTo(Navigation.auth);
    if (this.header) {
      this.pageAuth.resetForm();
      this.header.changeAuth(false);
    }
    return true;
  }
  

}

