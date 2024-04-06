import type { User } from "../utils/type.ts"
import type Controller from "../controller/controller.ts";

export default class Store {
  private controller: Controller | null = null;

  private user: User = {
    id: null,
    login: null,
    password: null,
    isLogined: false,
  }

  public setController(controller: Controller): boolean {
    let result = false;
    if (controller) {
      this.controller = controller;
      result = true;
    }
    return result;
  }

  public setAuthInfo(user: User): boolean {
    let result = false;
    if (user.login && user.password) {
      this.user = user;
      result = true;
    }
    return result;
  }

  public getAuthInfo(): User {
    return { login: this.user.login, password: this.user.password };
  }

  public login(user: User): boolean {
    let result = false;
    if (user.login && user.isLogined) {
      Object.assign(this.user, user);
      if (this.controller) {
        this.controller.afterLogin();
      }
      result = true;
    }
    return result;
  }

  public logout(): boolean {
    let result = false;
    this.user.isLogined = false;
    this.user.login = null;
    this.user.id = null;
    this.user.password = null;
    if (this.controller) {
      this.controller.afterLogout();
    }
    result = true;
    return result;
  
  }

  public getUser(): User | null {
    let user = null
    if (this.user.isLogined) {
      user = this.user;
    }
    return user;
  }



}