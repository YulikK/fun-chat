import "modern-normalize/modern-normalize.css";
import Header from "./app/components/header/header.ts";
import GaragePage from "./app/pages/garage/garage.ts";
import WinnersPage from "./app/pages/winners/winners.ts";
import Page404 from "./app/pages/404/404.ts";
import CarsModel from "./app/model/cars-model.ts";
import { Navigation } from "./app/utils/type.ts";
import { initializeRouter } from "./app/api/router.ts";
import type { BaseComponent } from "./app/components/base-components.ts";
import './app.scss';

const {body} = document;
const carsModel = new CarsModel();
const header = new Header();
const garagePage = new GaragePage(carsModel);
const winnersPage = new WinnersPage(carsModel);
const page404 = new Page404();
carsModel.load();

body.appendChild(header.getElement());

function renderPage(page: Navigation): void {
  switch (page) {
    case Navigation.garage:
      render(Navigation.garage, garagePage)
      break;
    case Navigation.winners:
      garagePage.stopRace();
      render(Navigation.winners, winnersPage)
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

