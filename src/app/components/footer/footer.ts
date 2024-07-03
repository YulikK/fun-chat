import SRC from "@/app/utils/src.ts";
import TXT from "@/app/utils/language.ts";
import { BaseComponent } from "../base-components.ts";
import { a, img, p } from "../tags.ts";
import classes from "./footer.module.scss";

export default class Footer extends BaseComponent {
  constructor() {
    super({ tag: 'footer', className: classes.footer });
    this.appendChild([
      a({ className: classes.link, href: SRC.gitHref, target: '_blank' },
        img({ src: SRC.git, alt: SRC.gitAlt, className: classes.logoGit, width: 24, height: 24 }),
      ),
      a({ className: classes.link, href: SRC.rsHref, target: '_blank' },
        img({ src: SRC.rs, alt: SRC.rsAlt, className: classes.logoRs, width: 24, height: 24 }),
      ),
      p(classes.linkText!, TXT.year)
    ]);

  }

}
