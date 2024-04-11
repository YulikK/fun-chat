import type { User } from "@/app/utils/type.ts";
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

  private currentUser: User;

  constructor(user: User, currentUser: User) {
    super({ tag: 'div', className: classes.chat });
    this.user = user;
    this.currentUser = currentUser;
    this.head = new ChatHead(this.user);
    this.dialog = new Dialog();
    this.form = new MessageForm(this.submitHandler);
    this.appendChild([this.head, this.dialog, this.form]);
  }

  public getUser(): User {
    return this.user;
  }

  public updateStatus(status: boolean): void {
    this.head.updateStatus(status);
  }

  private submitHandler = (message: string): void => {
    this.dialog.addMessage(message, true, this.currentUser);
  }
}