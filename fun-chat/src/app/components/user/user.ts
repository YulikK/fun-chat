import type { User } from "@/app/utils/type.ts";
import { BaseComponent } from "../base-components.ts";
import classes from "./user.module.scss";
import { p } from "../tags.ts";

export default class UserComponent extends BaseComponent{
  private user: User;

  private isActive: boolean;

  constructor(user: User, isActive: boolean) {
    super({ tag: 'li', className: classes.user });
    this.user = user;
    this.isActive = isActive;
    if (this.user.login) {
      this.append(p(`${classes.tittle!} ${this.isActive ? classes.active! : ''}`, this.user.login));
    }
    
  }

  public getUser(): User {
    return this.user;
  }

  public show(): User {
    this.removeClass(classes.hide!);
    return this.user;
  }

  public hide(): User {
    this.addClass(classes.hide!);
    return this.user;
  }
}