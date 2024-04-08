import type Controller from "@/app/controller/controller.ts";
import { BaseComponent } from "@/app/components/base-components.ts";
import { Navigation } from "@/app/utils/type.ts";
import type { User } from "@/app/utils/type.ts";
import { navigateTo, getNavigation } from "@/app/api/router.ts";
import { li, a, ul, nav, div, img, p } from "../tags.ts";
import classes from "./header.module.scss";



const NEED_AUTH = [Navigation.chat];
export default class Header extends BaseComponent {

  private controller: Controller| null = null;

  private isAuth = false;

  private active: Navigation = Navigation.chat;

  private items: BaseComponent[] = [];

  private userInfo: BaseComponent;

  private navList: BaseComponent;

  constructor() {
    super({ tag: 'header' });
    this.navList = this.getNavList();
    this.userInfo = div({ className: classes.wrap });
    this.navList.append(this.userInfo);
    this.append(this.navList);
  }

  public setController(controller: Controller): void {
    this.controller = controller;
  }

  public setActivePage(page: Navigation): void {
    this.items.forEach(item => item.removeClass(classes.active!));
    const item = this.items.find(el => el.getElement().dataset.data === page);
    if (item) {
      item.getElement().classList.add(classes.active!);
    }
  }

  public changeAuth(isAuth: boolean, user?: User): boolean {
    let result = false;
    this.isAuth = isAuth;
    if (this.isAuth) {
      this.items.forEach(item => {
        item.removeClass(classes.disable!);
        const name = item.getElement().dataset.data;
        if (name === 'auth') {
          item.setText('Logout');
        }
      });
      if (user && user.login) {
        this.userInfo.appendChild([
          img({ src: 'img/user.png', alt: 'user', className: classes.img, width: 24, height: 24 }),
          p(classes.text!, user.login)
        ]);
      }
      
      result = true;
    } else {
      this.items.forEach(item => {
        const name = item.getElement().dataset.data;
        if (name && NEED_AUTH.includes(getNavigation(name))) {
          item.getElement().classList.add(classes.disable!);
        }
        if (name === 'auth') {
          item.setText('Logout');
        }
      });
      this.userInfo.clear();
    }
    return result;
  }
  
  private getNavList(): BaseComponent {
    const navMenu = nav({ className: classes.navbar });
    const navList = ul({ className: classes['navbar-nav'] });
    Object.entries(Navigation).forEach(([key, value]) => {
      if (value && key) {
        const needsAuth = !this.isAuth && NEED_AUTH.includes(value);
        const newItems = this.getNavItem(this.getTittle(value), value, value === this.active, needsAuth);
        this.items.push(newItems);
      }
    });
    navList.appendChild(this.items);
    navMenu.appendChild([navList])
    return navMenu;
  }

  private getNavItem(tittle: string, data: string, active: boolean, disable: boolean): BaseComponent {
    const items = li(`${classes['nav-item']}  ${active ? classes.active : ''} ${disable ? classes.disable : ''} `, this.onLinkClick,
      a({ className: classes['nav-link'], textContent: tittle }));
    items.getElement().dataset.data = data;
    return items
  }


  private onLinkClick = (evt: Event): void => {
    const item = evt.currentTarget;
    if (item &&
      item instanceof HTMLElement &&
      !item.classList.contains(classes.active!) &&
      !item.classList.contains(classes.disable!)) {
      const newLink = item.dataset.data;
      if (newLink) {
        const navPage = getNavigation(newLink);
        if (navPage === Navigation.auth && this.isAuth) {
          this.logout();
        } else {
          navigateTo(navPage);
          this.setActivePage(navPage);
        }
        
      }
    }
  }

  private logout(): void {
    if (this.controller) {
      this.controller.startLogout();
    }
  }

    private getTittle(name: string): string {
      let tittle = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      if (name === 'auth') {
        tittle = this.isAuth ? 'Logout' : 'Login';
      }
      return tittle;
    }


}

