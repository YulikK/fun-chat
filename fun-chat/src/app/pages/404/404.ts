import { BaseComponent } from "../../components/base-components.ts";
import { p, img } from "../../components/tags.ts";
import classes from "./404.module.scss";

export default class Page404 extends BaseComponent {
  constructor() {
    super({ tag: 'div', className: classes.container });
    this.appendChild([p(classes.text!, 'Ups... 404 Page not found'),
      img({ className: classes.img, src: 'img/404.png', alt: '404', width: 500 })
    ]);
  }
}