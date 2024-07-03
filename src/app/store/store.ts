import type { Auth, Message, User } from "../utils/type.ts"
import type Controller from "../controller/controller.ts";

const version = '1.0.0';
const app = 'fun-chat'
const author = 'yulikk'
const storageKey = `${author}-${version}-${app}`;
const loginKey = 'login';
const passwordKey = 'password';

export default class Store {
  private controller: Controller | null = null;

  private user: User = {
    login: '',
    isLogined: false,
  }

  private authInfo: Auth = {
    login: null,
    password: null
  };

  private usersList: User[] = [];

  private message: Message[] = [];

  constructor() {
    const login = sessionStorage.getItem(`${storageKey}-${loginKey}`);
    const password = sessionStorage.getItem(`${storageKey}-${passwordKey}`);

    if (login && password) {
      this.authInfo.login = login;
      this.authInfo.password = password;
    }
  }

  public setController(controller: Controller): Controller {
    this.controller = controller;
    if (this.isAuth()) {
      this.controller?.ctrAuth.reLogin();
    }
    return this.controller;
  }

  public setAuthInfo(auth: Auth): Auth {
    if (auth.login && auth.password) {
      this.authInfo = auth;
      sessionStorage.setItem(`${storageKey}-${loginKey}`, auth.login);
      sessionStorage.setItem(`${storageKey}-${passwordKey}`, auth.password);
    }
    return this.authInfo ;
  }

  public getAuthInfo(): Auth {
    return this.authInfo;
  }

  public isAuth(): boolean {
    return this.authInfo.login !== null && this.authInfo.password !== null;
  }

  public login(user: User): User {
    if (user.login && user.isLogined) {
      Object.assign(this.user, user);
      if (this.controller) {
        this.controller.ctrAuth.afterLogin(this.user);
      }
    }
    return this.user;
  }

  public logout(user: User): User {
    if (user.login === this.user.login) {
      this.user.isLogined = false;
      this.user.login = '';
      this.authInfo.login = null;
      this.authInfo.password = null;
      sessionStorage.removeItem(`${storageKey}-${loginKey}`);
      sessionStorage.removeItem(`${storageKey}-${passwordKey}`);
      this.usersList = [];
      this.message = [];
      if (this.controller) {
        this.controller.ctrAuth.afterLogout();
      }
    }
    return this.user;
  }

  public lostConnection(): void {
    this.message = [];
    this.usersList = [];
  }

  public userLogin(user: User): User | undefined {
    const userEl = this.usersList.find(el => el.login === user.login);
    if (userEl) {
      userEl.isLogined = true;
    } else {
      this.usersList.push(user);
    }
    this.usersSort();
    return userEl;
  }

  public userLogout(user: User): User | undefined {
    const userEl = this.usersList.find(el => el.login === user.login);
    if (userEl) {
      userEl.isLogined = false;
    }
    this.usersSort();
    return userEl;
  }

  public getUser(): User | null {
    let user = null
    if (this.user.isLogined) {
      user = this.user;
    }
    return user;
  }

  public usersSort(): void {
    this.usersList.sort((a, b) => Number(b.isLogined) - Number(a.isLogined));
  }

  private updateUsersList(users: User[], filterCondition: (user: User) => boolean): User[] {
    this.usersList = this.usersList.filter(filterCondition);
    this.usersList.push(...users);
    this.usersSort();
    if (this.controller) {
      this.controller.ctrMessage.getUserMessages(users);
    }
    return this.usersList;
  }

  public setActiveUsers(users: User[]): User[] {
    const otherUsers = users.filter(user => user.login !== this.user.login);
    return this.updateUsersList(otherUsers, user => !user.isLogined);
  }

  public setInactiveUsers(users: User[]): User[] {
    return this.updateUsersList(users, user => user.isLogined);
  }

  public getUsersList(): User[] {
    return this.usersList;
  }

  public setNewMessage(message: Message): Message {
    this.message.push(message);
    return message;
  }

  public getUserMessages(user: User): Message[] {
    return this.message.filter(
      message => message.from === user.login || message.to === user.login
    );
  }

  public setDeliverStatus(id: string): Message | undefined {
    const message = this.message.find(el => el.id === id);
    if (message) {
      message.status.isDelivered = true;
    }
    return message;
  }

  public setReadStatus(id: string): Message | undefined {
    const message = this.message.find(el => el.id === id);
    if (message) {
      message.status.isReaded = true;
    }
    return message;
  }

  public updateMessage(message: Message): Message | undefined {
    const messageEl = this.message.find(el => el.id === message.id);
    if (messageEl) {
      Object.assign(messageEl, message);
    }
    return messageEl;
  }

  public getUserFromMessage(message: Message): User | undefined {
    const msgTo = this.getUserFromList(message.to);
    const msgFrom = this.getUserFromList(message.from);
    return msgTo || msgFrom;
  }

  public getMessagesToUser(user: User): Message[] {
    return this.message.filter(message => message.to === this.user.login && message.from === user.login);
  }

  public isMyMessage(message: Message): boolean {
    return message.from === this.user.login;
  }

  public needReadMessage(user: User): number {
    return this.message.filter(
      message => message.from === user.login && !message.status.isReaded
    ).length;
  }

  public deleteMessage(id: string): Message | undefined {
    const message = this.message.find(el => el.id === id);
    if (message) {
      this.message = this.message.filter(el => el.id !== id);
    }
    return message;
  }

  public getUserFromList(user: string): User | undefined {
    return this.usersList.find(el => el.login === user);
  }

  public setEdit(message: Message): Message | undefined {
    const messageEl = this.message.find(el => el.id === message.id);
    if (messageEl) {
      messageEl.text = message.text;
      messageEl.status.isEdited = message.status.isEdited;
    }
    return messageEl;
  }
}
