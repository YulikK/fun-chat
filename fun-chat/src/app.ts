import "modern-normalize/modern-normalize.css";
import Header from "./app/components/header/header.ts";
import Page404 from "./app/pages/404/404.ts";
import AlertStack from "./app/components/alert-stack/alert-stack.ts";
import AuthPage from "./app/pages/auth/auth.ts";
import Info from "./app/pages/info/info.ts";
import { Navigation } from "./app/utils/type.ts";
import { initializeRouter } from "./app/api/router.ts";
import type { BaseComponent } from "./app/components/base-components.ts";

const {body} = document;
const header = new Header();
const page404 = new Page404();
const pageInfo = new Info();
const alertStack = new AlertStack();
const pageAuth = new AuthPage(alertStack);


// carsModel.load();


// export default alertStack = div({ className: classes.stack });

// body.appendChild(header.getElement());
// body.appendChild(alertStack.getElement());
function renderPage(page: Navigation): void {
  switch (page) {
    case Navigation.auth:
      render(Navigation.auth, pageAuth)
      // render(Navigation.garage, garagePage)
      break;
    case Navigation.info:
      render(Navigation.info, pageInfo)
      break;
    case Navigation.chat:
      render(Navigation.page404, page404)
      // garagePage.stopRace();
      // render(Navigation.winners, winnersPage)
      break;
    default:
      render(Navigation.page404, page404)
      break;
  }
}

function render(page: Navigation, pageComponent: BaseComponent): void {
  body.innerHTML = '';
  header.setActivePage(page);
  body.appendChild(header.getElement());
  body.appendChild(alertStack.getElement());
  body.appendChild(pageComponent.getElement());
}

initializeRouter(renderPage);


