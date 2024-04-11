import type { User } from '@/app/utils/type.ts';
import { BaseComponent } from '../../base-components.ts';
import Message from '../message/message.ts';
import classes from './dialog.module.scss';
import { p } from '../../tags.ts';

const EMPTY_MESSAGE = 'Start your dialog';

export default class Dialog extends BaseComponent {
  private messages: Message[] = [];

  private emptyDialog: BaseComponent;

  constructor() {
    super({ tag: 'div', className: classes.dialog });
    this.emptyDialog = p(classes.emptyDialog!, EMPTY_MESSAGE);
    this.append(this.emptyDialog);
  }

  public addMessage(message: string, isMy: boolean, user: User): void {
    this.emptyDialog.addClass(classes.hide!);
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const time = `${hours}:${minutes}`;
    const messageEl = new Message(message, time, isMy, user);
    this.messages.push(messageEl);
    this.append(messageEl);
    messageEl.getElement().scrollIntoView({ behavior: 'smooth' });
  }

}