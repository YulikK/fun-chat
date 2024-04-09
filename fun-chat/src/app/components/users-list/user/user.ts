import type { User } from "@/app/utils/type.ts";
import { BaseComponent } from "../../base-components.ts";
import classes from "./user.module.scss";
import { p } from "../../tags.ts";

export default class UserComponent extends BaseComponent{
  private user: User;

  private text: BaseComponent | null = null;

  private status: boolean;

  constructor(user: User) {
    super({ tag: 'li', className: classes.user });
    this.user = user;
    this.status = user.isLogined;
    this.text = p(`${classes.tittle!} ${this.user.isLogined ? classes.online! : ''}`, this.user.login);
    this.append(this.text);

    
  }

  public setActive(status: boolean): void {
    if (status) {
      this.addClass(classes.active!);
    } else {
      this.removeClass(classes.active!);
    }
  }

  public setOnline(status: boolean): void {
    this.status = status;
    if (status && this.text) {
      this.text.toggleClass(classes.online!);
    } else if(this.text){
      this.text.removeClass(classes.online!);
    }
  }

  public getStatus(): boolean{
    return this.status;
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