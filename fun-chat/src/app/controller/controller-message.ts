import type Store from "../store/store";
import type ChatPage from "../pages/chat/chat.ts";
import type { Message, User } from "../utils/type.ts";
import type ServerRequest from "../api/server/server-request.ts";

export default class ControllerMessage {
  private store: Store

  private pageChat: ChatPage;

  private request: ServerRequest;

  constructor(store: Store, pageChat: ChatPage, request: ServerRequest) {
    this.store = store;
    this.pageChat = pageChat;
    this.request = request;
  }

  public sendMessage(user: User, message: string): boolean {
    let result = false;
    if (message && user) {
      this.request.sendMessage(user.login, message);
      result = true;
    }
    return result;
  }

  public responseSendMessage(message: Message): boolean {
    let result = false;
    if (message) {
      this.store.setNewMessage(message);
      this.pageChat.addMessageToDialog(message);
      result = true;
    }
    return result;
  }

  public getUserMessages(users: User[]): boolean {
    let result = false;
    if (users) {
      users.forEach(user => {
        this.request.sendGetMessages(user.login);
      });
      result = true;
    }
    return result;
  }

  public responseUserMessages(messages: Message[]): boolean {
    let result = false;
    if (messages) {
      messages.forEach(message => {
        this.store.setNewMessage(message);
        this.pageChat.addMessageToDialog(message);
      });
      result = true;
    }
    return result;
  }

  public responseDeliverMessage(message: Message): boolean {
    let result = false;
    if (message) {
      const messageEl = this.store.setDeliverStatus(message.id);
      if (messageEl) {
        this.pageChat.updateMessage(messageEl);
        result = true;
      }
    }
    return result;
  }

  public responseReadMessage(message: Message): boolean {
    let result = false;
    if (message) {
      const messageEl = this.store.setReadStatus(message.id);
      if (messageEl) {
        this.pageChat.updateMessage(messageEl);
        result = true;
      }
    }
    return result;
  }

  public readAll(user: User): boolean {
    let result = false;
    if (user) {
      const messages = this.store.getMessagesToUser(user);
      messages.forEach(message => {
        if (!message.status.isReaded) {
          this.request.sendRead(message.id);
        }
      });
      result = true;
    }
    return result;
  }

  public deleteMessage(message: Message): boolean {
    let result = false;
    if (message) {
      this.request.sendDelete(message.id);
      result = true;
    }
    return result;
  }

  public responseDelete(message: Message): boolean {
    let result = false;
    if (message) {
      const messageEl = this.store.deleteMessage(message.id);
      if (messageEl) {
        this.pageChat.deleteMessage(messageEl);
        result = true;
      }
    }
    return result;
  }

  public editMessage(id: string, message: string): boolean {
    let result = false;
    if (id && message) {
      this.request.sendEdit(id, message);
      result = true;
    }
    return result;
  }

  public responseEditMessage(message: Message): boolean {
    let result = false;
    if (message) {
      const messageEl = this.store.setEdit(message);
      if (messageEl) {
        this.pageChat.updateMessage(messageEl);
        result = true;
      }
    }
    return result;
  }
}