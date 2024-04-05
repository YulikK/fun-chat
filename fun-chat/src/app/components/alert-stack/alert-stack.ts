import { BaseComponent } from "../base-components.ts";
import classes from "./alert-stack.module.scss";

export default class AlertStack extends BaseComponent {
  constructor() {
    super({ tag: 'div', className: classes.stack });
  }
}