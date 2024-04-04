// import { BaseComponent } from "@/app/components/base-components.ts";
// import { Navigation } from "@/app/utils/type.ts";
// import { navigateTo, getNavigation } from "@/app/api/router.ts";
// import { li, a, ul, nav } from "../tags.ts";
// import classes from "./header.module.scss";

// export default class Header extends BaseComponent {
//   private active: Navigation = Navigation.garage;

//   private items: BaseComponent[] = [];

//   constructor() {
//     super({ tag: 'header' });
//     this.append(this.getNavList());
//   }

//   public setActivePage(page: Navigation): void {
//     this.items.forEach(item => item.removeClass(classes.active!));
//     const item = this.items.find(el => el.getElement().textContent?.toLowerCase() === page);
//     if (item) {
//       item.getElement().classList.add(classes.active!);
//     }
//   }
  
//   private getNavList(): BaseComponent {
//     const navMenu = nav({ className: classes.navbar });
//     const navList = ul({ className: classes['navbar-nav'] });
//     const navItems: BaseComponent[] = [];
//     Object.entries(Navigation).forEach(([key, value]) => {
//       if (value && key) {
//         navItems.push(this.getNavItem(value, value === this.active));
//       }
//     });
//     navList.appendChild(navItems);
//     navMenu.appendChild([navList])
//     return navMenu;
//   }

//   private getNavItem(name: string, active: boolean): BaseComponent {
//     const items = li(`${classes['nav-item']} ${active ? classes.active : ''}`, this.onLinkClick,
//       a({ className: classes['nav-link'], textContent: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() }));
//     this.items.push(items);
//     return items
//   }

//   private onLinkClick = (evt: Event): void => {
//     const item = evt.currentTarget;
//     if (item && item instanceof HTMLElement) {
//       const link = item.firstChild;
//       if (link instanceof HTMLElement && link.textContent) {
//         const text = link.textContent.toLowerCase();
//         const navPage = getNavigation(text);
//         navigateTo(navPage);
//         this.setActivePage(navPage);
//       }
//     }
//   }


// }