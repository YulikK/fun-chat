import type { Auth, User } from "../utils/type.ts"
import type Controller from "../controller/controller.ts";

export default class Store {
  private controller: Controller | null = null;

  private user: User = {
    login: null,
    isLogined: false,
  }

  private authInfo: Auth = {
    login: null,
    password: null
  };

  private usersList: User[] = [];

  public setController(controller: Controller): Controller {
    this.controller = controller;
    return this.controller;
  }

  public setAuthInfo(auth: Auth): Auth {
    if (auth.login && auth.password) {
      this.authInfo = auth;
    }
    return this.authInfo ;
  }

  public getAuthInfo(): Auth {
    return this.authInfo;
  }

  public login(user: User): User {
    if (user.login && user.isLogined) {
      Object.assign(this.user, user);
      if (this.controller) {
        this.controller.afterLogin(this.user);
      }
    }
    return this.user;
  }

  public logout(): User {
    this.user.isLogined = false;
    this.user.login = null;
    this.authInfo.login = null;
    this.authInfo.password = null;
    if (this.controller) {
      this.controller.afterLogout();
    }
    return this.user;
  
  }

  public getUser(): User | null {
    let user = null
    if (this.user.isLogined) {
      user = this.user;
    }
    return user;
  }


  public setActiveUsers(users: User[]): User[] {
    this.usersList = this.usersList.filter(user => !user.isLogined);
    const otherUsers = users.filter(user => user.login !== this.user.login);
    this.usersList.push(...otherUsers);
    
    this.usersList.sort((a, b) => Number(b.isLogined) - Number(a.isLogined));
    return this.usersList;
  }

  public setInactiveUsers(users: User[]): User[] {
    this.usersList = this.usersList.filter(user => user.isLogined);
    this.usersList.push(...users);
    this.usersList.sort((a, b) => Number(b.isLogined) - Number(a.isLogined));
    return this.usersList;
  }

  public getUsersList(): User[] {
    return this.usersList;
  }

}