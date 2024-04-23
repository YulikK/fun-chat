import type Controller from "../controller/controller.ts";
import type Store from "../store/store.ts";
import { Navigation } from "../utils/type.ts";

const needAuth = [Navigation.chat];
const needLogout = [Navigation.auth];

type NavigationCallback = (page: Navigation) => void

export function navigateTo(page: Navigation): void {
  window.location.hash = page;
}

export function initializeRouter(onRouteChange: NavigationCallback, storeObj: Store, controller: Controller): void {
  changePage(onRouteChange, storeObj, controller)

  window.addEventListener('hashchange', () => {
    changePage(onRouteChange, storeObj, controller);
  });

}

function changePage(onRouteChange: NavigationCallback, store: Store, controller: Controller): void {
  const isAuth = store.isAuth();
  const pageString = window.location.hash.slice(1);
  const navPage = getNavigation(pageString);

  if (needLogout.includes(navPage)){
    controller.ctrAuth.startLogout();
  }

  if (!isAuth && needAuth.includes(navPage)) {
    navigateTo(Navigation.auth);
    onRouteChange(Navigation.auth);
  } else {
    onRouteChange(navPage);
  }
}

export function getNavigation(pageString: string): Navigation {
  const navigationValues = Object.values(Navigation);

  const foundValue = navigationValues.find(value => value.toLowerCase() === pageString.toLowerCase());

  if (foundValue) {
    return foundValue;
  }

  return Navigation.page404;
}
