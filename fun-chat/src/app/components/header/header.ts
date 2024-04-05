import { BaseComponent } from "@/app/components/base-components.ts";
import { Navigation } from "@/app/utils/type.ts";
import { navigateTo, getNavigation } from "@/app/api/router.ts";
import { li, a, ul, nav } from "../tags.ts";
import classes from "./header.module.scss";

const NEED_AUTH = [Navigation.chat];
export default class Header extends BaseComponent {
  private isAuth = false;

  private active: Navigation = Navigation.chat;

  private items: BaseComponent[] = [];

  constructor() {
    super({ tag: 'header' });
    this.append(this.getNavList());
  }

  public setActivePage(page: Navigation): void {
    this.items.forEach(item => item.removeClass(classes.active!));
    const item = this.items.find(el => el.getElement().textContent?.toLowerCase() === page);
    if (item) {
      item.getElement().classList.add(classes.active!);
    }
  }
  
  private getNavList(): BaseComponent {
    const navMenu = nav({ className: classes.navbar });
    const navList = ul({ className: classes['navbar-nav'] });
    const navItems: BaseComponent[] = [];
    Object.entries(Navigation).forEach(([key, value]) => {
      if (value && key) {
        const needsAuth = !this.isAuth && NEED_AUTH.includes(value);
        navItems.push(this.getNavItem(getTittle(value), value === this.active, needsAuth));
      }
    });
    navList.appendChild(navItems);
    navMenu.appendChild([navList])
    return navMenu;
  }

  private getNavItem(tittle: string, active: boolean, disable: boolean): BaseComponent {
    const items = li(`${classes['nav-item']} ${active ? classes.active : ''} ${disable ? classes.disable : ''} `, this.onLinkClick,
      a({ className: classes['nav-link'], textContent: tittle }));
    this.items.push(items);
    return items
  }

  

  private onLinkClick = (evt: Event): void => {
    const item = evt.currentTarget;
    if (item &&
      item instanceof HTMLElement &&
      !item.classList.contains(classes.active!) &&
      !item.classList.contains(classes.disable!)) {
      const link = item.firstChild;
      if (link instanceof HTMLElement && link.textContent) {
        const text = link.textContent.toLowerCase();
        const navPage = getNavigation(text);
        navigateTo(navPage);
        this.setActivePage(navPage);
      }
    }
  }


}

function getTittle(name: string): string {
  const tittle = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  // if (page === 'auth') {
  //   tittle += this.isAuth ? 'out' : 'in';
  // }
  return tittle;
}