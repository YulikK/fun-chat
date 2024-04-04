// import { Navigation } from "../utils/type.ts";

// export function navigateTo(page: Navigation): void {
//   window.location.hash = page;
// }

// export function initializeRouter(onRouteChange: (page: Navigation) => void): void {
//   window.addEventListener('hashchange', () => {
//     const pageString = window.location.hash.slice(1);
//     const navPage = getNavigation(pageString);
//     onRouteChange(navPage);
//   });

//   if (window.location.hash === '') {
//     navigateTo(Navigation.garage);
//   } else {
//     const pageString = window.location.hash.slice(1);
//     const navPage = getNavigation(pageString);
//     onRouteChange(navPage);
//   }
// }

// export function getNavigation(value: string): Navigation {
//   if (value.toLowerCase() === 'garage') {
//     return Navigation.garage;
//   } if( value.toLowerCase() === 'winners') {
//     return Navigation.winners;
//   } 
//     return Navigation.page404;
  
// }