import "modern-normalize/modern-normalize.css";
import Header from "./app/components/header/header.ts";
import Page404 from "./app/pages/404/404.ts";
import AlertStack from "./app/components/alert-stack/alert-stack.ts";
import AuthPage from "./app/pages/auth/auth.ts";
import ChatPage from "./app/pages/chat/chat.ts";
import Info from "./app/pages/info/info.ts";
import Controller from "./app/controller/controller.ts";
import Store from "./app/store/store.ts";
import { Navigation } from "./app/utils/type.ts";
import { initializeRouter } from "./app/api/router.ts";
import type { BaseComponent } from "./app/components/base-components.ts";
import { div } from "./app/components/tags.ts";

const { body } = document;
const store = new Store();
const header = new Header();
const page404 = new Page404();
const pageInfo = new Info();
const alertStack = new AlertStack();
const pageAuth = new AuthPage();
const pageChat = new ChatPage();

const controller = new Controller(store, pageAuth, pageChat, alertStack, header);
pageAuth.setController(controller);
store.setController(controller);
header.setController(controller);


const pageContainer = div({ id: 'app' });
body.appendChild(header.getElement());
body.appendChild(pageContainer.getElement());
body.appendChild(alertStack.getElement());


function renderPage(page: Navigation): void {
  switch (page) {
    case Navigation.auth:
      render(Navigation.auth, pageAuth)
      break;
    case Navigation.info:
      render(Navigation.info, pageInfo)
      break;
    case Navigation.chat:
      render(Navigation.chat, pageChat);
      break;
    default:
      render(Navigation.page404, page404)
      break;
  }
}

function render(page: Navigation, pageComponent: BaseComponent): void {
  pageContainer.clear();
  header.setActivePage(page);
  pageContainer.append(pageComponent);
}

initializeRouter(renderPage);


