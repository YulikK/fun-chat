import "modern-normalize/modern-normalize.css";
import Header from "./app/components/header/header.ts";
import Page404 from "./app/pages/404/404.ts";
import { Navigation } from "./app/utils/type.ts";
import { initializeRouter } from "./app/api/router.ts";
import type { BaseComponent } from "./app/components/base-components.ts";

const {body} = document;
const header = new Header();
const page404 = new Page404();

// carsModel.load();

body.appendChild(header.getElement());
function renderPage(page: Navigation): void {
  switch (page) {
    case Navigation.auth:
      render(Navigation.page404, page404)
      // render(Navigation.garage, garagePage)
      break;
    case Navigation.info:
      render(Navigation.page404, page404)
      // garagePage.stopRace();
      // render(Navigation.winners, winnersPage)
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
  body.appendChild(pageComponent.getElement());
}

initializeRouter(renderPage);

