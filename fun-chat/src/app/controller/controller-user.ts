import type Store from "../store/store";
import type ChatPage from "../pages/chat/chat.ts";
import type { User } from "../utils/type.ts";

export default class ControllerUser {
  private store: Store

  private pageChat: ChatPage

  constructor(store: Store, pageChat: ChatPage) {
    this.store = store;
    this.pageChat = pageChat;
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

}