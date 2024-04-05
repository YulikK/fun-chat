import { Navigation } from "../utils/type.ts";

export function navigateTo(page: Navigation): void {
  window.location.hash = page;
}

export function initializeRouter(onRouteChange: (page: Navigation) => void): void {
  window.addEventListener('hashchange', () => {
    const pageString = window.location.hash.slice(1);
    const navPage = getNavigation(pageString);
    onRouteChange(navPage);
  });

  if (window.location.hash === '') {
    navigateTo(Navigation.auth);
  } else {
    const pageString = window.location.hash.slice(1);
    const navPage = getNavigation(pageString);
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

// export function getNavigation(value: string): Navigation {
//   if (value.toLowerCase() === 'auth') {
//     return Navigation.auth;
//   } if( value.toLowerCase() === 'info') {
//     return Navigation.info;
//   } if( value.toLowerCase() === 'chat') {
//     return Navigation.chat;
//   } 
//     return Navigation.page404;
  