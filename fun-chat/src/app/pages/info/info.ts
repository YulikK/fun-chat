
import { BaseComponent } from "@/app/components/base-components.ts";
import { div, h1, p } from "@/app/components/tags.ts";
// import type { Callback } from "@/app/utils/types.ts";
// import Button from "@/app/components/button/button.ts";
// import Header from "@/app/components/header/header.ts";
// import type User from "@/app/Entities/user.ts";
import { INFO_DESCRIPTION, INFO_TITTLE } from "@/app/utils/constant.ts";
import classes from "./info.module.scss";

export default class Info extends BaseComponent {
  // public startBtn: BaseComponent;

  // private modal: BaseComponent;

  // private header: BaseComponent;

  // private startCallback: Callback;

  constructor() {
    super({ tag: 'div', className: classes.pageWrapper }); 
    // this.header = new Header(logoutCallback);
    // this.startCallback = startCallback;
    // const userName = user.getFullName();
    // this.startBtn = Button({
    //   textContent: 'Start',
    //   onClick: () => {
    //     this.startCallback()
    //   },
    //   className: classes.start
    // });

    const modal = div({className: classes.welcomePage },
    div({ className: classes.wrapper },
      h1(classes.tittle!, INFO_TITTLE),
      p(classes.description!, INFO_DESCRIPTION),
      ));

    this.appendChild([modal])
  }

}
