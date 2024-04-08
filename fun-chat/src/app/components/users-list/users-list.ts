import { Fields, type User } from "@/app/utils/type.ts";
import UserComponent from "../user/user.ts";
import Input from "../input/input.ts";
import { BaseComponent } from "../base-components.ts";
import classes from "./users-list.module.scss";

export default class UserListComponent extends BaseComponent{
  private users: UserComponent[] = [];

  private search: Input;

  constructor() {
    super({ tag: 'ul', className: classes['users-list'] });
    this.search = new Input({ id: Fields.search, type: 'text', placeholder: 'find...', className: classes.search });
    this.search.addListener('input', this.onSearch);
    this.append(this.search);
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

  private onSearch = (event: Event): void => {
    event.preventDefault();
    const value = this.search.getValue();
    this.users.forEach(user => {
      const name = user.getUser().login;
      if (name && name.toLowerCase().includes(value.toLowerCase())) {
        user.show();
      } else {
        user.hide();
      }
    });
  }

}