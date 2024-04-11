import type { User } from "@/app/utils/type.ts";
import UserComponent from "../../users-list/user/user.ts";
import { BaseComponent } from "../../base-components.ts";
import classes from "./header.module.scss";

export default class ChatHead extends BaseComponent {
  private user: User;

  private userComponent: UserComponent;

  constructor(user: User) {
    super({ tag: 'header', className: classes.head });
    this.user = user;
    this.userComponent = new UserComponent(this.user);
    this.userComponent.addClass(classes.user!);
    this.append(this.userComponent);
  }

  public updateStatus(status: boolean): void {
    this.userComponent.setOnline(status);
  }
}