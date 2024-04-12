import { type Message, type User } from "@/app/utils/type.ts";
import type Store from "@/app/store/store.ts";
import type Controller from "@/app/controller/controller.ts";
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

  private controller: Controller | null = null;

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

  public setController(controller: Controller): boolean {
    let result = false;
    if (controller) {
      this.controller = controller;
      result = true;
    }
    return result;
    
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

  public addMessageToDialog(message: Message): void {
    if (message && message.from) {
      const user = this.store.getUserFromMessage(message);
      if (user) {
        const chat = this.getUserChat(user);
        if (chat) {
          this.userList.setMessageCount(user, this.store.needReadMessage(user));
          if (!message.status.isReaded && !this.store.isMyMessage(message)) {
            chat.insertSeparator();
          }
          chat.addMessage(message);
        }
      }
    }
  }

  public afterLogout(): void {
    this.chats.forEach(chat => chat.destroy());
    this.userList.destroyChild();
    this.chats = [];
    this.chatContainer.clear();
    this.chatContainer.append(this.emptyChat);
  }

  public updateMessage(message: Message): void {
    if (message && message.id) {
      const chat = this.chats.find(el => el.getUser().login === message.from || el.getUser().login === message.to);
      if (chat) {
        
        chat.updateMessage(message);
        const user = this.store.getUserFromMessage(message);
        if (user) {
          const needRead = this.store.needReadMessage(user);
          this.userList.setMessageCount(user, needRead);
          if (!needRead) {
            chat.deleteSeparator();
          }
        }
        
      }
    }
  }

  public deleteMessage(message: Message): void {
    const user = this.store.getUserFromMessage(message);
    if (user) {
      const needRead = this.store.needReadMessage(user);
      this.userList.setMessageCount(user, needRead);
      const chat = this.getUserChat(user);
      if (chat) {
        chat.deleteMessage(message);
        if (!needRead) {
          chat.deleteSeparator();
        }
      }
    }
    
  }

  private onUserClick = (user: User): void => {
    this.chatContainer.clear();
    const userChat = this.getUserChat(user);
    if (userChat) {
      this.chatContainer.append(userChat);
      userChat.scrollMessage(false);
    }
  }

  private getUserChat(user: User): Chat | undefined {
    let userChat = this.chats.find(chat => chat.getUser().login === user.login);
    if (!userChat && this.controller) {
      userChat = new Chat(user, this.controller);
      const messages = this.store.getUserMessages(user);
      messages.forEach(message => {
        if (userChat) {
          userChat.addMessage(message);
        }
      });
      this.chats.push(userChat);
    }
    return userChat;
  }

}