import type { User } from "@/app/utils/type.ts";
import { aside, article } from "@/app/components/tags.ts";
import { BaseComponent } from "@/app/components/base-components.ts";
import UserListComponent from "@/app/components/users-list/users-list.ts";
import classes from "./chat.module.scss";




export default class ChatPage extends BaseComponent{
  private userList: UserListComponent;

  constructor() {
    super({ tag: 'section', className: classes.container });
    const userListWarp = aside({ className: classes.aside });
    this.userList = new UserListComponent();
    userListWarp.append(this.userList);
    this.append(userListWarp);
    const chatWrap = article({ className: classes.article });
    this.append(chatWrap);
    
  }

  public updateUsers(users: User[]): void {
    this.userList.updateUsers(users);
  }

}