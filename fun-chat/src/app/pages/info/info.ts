
import { BaseComponent } from "@/app/components/base-components.ts";
import { div, h1, p } from "@/app/components/tags.ts";
import { INFO_DESCRIPTION, INFO_TITTLE } from "@/app/utils/constant.ts";
import classes from "./info.module.scss";

export default class Info extends BaseComponent {

  constructor() {
    super({ tag: 'div', className: classes.pageWrapper }); 

    const modal = div({className: classes.welcomePage },
    div({ className: classes.wrapper },
      h1(classes.tittle!, INFO_TITTLE),
      p(classes.description!, INFO_DESCRIPTION),
      ));

    this.appendChild([modal])
  }

}
