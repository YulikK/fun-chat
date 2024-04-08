import { BaseComponent } from "../base-components.ts";
import { a, img, p } from "../tags.ts";
import classes from "./footer.module.scss";

export default class Footer extends BaseComponent {
  constructor() {
    super({ tag: 'footer', className: classes.footer });
    this.appendChild([
      a({ className: classes.link, href: 'https://github.com/YulikK', target: '_blank' },
        img({ src: 'img/git.png', alt: 'GitHub', className: classes.logoGit, width: 24, height: 24 }),
      ),
      a({ className: classes.link, href: 'https://rs.school/js/', target: '_blank' },
        img({ src: 'img/RS.png', alt: 'RS School', className: classes.logoRs, width: 24, height: 24 }),
      ),
      p(classes.linkText!, '2024')
    ]);
        
  }

}