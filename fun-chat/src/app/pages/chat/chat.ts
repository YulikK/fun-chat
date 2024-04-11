import type { User } from "@/app/utils/type.ts";
import type Store from "@/app/store/store.ts";
import Chat from "@/app/components/chat/chat.ts";
import { aside, article, p } from "@/app/components/tags.ts";
import { BaseComponent } from "@/app/components/base-components.ts";
import UserListComponent from "@/app/components/users-list/users-list.ts";
import classes from "./chat.module.scss";

const EMPTY_MESSAGE = 'Chose user for dialog';

export default class ChatPage extends BaseComponent{
  private userList: UserListComponent;

  private chats: Chat[] = [];

  private chatContainer: BaseComponent;

  private emptyChat: BaseComponent;

  private store: Store;

  constructor(store: Store) {
    super({ tag: 'section', className: classes.container });
    this.store = store;
    
    const userListWarp = aside({ className: classes.aside });
    this.userList = new UserListComponent(this.onUserClick);
    userListWarp.append(this.userList);
    this.append(userListWarp);
    this.chatContainer = article({ className: classes.article });
    this.emptyChat = p(classes.emptyChat!, EMPTY_MESSAGE);
    this.chatContainer.append(this.emptyChat);
    this.append(this.chatContainer);
  }

  public updateUsers(users: User[]): void {
    this.userList.updateUsers(users);
    users.forEach(user => {
      const chat = this.chats.find(el => el.getUser().login === user.login);
      if (chat) {
        chat.updateStatus(user.isLogined);
      }
    });
  }

  private onUserClick = (user: User): void => {
    this.chatContainer.clear();
    const currentUser = this.store.getUser();
    let userChat = this.chats.find(chat => chat.getUser().login === user.login);
    if (!userChat && currentUser) {
      userChat = new Chat(user, currentUser);
      this.chats.push(userChat);
    }
    if (userChat) {
      this.chatContainer.append(userChat);
    }
    
  }

}