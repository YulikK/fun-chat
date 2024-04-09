import type { User } from "@/app/utils/type.ts";
import { BaseComponent } from "../base-components.ts";
import classes from "./chat.module.scss";
import ChatHead from "./header/header.ts";

export default class Chat extends BaseComponent{
  private user: User;

  private head: ChatHead;

  constructor(user: User) {
    super({ tag: 'div', className: classes.chat });
    this.user = user;
    this.head = new ChatHead(this.user);
    this.append(this.head);
  }

  public getUser(): User {
    return this.user;
  }

  public updateStatus(status: boolean): void {
    // this.user.isLogined = status;
    this.head.updateStatus(status);
  }
}