import { BaseComponent } from "@/app/components/base-components.ts";
import classes from "./chat.module.scss";

export default class ChatPage extends BaseComponent{
  constructor() {
    super({ tag: 'div', className: classes.container });
  }
}