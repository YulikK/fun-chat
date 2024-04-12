import type { Message, User } from "@/app/utils/type.ts";
import type Controller from "@/app/controller/controller.ts";
import { BaseComponent } from "../base-components.ts";
import classes from "./chat.module.scss";
import ChatHead from "./header/header.ts";
import Dialog from "./dialog/dialog.ts";
import MessageForm from "./form/form.ts";



export default class Chat extends BaseComponent{
  private user: User;

  private head: ChatHead;

  private dialog: Dialog;

  private form: MessageForm;

  private controller: Controller;


  constructor(user: User, controller: Controller) {
    super({ tag: 'div', className: classes.chat });
    this.user = user;
    this.controller = controller;
    this.head = new ChatHead(this.user);
    this.dialog = new Dialog(this.deleteMessageHandler);
    this.form = new MessageForm(this.submitHandler);
    this.appendChild([this.head, this.dialog, this.form]);
    this.dialog.addListener('click', this.onDialogClick);
    this.dialog.addListener('scroll', this.onDialogScroll);
  }

  public getUser(): User {
    return this.user;
  }

  public updateStatus(status: boolean): void {
    this.head.updateStatus(status);
  }

  public addMessage(message: Message): void {
    this.dialog.addMessage(message, message.from !== this.user.login, this.user);
  }

  public insertSeparator(): void {
    this.dialog.insertSeparator();
  }

  public deleteSeparator(): void {
    this.dialog.deleteSeparator();
  }

  public updateMessage(message: Message): void {
    this.dialog.updateMessage(message);
  }

  public scrollMessage(visual = true): void {
    if (visual) {
      this.dialog.scrollMessage();
    } else {
      this.dialog.showLastMessage();
    }
  };

  private submitHandler = (message: string): void => {
    this.controller.ctrMessage.readAll(this.user);
    this.controller.ctrMessage.sendMessage(this.user, message);
  }

  private onDialogClick = (): void => {
    this.controller.ctrMessage.readAll(this.user);
  }
  
  private onDialogScroll = (): void => {
    if (!this.dialog.getIsAutoScroll()) {
      this.controller.ctrMessage.readAll(this.user);
    }
    
  }

  public deleteMessage(message: Message): void {
    this.dialog.deleteMessage(message);
  }

  private deleteMessageHandler = (message: Message): void => {
    this.controller.ctrMessage.deleteMessage(message);
  }
}