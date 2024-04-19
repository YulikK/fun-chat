import type Store from "../store/store";
import type AuthPage from "../pages/auth/auth";
import type { Auth, User } from "../utils/type.ts";
import { Navigation } from "../utils/type.ts";
import { navigateTo } from "../api/router.ts";
import type Header from "../components/header/header.ts";
import type ServerRequest from "../api/server/server-request.ts";
import type ChatPage from "../pages/chat/chat.ts";

export default class ControllerAuth {
  private store: Store

  private pageAuth: AuthPage;

  private pageChat: ChatPage;

  private request: ServerRequest;

  private header: Header

  constructor(store: Store, pageAuth: AuthPage, pageChat: ChatPage, header: Header, request: ServerRequest) {
    this.store = store;
    this.pageAuth = pageAuth;
    this.pageChat = pageChat;
    this.header = header;
    this.request = request
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

  public reLogin = (): boolean => {
    let result = false;
    const user = this.store.getAuthInfo()
    if (user) {
      // this.store.setAuthInfo(user);
      this.request.sendLogin(user);
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

  public afterLogin(user: User): boolean {
    navigateTo(Navigation.chat);
    this.header.changeAuth(true, user);
    this.request.sendGetActiveUsers();
    this.request.sendGetInactiveUsers();
    return true;
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

  public responseLogout(user: User): boolean {
    let result = false;
    if (!user.isLogined) {
      this.store.logout(user);
      result = true;
    }
    return result;
  }

  public afterLogout(): boolean {
    navigateTo(Navigation.auth);
    this.pageAuth.resetForm();
    this.header.changeAuth(false);
    this.pageChat.afterLogout();

    return true;
  }

  public closeConnection = (): void => {
    this.store.lostConnection();
    this.pageChat.afterLogout();
  }

}
