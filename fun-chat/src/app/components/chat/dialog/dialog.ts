import type { Message, User } from '@/app/utils/type.ts';
import { BaseComponent } from '../../base-components.ts';
import MessageComponent from '../message/message.ts';
import classes from './dialog.module.scss';
import { p } from '../../tags.ts';

const EMPTY_MESSAGE = 'Start your dialog';
const NEW_MESSAGE = 'New message';
type messageCallback = (message: Message) => void;

export default class Dialog extends BaseComponent {
  private messages: MessageComponent[] = [];

  private emptyDialog: BaseComponent;

  private isNewMessage = false;

  private separator: BaseComponent;

  private isAutoScroll = false;

  private deleteMessageHandler: messageCallback;

  private editMessageHandler: messageCallback;

  constructor(deleteMessageHandler: messageCallback, editMessageHandler: messageCallback){
    super({ tag: 'div', className: classes.dialog });
    this.deleteMessageHandler = deleteMessageHandler;
    this.editMessageHandler = editMessageHandler;
    this.emptyDialog = p(classes.emptyDialog!, EMPTY_MESSAGE);
    this.separator = p(classes.new!, NEW_MESSAGE);
    this.append(this.emptyDialog);
  }

  public addMessage(message: Message, isMy: boolean, user: User): void {
    const oldMsg = this.messages.find(msg => msg.getMessage().id === message.id);
    if (!oldMsg) {
      const messageEl = new MessageComponent(message, isMy, user, this.deleteMessageHandler, this.editMessageHandler);
      this.messages.push(messageEl);
      this.append(messageEl);
      this.scrollMessage();
    }


  }

  public updateMessage(message: Message): void {
    const messageEl = this.messages.find(el => el.getMessage().id === message.id);
    if (messageEl) {
      messageEl.updateMessage(message);
    }
  }

  public insertSeparator(): void {
    if (!this.isNewMessage) {
      this.isNewMessage = true;
      this.append(this.separator);
      this.scrollMessage();
    }
  }

  public deleteSeparator(): void {
    if (this.isNewMessage) {
      this.isNewMessage = false;
      this.getElement().removeChild(this.separator.getElement());
    }
  }

  public scrollMessage(): void {
    this.isAutoScroll = true;
    if (this.isNewMessage) {
      this.separator.getElement().scrollIntoView({ behavior: 'smooth' });
    } else {
      const lastMessage = this.messages[this.messages.length - 1];
      if (lastMessage) {
        lastMessage.getElement().scrollIntoView({ behavior: 'smooth' });
      }
    }
    requestAnimationFrame(() => {
      setTimeout(() => {
        this.isAutoScroll = false;
      }, 2000);
    });
  }

  public getIsAutoScroll(): boolean {
    return this.isAutoScroll;
  }

  public showLastMessage(): void {
    this.isAutoScroll = true;
    if (this.isNewMessage) {
      this.getElement().scrollTop = this.separator.getElement().offsetTop - this.getElement().offsetHeight + this.separator.getElement().offsetHeight;
    } else {
      const lastMessage = this.messages[this.messages.length - 1];
      if (lastMessage) {
        this.getElement().scrollTop = lastMessage.getElement().offsetTop;
      }
    }
    setTimeout(() => {
      this.isAutoScroll = false;
    }, 1000);
  }

  public deleteMessage(message: Message): void {
    this.isAutoScroll = true;
    const messageEl = this.messages.find(el => el.getMessage().id === message.id);
    if (messageEl) {
      this.messages = this.messages.filter(el => el !== messageEl);
      this.removeChild(messageEl);
      messageEl.destroy();
    }
    setTimeout(() => {
      this.isAutoScroll = false;
    }, 1000);
    // if (!this.messages.length) {
    //   this.append(this.emptyDialog);
    // }
  }

  public deleteEditStatus(): void {
    this.messages.forEach(el => el.setEditView(false));
  }

  public setEditStatus(message: Message, status: boolean): void {
    const messageEl = this.messages.find(el => el.getMessage().id === message.id);
    if (messageEl) {
      messageEl.setEditView(status);
    }
  }
}
