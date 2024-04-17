import SRC from "@/app/utils/src.ts";
import TXT from "@/app/utils/language.ts";
import { BaseComponent } from "../../components/base-components.ts";
import { p, img } from "../../components/tags.ts";
import classes from "./404.module.scss";


export default class Page404 extends BaseComponent {
  constructor() {
    super({ tag: 'div', className: classes.container });
    this.appendChild([p(classes.text!, TXT.message404),
      img({ className: classes.img, src: SRC.p404, alt: SRC.p404Alt, width: 500 })
    ]);
  }
}
