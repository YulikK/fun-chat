import { Fields, type User } from "@/app/utils/type.ts";
import UserComponent from "./user/user.ts";
import Input from "../input/input.ts";
import { BaseComponent } from "../base-components.ts";
import classes from "./users-list.module.scss";

type UserClickCallback = (user: User) => void;
export default class UserListComponent extends BaseComponent{
  private users: UserComponent[] = [];

  private search: Input;

  private userClickCallback: UserClickCallback;

  constructor(userClickCallback: UserClickCallback) {
    super({ tag: 'ul', className: classes['users-list'] });
    this.userClickCallback = userClickCallback;
    this.search = new Input({ id: Fields.search, type: 'text', placeholder: 'find...', className: classes.search });
    this.search.addListener('input', this.onSearch);
    this.append(this.search);
    this.addListener('click', this.onUserClick);
  }

  public updateUsers(users: User[]): void {

    const currentUsers = [...this.users];
    users.forEach(newUser => {
      
      const currentItem = currentUsers.find(item => item.getUser().login === newUser.login);

      if (currentItem && currentItem.getStatus() !== newUser.isLogined) {
        currentItem.setOnline(newUser.isLogined);
      }

      if (!currentItem) {
        const newUserItem = new UserComponent(newUser);
        this.users.push(newUserItem);
        this.append(newUserItem);
      }
    });

    currentUsers.forEach(currentItem => {
      if (!users.find(user => user.login === currentItem.getUser().login)) {
        this.users = this.users.filter(item => item !== currentItem);
        currentItem.destroy();
      }
    });

    this.users.sort((a, b) => {
      const userA = a.getUser();
      const userB = b.getUser();

      let result = 0;
      if (userA.isLogined && !userB.isLogined) {
        result = -1;
      } else if (!userA.isLogined && userB.isLogined) {
        result = 1;
      } else if (userA.isLogined && userB.isLogined) {
        result = userA.login.localeCompare(userB.login);
      } else {
        result = 0;
      }
      return result;
    })

    this.clearChild();
    this.appendChild(this.users)
  }

  public setMessageCount(user: User, count: number): void {
    const currentUser = this.users.find(item => item.getUser().login === user.login);
    if (currentUser) {
      currentUser.setMessageCount(count);
    }
  }

  private onUserClick = (event: Event): void => {
    const { target } = event;
    if (target instanceof HTMLElement) {
      const userElement = target.closest(`li`);
      if (userElement) {
        this.users.forEach(el => el.setActive(false));
        const currentUser = this.users.find(item => item.getElement() === userElement);
        currentUser?.setActive(true);
        const user = currentUser?.getUser();
        if (user) {
          this.userClickCallback(user);
        }
      }
    }
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