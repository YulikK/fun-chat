import type { User } from "@/app/utils/type.ts";
import Chat from "@/app/components/chat/chat.ts";
import { aside, article } from "@/app/components/tags.ts";
import { BaseComponent } from "@/app/components/base-components.ts";
import UserListComponent from "@/app/components/users-list/users-list.ts";
import classes from "./chat.module.scss";





export default class ChatPage extends BaseComponent{
  private userList: UserListComponent;

  private chats: Chat[] = [];

  private chatContainer: BaseComponent;

  constructor() {
    super({ tag: 'section', className: classes.container });
    const userListWarp = aside({ className: classes.aside });
    this.userList = new UserListComponent(this.onUserClick);
    userListWarp.append(this.userList);
    this.append(userListWarp);
    this.chatContainer = article({ className: classes.article });
    this.append(this.chatContainer);
  }

  public updateUsers(users: User[]): void {
    this.userList.updateUsers(users);
    users.forEach(user => {
      const chat = this.chats.find(el => el.getUser().login === user.login);
      if (chat) {
        // const chatUser = chat.getUser();
        // if (chatUser.isLogined !== user.isLogined) {
        chat.updateStatus(user.isLogined);
        // }
      }
    });
  }

  private onUserClick = (user: User): void => {
    this.chatContainer.clear();
    let userChat = this.chats.find(chat => chat.getUser().login === user.login);
    if (!userChat) {
      userChat = new Chat(user);
      this.chats.push(userChat);
    }
    this.chatContainer.append(userChat);
  }

}