import type { User } from "@/app/utils/type.ts";
import UserComponent from "../user/user.ts";
import { BaseComponent } from "../base-components.ts";
import classes from "./users-list.module.scss";

export default class UserListComponent extends BaseComponent{
  private users: UserComponent[] = [];

  constructor() {
    super({ tag: 'ul', className: classes['users-list'] });
  }

  public updateUsers(users: User[]): void {
    this.clearChild();
    this.users.forEach(item => item.destroy());
    this.users =[];
    users.forEach(user => {
      const userComponent = new UserComponent(user, user.isLogined ? user.isLogined : false);
      this.users.push(userComponent);
    });
    this.appendChild(this.users);
  }

}