var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link2 of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link2);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link2) {
    const fetchOpts = {};
    if (link2.integrity) fetchOpts.integrity = link2.integrity;
    if (link2.referrerPolicy) fetchOpts.referrerPolicy = link2.referrerPolicy;
    if (link2.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link2.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link2) {
    if (link2.ep)
      return;
    link2.ep = true;
    const fetchOpts = getFetchOpts(link2);
    fetch(link2.href, fetchOpts);
  }
})();
const SRC = {
  git: `img/git.png`,
  gitHref: `https://github.com/YulikK`,
  gitAlt: `GitHub`,
  rs: `img/RS.png`,
  rsAlt: `RS School`,
  rsHref: `https://rs.school/js/`,
  isEdit: `img/is-edit.png`,
  altIsEdit: `is edit`,
  user: `img/user.png`,
  userAlt: `user`,
  logo: `img/logo.png`,
  logoAlt: `logo`,
  spinner: `img/spinner.gif`,
  spinnerAlt: `spinner`,
  p404: `img/404.png`,
  p404Alt: `404`
};
const TXT = {
  name: `Name`,
  password: `Password`,
  find: `find...`,
  login: `Login`,
  logout: `Logout`,
  year: `2024`,
  myMsg: `You`,
  infoTittle: `Dear friend!`,
  infoDescription: `Welcome to Fun-Chat – a web application for chatting with friends. Here, you can share photos, send voice messages, and exchange memes. Whether you’re looking for lighthearted conversations or serious discussions, we’ve got a place for everyone. Let’s get started and create unforgettable moments together! 🎉📱👋`,
  message404: `Ups... 404 Page not found`,
  messageEmptyUser: `Chose user for dialog`,
  messageEmptyChat: `Start your dialog`,
  messageNewMessage: `New message`,
  messageBCError: `Child is not an instance of BaseComponent`,
  messageServerDisconnect: `Lost connection with server`
};
class BaseComponent {
  constructor(props, ...child) {
    __publicField(this, "element");
    __publicField(this, "child", []);
    this.element = document.createElement(props.tag);
    Object.assign(this.element, props);
    if (child) {
      this.appendChild(child);
    }
  }
  append(child) {
    this.child.push(child);
    this.element.append(child.getElement());
  }
  appendChild(child) {
    child.forEach((el) => {
      if (el instanceof BaseComponent) {
        this.append(el);
      } else {
        throw new Error(TXT.messageBCError);
      }
    });
  }
  getElement() {
    return this.element;
  }
  getChildren() {
    return this.child;
  }
  destroy() {
    this.destroyChild();
    this.element.remove();
  }
  clear() {
    this.element.innerHTML = "";
  }
  destroyChild() {
    this.child.forEach((child) => child.destroy());
    this.child = [];
  }
  clearChild() {
    this.child = [];
  }
  removeChild(child) {
    this.child = this.child.filter((el) => el !== child);
    child.destroy();
  }
  getValue() {
    let value = "";
    if (this.element instanceof HTMLInputElement) {
      value = this.element.value.trim();
    }
    return value;
  }
  setValue(value) {
    if (this.element instanceof HTMLInputElement) {
      this.element.value = value;
    }
  }
  setElementSrc(src) {
    if (this.element instanceof HTMLImageElement) {
      this.element.src = src;
    }
  }
  setText(text2) {
    this.element.textContent = text2;
  }
  addListener(listener, callback) {
    this.element.addEventListener(listener, callback);
  }
  addClass(classNameClassName) {
    this.element.classList.add(classNameClassName);
  }
  toggleClass(classSurname) {
    this.element.classList.toggle(classSurname);
  }
  removeClass(className) {
    this.element.classList.remove(className);
  }
}
var Navigation = /* @__PURE__ */ ((Navigation2) => {
  Navigation2["auth"] = "auth";
  Navigation2["info"] = "info";
  Navigation2["chat"] = "chat";
  Navigation2["page404"] = "";
  return Navigation2;
})(Navigation || {});
var Fields = /* @__PURE__ */ ((Fields2) => {
  Fields2["name"] = "name";
  Fields2["password"] = "password";
  Fields2["search"] = "search";
  return Fields2;
})(Fields || {});
var Status = /* @__PURE__ */ ((Status2) => {
  Status2["sended"] = "sended";
  Status2["delivered"] = "delivered";
  Status2["readed"] = "readed";
  return Status2;
})(Status || {});
var UserActions = /* @__PURE__ */ ((UserActions2) => {
  UserActions2["LOGIN"] = "USER_LOGIN";
  UserActions2["LOGOUT"] = "USER_LOGOUT";
  UserActions2["USER_ACTIVE"] = "USER_ACTIVE";
  UserActions2["USER_INACTIVE"] = "USER_INACTIVE";
  UserActions2["USER_EXTERNAL_LOGIN"] = "USER_EXTERNAL_LOGIN";
  UserActions2["USER_EXTERNAL_LOGOUT"] = "USER_EXTERNAL_LOGOUT";
  return UserActions2;
})(UserActions || {});
var MessageActions = /* @__PURE__ */ ((MessageActions2) => {
  MessageActions2["MSG_SEND"] = "MSG_SEND";
  MessageActions2["MSG_FROM_USER"] = "MSG_FROM_USER";
  MessageActions2["MSG_DELIVER"] = "MSG_DELIVER";
  MessageActions2["MSG_READ"] = "MSG_READ";
  MessageActions2["MSG_DELETE"] = "MSG_DELETE";
  MessageActions2["MSG_EDIT"] = "MSG_EDIT";
  return MessageActions2;
})(MessageActions || {});
var AppError = /* @__PURE__ */ ((AppError2) => {
  AppError2["ERROR"] = "ERROR";
  return AppError2;
})(AppError || {});
const needAuth = [Navigation.chat];
const needLogout = [Navigation.auth];
function navigateTo(page) {
  window.location.hash = page;
}
function navigateAfterLogin() {
  const pageString = window.location.hash.slice(1);
  const navPage = getNavigation(pageString);
  if (navPage === Navigation.auth) {
    navigateTo(Navigation.chat);
  }
}
function initializeRouter(onRouteChange, storeObj, controller2) {
  changePage(onRouteChange, storeObj, controller2);
  window.addEventListener("hashchange", () => {
    changePage(onRouteChange, storeObj, controller2);
  });
}
function changePage(onRouteChange, store2, controller2) {
  const isAuth = store2.isAuth();
  const pageString = window.location.hash.slice(1);
  const navPage = getNavigation(pageString);
  if (needLogout.includes(navPage)) {
    controller2.ctrAuth.startLogout();
  }
  if (!isAuth && needAuth.includes(navPage)) {
    navigateTo(Navigation.auth);
    onRouteChange(Navigation.auth);
  } else {
    onRouteChange(navPage);
  }
}
function getNavigation(pageString) {
  const navigationValues = Object.values(Navigation);
  const foundValue = navigationValues.find((value) => value.toLowerCase() === pageString.toLowerCase());
  if (foundValue) {
    return foundValue;
  }
  return Navigation.page404;
}
const div = (props, ...children) => new BaseComponent({ ...props, tag: "div" }, ...children);
const aside$1 = (props, ...children) => new BaseComponent({ ...props, tag: "aside" }, ...children);
const article$1 = (props, ...children) => new BaseComponent({ ...props, tag: "article" }, ...children);
const h1 = (className, textContent, ...children) => new BaseComponent({ tag: "h1", className, textContent }, ...children);
const p = (className, textContent) => new BaseComponent({ tag: "p", className, textContent });
const img$5 = ({ src = "", alt = "", className = "", width = 0, height = 0 }) => new BaseComponent({ tag: "img", className, src, alt, width, height });
const a = (props, ...children) => new BaseComponent({ ...props, tag: "a" }, ...children);
const span = (props, ...children) => new BaseComponent({ ...props, tag: "span" }, ...children);
const li = (className, onclick, ...children) => new BaseComponent({ tag: "li", className, onclick }, ...children);
const ul = (props, ...children) => new BaseComponent({ ...props, tag: "ul" }, ...children);
const nav = (props, ...children) => new BaseComponent({ ...props, tag: "nav" }, ...children);
const form$2 = (props, ...children) => new BaseComponent({ ...props, tag: "form" }, ...children);
const navbar = "_navbar_1pobv_1";
const active$1 = "_active_1pobv_36";
const disable = "_disable_1pobv_44";
const wrap$2 = "_wrap_1pobv_52";
const img$4 = "_img_1pobv_60";
const text$2 = "_text_1pobv_67";
const logo = "_logo_1pobv_79";
const classes$i = {
  navbar,
  "navbar-nav": "_navbar-nav_1pobv_10",
  "nav-link": "_nav-link_1pobv_20",
  "nav-item": "_nav-item_1pobv_24",
  active: active$1,
  disable,
  wrap: wrap$2,
  img: img$4,
  text: text$2,
  logo
};
const NEED_AUTH = [Navigation.chat];
class Header extends BaseComponent {
  constructor() {
    super({ tag: "header" });
    __publicField(this, "controller", null);
    __publicField(this, "isAuth", false);
    __publicField(this, "active", Navigation.chat);
    __publicField(this, "items", []);
    __publicField(this, "userInfo");
    __publicField(this, "navList");
    __publicField(this, "onLinkClick", (evt) => {
      const item = evt.currentTarget;
      if (item && item instanceof HTMLElement && !item.classList.contains(classes$i.active) && !item.classList.contains(classes$i.disable)) {
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
    });
    this.navList = this.getNavList();
    this.userInfo = div({ className: classes$i.wrap });
    this.navList.append(this.userInfo);
    this.append(this.navList);
  }
  setController(controller2) {
    this.controller = controller2;
  }
  setActivePage(page) {
    this.items.forEach((item2) => item2.removeClass(classes$i.active));
    const item = this.items.find((el) => el.getElement().dataset.data === page);
    if (item) {
      item.getElement().classList.add(classes$i.active);
    }
  }
  changeAuth(isAuth, user2) {
    this.isAuth = isAuth;
    this.items.forEach((item) => {
      this.updateNavItem(item);
      this.updateUserInfo(user2);
    });
  }
  updateNavItem(item) {
    item.removeClass(classes$i.disable);
    const { data } = item.getElement().dataset;
    if (data) {
      const tittle2 = this.getTittle(data);
      item.setText(tittle2);
    }
    if (!this.isAuth && data && NEED_AUTH.includes(getNavigation(data))) {
      item.getElement().classList.add(classes$i.disable);
    }
  }
  updateUserInfo(user2) {
    this.userInfo.clear();
    if (this.isAuth && user2) {
      this.userInfo.appendChild([
        img$5({ src: SRC.user, alt: SRC.userAlt, className: classes$i.img, width: 24, height: 24 }),
        p(classes$i.text, user2.login)
      ]);
    }
  }
  getNavList() {
    const navMenu = nav({ className: classes$i.navbar });
    const navList = ul({ className: classes$i["navbar-nav"] });
    this.updateItemsArray();
    navList.appendChild(this.items);
    const logo2 = img$5({ src: SRC.logo, alt: SRC.logoAlt, className: classes$i.logo, width: 100, height: 35 });
    navMenu.appendChild([logo2, navList]);
    return navMenu;
  }
  updateItemsArray() {
    Object.entries(Navigation).forEach(([key, value]) => {
      if (value && key) {
        const needsAuth = !this.isAuth && NEED_AUTH.includes(value);
        const newItems = this.getNavItem(this.getTittle(value), value, value === this.active, needsAuth);
        this.items.push(newItems);
      }
    });
  }
  getNavItem(tittle2, data, active2, disable2) {
    const items = li(
      `${classes$i["nav-item"]}  ${active2 ? classes$i.active : ""} ${disable2 ? classes$i.disable : ""} `,
      this.onLinkClick,
      a({ className: classes$i["nav-link"], textContent: tittle2 })
    );
    items.getElement().dataset.data = data;
    return items;
  }
  logout() {
    if (this.controller) {
      this.controller.ctrAuth.startLogout();
    }
  }
  getTittle(name) {
    let tittle2 = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    if (name === Navigation.auth.toString()) {
      tittle2 = this.isAuth ? TXT.logout : TXT.login;
    }
    return tittle2;
  }
}
const container$2 = "_container_6g447_1";
const text$1 = "_text_6g447_5";
const img$3 = "_img_6g447_17";
const classes$h = {
  container: container$2,
  text: text$1,
  img: img$3
};
class Page404 extends BaseComponent {
  constructor() {
    super({ tag: "div", className: classes$h.container });
    this.appendChild([
      p(classes$h.text, TXT.message404),
      img$5({ className: classes$h.img, src: SRC.p404, alt: SRC.p404Alt, width: 500 })
    ]);
  }
}
const stack = "_stack_tjvmf_1";
const classes$g = {
  stack
};
class AlertStack extends BaseComponent {
  constructor() {
    super({ tag: "div", className: classes$g.stack });
  }
}
const message$2 = {
  minLength: "Value is too short",
  startsWithCapitalLetter: "Value must start with a capital letter",
  onlyLatinLetters: "Value must contain only Latin letters",
  hasLowerCase: "Value must contain at least one lowercase letter",
  hasUpperCase: "Value must contain at least one uppercase letter",
  hasNumberOrSpecialCharacter: "Value must contain at least one number or special character"
};
const _Validation = class _Validation {
  constructor(rules) {
    __publicField(this, "rules", []);
    this.rules = rules;
  }
  validate(value) {
    let errorMessage2 = null;
    this.rules.forEach((rule) => {
      const result = rule(value);
      if (!errorMessage2 && result) {
        errorMessage2 = result;
      }
    });
    return errorMessage2;
  }
  static minLengthRuleWrapper(minLength) {
    return (value) => _Validation.minLengthRule(value, minLength);
  }
};
__publicField(_Validation, "minLengthRule", (value, minLength) => value.length >= minLength ? null : message$2.minLength);
__publicField(_Validation, "startsWithCapitalLetterRule", (value) => value.charAt(0) === value.charAt(0).toUpperCase() ? null : message$2.startsWithCapitalLetter);
__publicField(_Validation, "onlyLatinLettersRule", (value) => /^[a-zA-Z]+$/.test(value) ? null : message$2.onlyLatinLetters);
__publicField(_Validation, "hasLowerCaseRule", (value) => /[a-z]/.test(value) ? null : message$2.hasLowerCase);
__publicField(_Validation, "hasUpperCaseRule", (value) => /[A-Z]/.test(value) ? null : message$2.hasUpperCase);
__publicField(_Validation, "hasNumberOrSpecialCharacterRule", (value) => /\d|[!@#$%^&*(),.?":{}|<>]/.test(value) ? null : message$2.hasNumberOrSpecialCharacter);
let Validation = _Validation;
const input$1 = "_input_1k8mo_1";
const success = "_success_1k8mo_9";
const error = "_error_1k8mo_12";
const errorMessage = "_errorMessage_1k8mo_26";
const classes$f = {
  input: input$1,
  success,
  error,
  errorMessage
};
class Input extends BaseComponent {
  constructor({ id, type: type2, placeholder, className, errorContainer, validation, value = "" }) {
    super({ tag: "input", id, type: type2, placeholder, className: `${classes$f.input} ${className || ""}`, value });
    __publicField(this, "errorContainer", null);
    __publicField(this, "errorsMsg", null);
    __publicField(this, "id");
    __publicField(this, "validation");
    __publicField(this, "onChange", (event) => {
      if (this.validation) {
        event.preventDefault();
        this.validate();
      }
    });
    __publicField(this, "validate", () => {
      const value = this.getValue();
      let isValid = true;
      if (this.validation) {
        const message2 = this.validation.validate(value);
        if (message2) {
          this.setError(`${this.id.toString()}: ${message2}`);
          isValid = false;
        } else {
          this.setSuccess();
        }
      }
      return isValid;
    });
    this.id = id;
    this.validation = validation;
    if (errorContainer) {
      this.errorContainer = errorContainer;
    }
    this.element.addEventListener("change", this.onChange);
  }
  isValid() {
    return this.validate();
  }
  setError(error2) {
    if (this.errorContainer && this.validation) {
      this.errorContainer.getElement().innerHTML = "";
      this.errorsMsg = p(classes$f.errorMessage, error2);
      this.errorContainer.append(this.errorsMsg);
      this.addClass(classes$f.error);
      this.removeClass(classes$f.success);
    }
  }
  setSuccess() {
    if (this.validation && this.errorContainer) {
      this.errorContainer.getElement().innerHTML = "";
      if (this.errorsMsg) {
        this.errorsMsg.destroy();
      }
      this.addClass(classes$f.success);
      this.removeClass(classes$f.error);
    }
  }
}
const btn = "_btn_1rwoq_1";
const classes$e = {
  btn
};
const Button = ({ textContent, onClick, className }) => new BaseComponent({
  tag: "button",
  className: `${classes$e.btn} ${className || ""}`,
  textContent,
  onclick: (PreventDefault) => {
    PreventDefault.preventDefault();
    onClick == null ? void 0 : onClick();
  }
});
const container$1 = "_container_dvjpy_1";
const form$1 = "_form_dvjpy_9";
const errors = "_errors_dvjpy_21";
const inputWrapper = "_inputWrapper_dvjpy_30";
const img$2 = "_img_dvjpy_36";
const login = "_login_dvjpy_45";
const tittle$2 = "_tittle_dvjpy_49";
const classes$d = {
  container: container$1,
  form: form$1,
  errors,
  inputWrapper,
  img: img$2,
  login,
  tittle: tittle$2
};
const MIN_LENGTH_NAME = 3;
const MIN_LENGTH_PASS = 4;
class AuthPage extends BaseComponent {
  constructor() {
    super({ tag: "div", className: classes$d.container });
    __publicField(this, "controller", null);
    __publicField(this, "name");
    __publicField(this, "password");
    __publicField(this, "errorsContainer");
    __publicField(this, "loginBtn");
    __publicField(this, "login", () => {
      if (this.validateForm()) {
        const user2 = {
          login: this.name.getValue(),
          password: this.password.getValue()
        };
        if (this.controller !== null) {
          this.controller.ctrAuth.login(user2);
        }
      }
    });
    __publicField(this, "validateForm", () => this.name.isValid() && this.password.isValid());
    this.errorsContainer = div({ className: classes$d.errors });
    this.name = new Input({ id: Fields.name, type: "text", placeholder: TXT.name, errorContainer: this.errorsContainer, validation: getValidation(Fields.name) });
    this.password = new Input({ id: Fields.password, type: "password", placeholder: TXT.password, errorContainer: this.errorsContainer, validation: getValidation(Fields.password) });
    this.loginBtn = Button({ textContent: TXT.login, className: classes$d.login });
    this.addListener("submit", this.login);
    this.loginBtn.addListener("click", this.login);
    this.generateView();
  }
  setController(controller2) {
    let result = false;
    if (controller2) {
      this.controller = controller2;
      result = true;
    }
    return result;
  }
  resetForm() {
    this.name.setValue("");
    this.password.setValue("");
  }
  generateView() {
    const modal2 = form$2(
      { className: classes$d.form },
      img$5({ className: classes$d.img, src: SRC.user, alt: SRC.userAlt, width: 40, height: 40 }),
      div(
        { className: classes$d.inputWrapper },
        this.name,
        this.password
      ),
      this.errorsContainer,
      this.loginBtn
    );
    this.append(modal2);
  }
}
function getValidation(field) {
  switch (field) {
    case Fields.name:
      return new Validation([
        Validation.minLengthRuleWrapper(MIN_LENGTH_NAME),
        Validation.startsWithCapitalLetterRule,
        Validation.onlyLatinLettersRule
      ]);
    case Fields.password:
      return new Validation([
        Validation.minLengthRuleWrapper(MIN_LENGTH_PASS),
        Validation.hasLowerCaseRule,
        Validation.hasUpperCaseRule,
        Validation.hasNumberOrSpecialCharacterRule
      ]);
    default:
      return void 0;
  }
}
const chat = "_chat_6e11b_1";
const classes$c = {
  chat
};
const user$2 = "_user_1gcdn_1";
const tittle$1 = "_tittle_1gcdn_10";
const img$1 = "_img_1gcdn_20";
const online = "_online_1gcdn_27";
const hide$3 = "_hide_1gcdn_31";
const active = "_active_1gcdn_35";
const badges = "_badges_1gcdn_43";
const classes$b = {
  user: user$2,
  tittle: tittle$1,
  img: img$1,
  online,
  hide: hide$3,
  active,
  badges
};
class UserComponent extends BaseComponent {
  constructor(user2) {
    super({ tag: "li", className: `${classes$b.user} ${user2.isLogined ? classes$b.online : ""}` });
    __publicField(this, "user");
    __publicField(this, "text", null);
    __publicField(this, "badge");
    __publicField(this, "status");
    __publicField(this, "newMsg", 0);
    this.user = user2;
    this.status = user2.isLogined;
    this.badge = span({ className: classes$b.badges, textContent: this.newMsg ? this.newMsg.toString() : "" });
    this.text = p(classes$b.tittle, this.user.login);
    const userLogo = img$5({ src: SRC.user, alt: SRC.userAlt, className: classes$b.img, width: 20, height: 20 });
    this.appendChild([userLogo, this.text, this.badge]);
  }
  setMessageCount(count) {
    this.newMsg = count;
    this.updateBadge();
  }
  updateBadge() {
    this.badge.setText(this.newMsg ? this.newMsg.toString() : "");
  }
  setActive(status) {
    if (status) {
      this.addClass(classes$b.active);
    } else {
      this.removeClass(classes$b.active);
    }
  }
  setOnline(status) {
    this.status = status;
    if (status) {
      this.toggleClass(classes$b.online);
    } else {
      this.removeClass(classes$b.online);
    }
  }
  getStatus() {
    return this.status;
  }
  getUser() {
    return this.user;
  }
  show() {
    this.removeClass(classes$b.hide);
    return this.user;
  }
  hide() {
    this.addClass(classes$b.hide);
    return this.user;
  }
}
const head = "_head_1myd0_1";
const user$1 = "_user_1myd0_10";
const classes$a = {
  head,
  user: user$1
};
class ChatHead extends BaseComponent {
  constructor(user2) {
    super({ tag: "header", className: classes$a.head });
    __publicField(this, "user");
    __publicField(this, "userComponent");
    this.user = user2;
    this.userComponent = new UserComponent(this.user);
    this.userComponent.addClass(classes$a.user);
    this.append(this.userComponent);
  }
  updateStatus(status) {
    this.userComponent.setOnline(status);
  }
}
function getDateFormat(datetime) {
  const date = new Date(datetime);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}
const message$1 = "_message_13yeu_1";
const edit = "_edit_13yeu_19";
const left = "_left_13yeu_23";
const right = "_right_13yeu_27";
const controls = "_controls_13yeu_31";
const user = "_user_13yeu_47";
const time = "_time_13yeu_48";
const text = "_text_13yeu_56";
const wrap$1 = "_wrap_13yeu_64";
const info = "_info_13yeu_71";
const img = "_img_13yeu_79";
const hide$2 = "_hide_13yeu_84";
const classes$9 = {
  message: message$1,
  "btn-round": "_btn-round_13yeu_10",
  edit,
  left,
  right,
  controls,
  user,
  time,
  text,
  wrap: wrap$1,
  info,
  img,
  hide: hide$2
};
class MessageComponent extends BaseComponent {
  constructor(message2, isMy, user2, deleteCallback, editCallback) {
    super({ tag: "div", className: `${classes$9.message} ${isMy ? classes$9.right : classes$9.left}` });
    __publicField(this, "message");
    __publicField(this, "text");
    __publicField(this, "time");
    __publicField(this, "user");
    __publicField(this, "editStatus");
    __publicField(this, "btnEdit");
    __publicField(this, "btnDelete");
    __publicField(this, "isMy");
    __publicField(this, "deliverStatus");
    __publicField(this, "isEdit", false);
    __publicField(this, "deleteCallback");
    __publicField(this, "editCallback");
    __publicField(this, "onDelete", () => {
      this.deleteCallback(this.message);
    });
    __publicField(this, "onEdit", () => {
      this.addClass(classes$9.edit);
      this.editCallback(this.message);
    });
    this.message = message2;
    this.deleteCallback = deleteCallback;
    this.editCallback = editCallback;
    this.text = p(classes$9.text, message2.text);
    this.time = span({ className: classes$9.time, textContent: getDateFormat(message2.datetime) });
    this.isMy = isMy;
    this.user = span({ className: classes$9.user, textContent: `${this.isMy ? TXT.myMsg : user2.login}` });
    this.editStatus = img$5({ className: `${classes$9.img} ${!this.message.status.isEdited ? classes$9.hide : ""}`, src: SRC.isEdit, alt: SRC.altIsEdit, width: 15, height: 15 });
    this.btnEdit = getBtn("edit");
    this.btnDelete = getBtn("delete");
    this.btnDelete.addListener("click", this.onDelete);
    this.btnEdit.addListener("click", this.onEdit);
    this.deliverStatus = this.getStatusComponent();
    this.appendChild(this.getView());
  }
  getMessage() {
    return this.message;
  }
  updateMessage(message2) {
    this.message = message2;
    this.text.setText(message2.text);
    this.updateDeliverStatus();
    this.updateEditStatus();
  }
  updateDeliverStatus() {
    const status = this.getStatus();
    this.deliverStatus.setElementSrc(`img/${status}.png`);
  }
  updateEditStatus() {
    if (this.message.status.isEdited) {
      this.editStatus.removeClass(classes$9.hide);
    }
  }
  getStatusComponent() {
    const status = this.getStatus();
    return img$5({ className: classes$9.img, src: `img/${status}.png`, alt: status, width: 15, height: 15 });
  }
  getStatus() {
    let status = Status.sended;
    status = this.message.status.isDelivered ? Status.delivered : status;
    status = this.message.status.isReaded ? Status.readed : status;
    return status;
  }
  getView() {
    const controls2 = div({ className: classes$9.controls });
    controls2.append(div(
      { className: classes$9.wrap },
      this.user,
      this.editStatus
    ));
    if (this.isMy) {
      controls2.append(div(
        { className: classes$9.wrap },
        this.btnEdit,
        this.btnDelete
      ));
    }
    const info2 = div({ className: classes$9.info });
    info2.append(this.time);
    if (this.isMy) {
      info2.append(this.deliverStatus);
    }
    return [
      controls2,
      this.text,
      info2
    ];
  }
  setEditView(isEdit) {
    this.isEdit = isEdit;
    if (this.isEdit) {
      this.addClass(classes$9.edit);
    } else {
      this.removeClass(classes$9.edit);
    }
  }
}
function getBtn(name) {
  return a(
    { className: classes$9["btn-round"] },
    img$5({ className: classes$9.img, src: `img/${name}.png`, alt: name, width: 15, height: 15 })
  );
}
const dialog = "_dialog_v0gad_1";
const emptyDialog = "_emptyDialog_v0gad_12";
const classes$8 = {
  dialog,
  emptyDialog,
  "new": "_new_v0gad_26"
};
class Dialog extends BaseComponent {
  constructor(deleteMessageHandler, editMessageHandler) {
    super({ tag: "div", className: classes$8.dialog });
    __publicField(this, "messages", []);
    __publicField(this, "emptyDialog");
    __publicField(this, "isNewMessage", false);
    __publicField(this, "separator");
    __publicField(this, "isAutoScroll", false);
    __publicField(this, "deleteMessageHandler");
    __publicField(this, "editMessageHandler");
    this.deleteMessageHandler = deleteMessageHandler;
    this.editMessageHandler = editMessageHandler;
    this.emptyDialog = p(classes$8.emptyDialog, TXT.messageEmptyChat);
    this.separator = p(classes$8.new, TXT.messageNewMessage);
    this.append(this.emptyDialog);
  }
  addMessage(message2, isMy, user2) {
    const oldMsg = this.messages.find((msg2) => msg2.getMessage().id === message2.id);
    if (!oldMsg) {
      const messageEl = new MessageComponent(message2, isMy, user2, this.deleteMessageHandler, this.editMessageHandler);
      this.messages.push(messageEl);
      this.append(messageEl);
      this.scrollMessage();
    }
  }
  updateMessage(message2) {
    const messageEl = this.messages.find((el) => el.getMessage().id === message2.id);
    if (messageEl) {
      messageEl.updateMessage(message2);
    }
  }
  insertSeparator() {
    if (!this.isNewMessage) {
      this.isNewMessage = true;
      this.append(this.separator);
      this.scrollMessage();
    }
  }
  deleteSeparator() {
    if (this.isNewMessage) {
      this.isNewMessage = false;
      this.getElement().removeChild(this.separator.getElement());
    }
  }
  scrollMessage() {
    this.isAutoScroll = true;
    if (this.isNewMessage) {
      this.separator.getElement().scrollIntoView({ behavior: "smooth" });
    } else {
      const lastMessage = this.messages[this.messages.length - 1];
      if (lastMessage) {
        lastMessage.getElement().scrollIntoView({ behavior: "smooth" });
      }
    }
    requestAnimationFrame(() => {
      setTimeout(() => {
        this.isAutoScroll = false;
      }, 2e3);
    });
  }
  getIsAutoScroll() {
    return this.isAutoScroll;
  }
  showLastMessage() {
    this.isAutoScroll = true;
    if (this.isNewMessage) {
      this.getElement().scrollTop = this.separator.getElement().offsetTop - this.getElement().offsetHeight + this.separator.getElement().offsetHeight;
    } else {
      const lastMessage = this.messages[this.messages.length - 1];
      if (lastMessage) {
        this.getElement().scrollTop = lastMessage.getElement().offsetTop;
      }
    }
    setTimeout(() => {
      this.isAutoScroll = false;
    }, 2e3);
  }
  deleteMessage(message2) {
    this.isAutoScroll = true;
    const messageEl = this.messages.find((el) => el.getMessage().id === message2.id);
    if (messageEl) {
      this.messages = this.messages.filter((el) => el !== messageEl);
      this.removeChild(messageEl);
      messageEl.destroy();
    }
    setTimeout(() => {
      this.isAutoScroll = false;
    }, 2e3);
  }
  deleteEditStatus() {
    this.messages.forEach((el) => el.setEditView(false));
  }
  setEditStatus(message2, status) {
    const messageEl = this.messages.find((el) => el.getMessage().id === message2.id);
    if (messageEl) {
      messageEl.setEditView(status);
    }
  }
}
const form = "_form_e8g8b_1";
const input = "_input_e8g8b_12";
const button = "_button_e8g8b_27";
const btnClose = "_btnClose_e8g8b_45";
const hide$1 = "_hide_e8g8b_65";
const classes$7 = {
  form,
  input,
  button,
  btnClose,
  hide: hide$1
};
class MessageForm extends BaseComponent {
  constructor(submitCallback, editCallback, closeCallback) {
    super({ tag: "form", className: classes$7.form });
    __publicField(this, "text");
    __publicField(this, "button");
    __publicField(this, "btnClose");
    __publicField(this, "editMessage", null);
    __publicField(this, "submitCallback");
    __publicField(this, "editCallback");
    __publicField(this, "closeCallback");
    __publicField(this, "onSubmit", (event) => {
      event.preventDefault();
      const message2 = this.text.getValue();
      if (message2) {
        this.text.setValue("");
        if (this.editMessage) {
          if (this.editMessage.text !== message2) {
            this.editCallback(message2, this.editMessage);
          }
          this.onClose();
        } else {
          this.submitCallback(message2);
        }
      }
    });
    __publicField(this, "onClose", () => {
      if (this.editMessage) {
        const message2 = this.editMessage;
        this.editMessage = null;
        this.text.setValue("");
        this.btnClose.addClass(classes$7.hide);
        this.closeCallback(message2);
      }
    });
    this.submitCallback = submitCallback;
    this.editCallback = editCallback;
    this.closeCallback = closeCallback;
    this.text = new BaseComponent({ tag: "input", className: classes$7.input });
    this.button = new BaseComponent({ tag: "button", className: classes$7.button });
    this.btnClose = new BaseComponent({ tag: "button", className: `${classes$7.btnClose} ${classes$7.hide}` });
    this.appendChild([this.text, this.button, this.btnClose]);
    this.addListener("submit", this.onSubmit);
    this.button.addListener("submit", this.onSubmit);
    this.btnClose.addListener("click", this.onClose);
  }
  setEditMessage(message2) {
    this.editMessage = message2;
    this.btnClose.removeClass(classes$7.hide);
    this.text.setValue(message2.text);
  }
  deleteMessageHandler(message2) {
    if (message2 && this.editMessage === message2) {
      this.onClose();
    }
  }
}
class Chat extends BaseComponent {
  constructor(user2, controller2) {
    super({ tag: "div", className: classes$c.chat });
    __publicField(this, "user");
    __publicField(this, "head");
    __publicField(this, "dialog");
    __publicField(this, "form");
    __publicField(this, "controller");
    __publicField(this, "submitHandler", (message2) => {
      this.controller.ctrMessage.readAll(this.user);
      this.controller.ctrMessage.sendMessage(this.user, message2);
    });
    __publicField(this, "onDialogClick", () => {
      this.controller.ctrMessage.readAll(this.user);
    });
    __publicField(this, "onDialogScroll", () => {
      if (!this.dialog.getIsAutoScroll()) {
        this.controller.ctrMessage.readAll(this.user);
      }
    });
    __publicField(this, "deleteMessageHandler", (message2) => {
      this.form.deleteMessageHandler(message2);
      this.controller.ctrMessage.deleteMessage(message2);
    });
    __publicField(this, "editMessageHandler", (message2) => {
      this.dialog.deleteEditStatus();
      this.dialog.setEditStatus(message2, true);
      this.form.setEditMessage(message2);
    });
    __publicField(this, "editSubmitHandler", (text2, message2) => {
      this.dialog.setEditStatus(message2, false);
      this.controller.ctrMessage.editMessage(message2.id, text2);
    });
    __publicField(this, "editCloseHandler", (message2) => {
      this.dialog.setEditStatus(message2, false);
    });
    this.user = user2;
    this.controller = controller2;
    this.head = new ChatHead(this.user);
    this.dialog = new Dialog(this.deleteMessageHandler, this.editMessageHandler);
    this.form = new MessageForm(this.submitHandler, this.editSubmitHandler, this.editCloseHandler);
    this.appendChild([this.head, this.dialog, this.form]);
    this.dialog.addListener("click", this.onDialogClick);
    this.dialog.addListener("scroll", this.onDialogScroll);
  }
  getUser() {
    return this.user;
  }
  updateStatus(status) {
    this.head.updateStatus(status);
  }
  addMessage(message2) {
    this.dialog.addMessage(message2, message2.from !== this.user.login, this.user);
  }
  insertSeparator() {
    this.dialog.insertSeparator();
  }
  deleteSeparator() {
    this.dialog.deleteSeparator();
  }
  updateMessage(message2) {
    this.dialog.updateMessage(message2);
  }
  scrollMessage(visual = true) {
    if (visual) {
      this.dialog.scrollMessage();
    } else {
      this.dialog.showLastMessage();
    }
  }
  deleteMessage(message2) {
    this.dialog.deleteMessage(message2);
  }
}
const wrap = "_wrap_sm05g_19";
const search = "_search_sm05g_23";
const classes$6 = {
  "users-list": "_users-list_sm05g_1",
  wrap,
  search
};
class UserListComponent extends BaseComponent {
  constructor(userClickCallback) {
    super({ tag: "ul", className: classes$6["users-list"] });
    __publicField(this, "users", []);
    __publicField(this, "search");
    __publicField(this, "userClickCallback");
    __publicField(this, "onUserClick", (event) => {
      const { target } = event;
      if (target instanceof HTMLElement) {
        const userElement = target.closest(`li`);
        if (userElement) {
          this.users.forEach((el) => el.setActive(false));
          const currentUser = this.users.find((item) => item.getElement() === userElement);
          currentUser == null ? void 0 : currentUser.setActive(true);
          const user2 = currentUser == null ? void 0 : currentUser.getUser();
          if (user2) {
            this.userClickCallback(user2);
          }
        }
      }
    });
    __publicField(this, "onSearch", (event) => {
      event.preventDefault();
      const value = this.search.getValue();
      this.users.forEach((user2) => {
        const name = user2.getUser().login;
        if (name && name.toLowerCase().includes(value.toLowerCase())) {
          user2.show();
        } else {
          user2.hide();
        }
      });
    });
    this.userClickCallback = userClickCallback;
    this.search = new Input({ id: Fields.search, type: "text", placeholder: TXT.find, className: classes$6.search, validation: void 0 });
    this.search.addListener("input", this.onSearch);
    this.append(this.search);
    this.addListener("click", this.onUserClick);
  }
  clearUsers() {
    this.users.forEach((user2) => user2.destroy());
    this.users = [];
    this.clearChild();
  }
  updateUsers(users) {
    const currentUsers = [...this.users];
    users.forEach((newUser) => {
      const currentItem = currentUsers.find((item) => item.getUser().login === newUser.login);
      if (currentItem && currentItem.getStatus() !== newUser.isLogined) {
        currentItem.setOnline(newUser.isLogined);
      }
      if (!currentItem) {
        const newUserItem = new UserComponent(newUser);
        this.users.push(newUserItem);
        this.append(newUserItem);
      }
    });
    currentUsers.forEach((currentItem) => {
      if (!users.find((user2) => user2.login === currentItem.getUser().login)) {
        this.users = this.users.filter((item) => item !== currentItem);
        currentItem.destroy();
      }
    });
    this.users.sort((a2, b) => {
      const userA = a2.getUser();
      const userB = b.getUser();
      let result = 0;
      if (userA.isLogined && !userB.isLogined) {
        result = -1;
      } else if (!userA.isLogined && userB.isLogined) {
        result = 1;
      } else if (userA.isLogined && userB.isLogined) {
        result = userA.login.localeCompare(userB.login);
      } else {
        result = 0;
      }
      return result;
    });
    this.clearChild();
    this.appendChild(this.users);
  }
  setMessageCount(user2, count) {
    const currentUser = this.users.find((item) => item.getUser().login === user2.login);
    if (currentUser) {
      currentUser.setMessageCount(count);
    }
  }
}
const container = "_container_1d635_1";
const aside = "_aside_1d635_8";
const article = "_article_1d635_13";
const emptyChat = "_emptyChat_1d635_18";
const classes$5 = {
  container,
  aside,
  article,
  emptyChat
};
class ChatPage extends BaseComponent {
  constructor(store2) {
    super({ tag: "section", className: classes$5.container });
    __publicField(this, "userList");
    __publicField(this, "chats", []);
    __publicField(this, "chatContainer");
    __publicField(this, "emptyChat");
    __publicField(this, "store");
    __publicField(this, "controller", null);
    __publicField(this, "onUserClick", (user2) => {
      this.chatContainer.clear();
      const userChat = this.getUserChat(user2);
      if (userChat) {
        this.chatContainer.append(userChat);
        userChat.scrollMessage(false);
      }
    });
    this.store = store2;
    const userListWarp = aside$1({ className: classes$5.aside });
    this.userList = new UserListComponent(this.onUserClick);
    userListWarp.append(this.userList);
    this.append(userListWarp);
    this.chatContainer = article$1({ className: classes$5.article });
    this.emptyChat = p(classes$5.emptyChat, TXT.messageEmptyUser);
    this.chatContainer.append(this.emptyChat);
    this.append(this.chatContainer);
  }
  setController(controller2) {
    let result = false;
    if (controller2) {
      this.controller = controller2;
      result = true;
    }
    return result;
  }
  updateUsers(users) {
    this.userList.updateUsers(users);
    users.forEach((user2) => {
      const chat2 = this.chats.find((el) => el.getUser().login === user2.login);
      if (chat2) {
        chat2.updateStatus(user2.isLogined);
      }
    });
  }
  addMessageToDialog(message2) {
    if (message2 && message2.from) {
      const user2 = this.store.getUserFromMessage(message2);
      if (user2) {
        const chat2 = this.getUserChat(user2);
        if (chat2) {
          this.userList.setMessageCount(user2, this.store.needReadMessage(user2));
          if (!message2.status.isReaded && !this.store.isMyMessage(message2)) {
            chat2.insertSeparator();
          }
          chat2.addMessage(message2);
        }
      }
    }
  }
  afterLogout() {
    this.chats.forEach((chat2) => chat2.destroy());
    this.userList.clearUsers();
    this.chats = [];
    this.chatContainer.clear();
    this.chatContainer.append(this.emptyChat);
  }
  updateMessage(message2) {
    if (message2 && message2.id) {
      const chat2 = this.chats.find((el) => el.getUser().login === message2.from || el.getUser().login === message2.to);
      if (chat2) {
        chat2.updateMessage(message2);
        const user2 = this.store.getUserFromMessage(message2);
        if (user2) {
          const needRead = this.store.needReadMessage(user2);
          this.userList.setMessageCount(user2, needRead);
          if (!needRead) {
            chat2.deleteSeparator();
          }
        }
      }
    }
  }
  deleteMessage(message2) {
    const user2 = this.store.getUserFromMessage(message2);
    if (user2) {
      const needRead = this.store.needReadMessage(user2);
      this.userList.setMessageCount(user2, needRead);
      const chat2 = this.getUserChat(user2);
      if (chat2) {
        chat2.deleteMessage(message2);
        if (!needRead) {
          chat2.deleteSeparator();
        }
      }
    }
  }
  getUserChat(user2) {
    let userChat = this.chats.find((chat2) => chat2.getUser().login === user2.login);
    if (!userChat && this.controller) {
      userChat = new Chat(user2, this.controller);
      const messages = this.store.getUserMessages(user2);
      messages.forEach((message2) => {
        if (userChat) {
          if (!message2.status.isReaded && !this.store.isMyMessage(message2)) {
            userChat.insertSeparator();
          }
          userChat.addMessage(message2);
        }
      });
      this.userList.setMessageCount(user2, this.store.needReadMessage(user2));
      this.chats.push(userChat);
    }
    return userChat;
  }
}
const pageWrapper = "_pageWrapper_uz3ty_1";
const welcomePage = "_welcomePage_uz3ty_5";
const wrapper = "_wrapper_uz3ty_12";
const tittle = "_tittle_uz3ty_21";
const description = "_description_uz3ty_30";
const start = "_start_uz3ty_39";
const classes$4 = {
  pageWrapper,
  welcomePage,
  wrapper,
  tittle,
  description,
  start
};
class Info extends BaseComponent {
  constructor() {
    super({ tag: "div", className: classes$4.pageWrapper });
    const modal2 = div(
      { className: classes$4.welcomePage },
      div(
        { className: classes$4.wrapper },
        h1(classes$4.tittle, TXT.infoTittle),
        p(classes$4.description, TXT.infoDescription)
      )
    );
    this.appendChild([modal2]);
  }
}
const alert = "_alert_uf7mk_24";
const show = "_show_uf7mk_36";
const slideIn = "_slideIn_uf7mk_1";
const close = "_close_uf7mk_42";
const fadeOut = "_fadeOut_uf7mk_1";
const message = "_message_uf7mk_62";
const classes$3 = {
  alert,
  show,
  slideIn,
  close,
  fadeOut,
  "btn-close": "_btn-close_uf7mk_46",
  message
};
const TIME_SHOW = 3e3;
class AlertComponent extends BaseComponent {
  constructor(alertStack2, message2) {
    super({ tag: "div", className: classes$3.alert });
    __publicField(this, "closeBtn");
    __publicField(this, "alertStack");
    __publicField(this, "timeout", null);
    __publicField(this, "onHide", () => {
      this.addClass(classes$3.close);
      this.timeout = setTimeout(this.onClose, 1e3);
    });
    __publicField(this, "onClose", () => {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.destroy();
    });
    this.alertStack = alertStack2;
    const text2 = p(classes$3.message, message2);
    this.closeBtn = Button({ textContent: "", className: classes$3["btn-close"] });
    this.closeBtn.addListener("click", this.onClose);
    this.appendChild([text2, this.closeBtn]);
  }
  show() {
    this.addClass(classes$3.show);
    this.alertStack.append(this);
    this.timeout = setTimeout(this.onHide, TIME_SHOW);
  }
}
const bg = "_bg_17zqq_1";
const modal = "_modal_17zqq_13";
const msg = "_msg_17zqq_28";
const hide = "_hide_17zqq_35";
const classes$2 = {
  bg,
  modal,
  msg,
  hide
};
class Spinner extends BaseComponent {
  constructor() {
    super({ tag: "div", className: `${classes$2.bg} ${classes$2.hide}` });
    __publicField(this, "text");
    const modal2 = div({ className: classes$2.modal });
    this.text = p(classes$2.msg, "");
    const spinner = img$5({ src: SRC.spinner, alt: SRC.spinnerAlt, className: classes$2.spinner, width: 40, height: 40 });
    modal2.appendChild([spinner, this.text]);
    this.append(modal2);
    document.body.appendChild(this.getElement());
  }
  show() {
    this.removeClass(classes$2.hide);
  }
  hide() {
    this.addClass(classes$2.hide);
  }
  setMessage(text2) {
    this.text.setText(text2);
  }
}
function isSuccessAnswer(entity) {
  return Boolean(
    typeof entity === "object" && entity && "type" in entity && typeof entity.type === "string" && entity.type !== AppError.ERROR.toString() && "id" in entity
  );
}
function isErrorAnswer(entity) {
  return Boolean(
    typeof entity === "object" && entity && "type" in entity && typeof entity.type === "string" && entity.type === AppError.ERROR.toString() && "id" in entity
  );
}
const TIME_UPDATE = 2e3;
class Connection {
  constructor(alertStack2, response) {
    __publicField(this, "END_POINT", `ws://localhost:4000`);
    __publicField(this, "alertStack");
    __publicField(this, "response");
    __publicField(this, "connectionWS");
    __publicField(this, "spinner");
    __publicField(this, "reConnectCallback", null);
    __publicField(this, "closeConnectCallback", null);
    __publicField(this, "isConnectionLost", false);
    __publicField(this, "onOpen", () => {
      this.spinner.hide();
      this.setListeners();
      if (this.isConnectionLost && this.reConnectCallback) {
        this.isConnectionLost = false;
        this.reConnectCallback();
      }
    });
    __publicField(this, "onError", (event) => {
      if (event instanceof ErrorEvent && event.error && typeof event.error === "string") {
        const alert2 = new AlertComponent(this.alertStack, event.error);
        alert2.show();
        this.getNewConnection();
      }
    });
    __publicField(this, "onMessage", (message2) => {
      if (typeof message2.data === "string") {
        const response = JSON.parse(message2.data);
        if (isSuccessAnswer(response)) {
          this.response.read(response);
        } else if (isErrorAnswer(response)) {
          const { error: error2 } = response.payload;
          const alert2 = new AlertComponent(this.alertStack, error2);
          alert2.show();
        }
      }
    });
    __publicField(this, "onClose", () => {
      this.spinner.setMessage(TXT.messageServerDisconnect);
      this.spinner.show();
      this.isConnectionLost = true;
      if (this.closeConnectCallback) {
        this.closeConnectCallback();
      }
      this.tryReconnect();
    });
    this.alertStack = alertStack2;
    this.response = response;
    this.connectionWS = new WebSocket(`${this.END_POINT}`);
    this.spinner = new Spinner();
    this.getNewConnection();
  }
  sendMessage(message2) {
    if (this.connectionWS && this.connectionWS.readyState === WebSocket.OPEN) {
      this.connectionWS.send(JSON.stringify(message2));
    } else {
      this.onClose();
    }
  }
  setReConnectCallback(callback) {
    this.reConnectCallback = callback;
  }
  setCloseConnectCallback(callback) {
    this.closeConnectCallback = callback;
  }
  getNewConnection() {
    this.connectionWS.addEventListener("open", this.onOpen);
    this.connectionWS.addEventListener("error", this.onError);
  }
  setListeners() {
    this.connectionWS.addEventListener("message", this.onMessage);
    this.connectionWS.addEventListener("close", this.onClose);
  }
  tryReconnect() {
    const interval = setInterval(() => {
      if (this.connectionWS.readyState === WebSocket.CLOSED) {
        this.connectionWS = new WebSocket(`${this.END_POINT}`);
        this.getNewConnection();
      } else {
        clearInterval(interval);
      }
    }, TIME_UPDATE);
  }
}
class ControllerAuth {
  constructor(store2, pageAuth2, pageChat2, header2, request) {
    __publicField(this, "store");
    __publicField(this, "pageAuth");
    __publicField(this, "pageChat");
    __publicField(this, "request");
    __publicField(this, "header");
    __publicField(this, "reLogin", () => {
      let result = false;
      const user2 = this.store.getAuthInfo();
      if (user2) {
        this.request.sendLogin(user2);
        result = true;
      }
      return result;
    });
    __publicField(this, "closeConnection", () => {
      this.store.lostConnection();
      this.pageChat.afterLogout();
    });
    this.store = store2;
    this.pageAuth = pageAuth2;
    this.pageChat = pageChat2;
    this.header = header2;
    this.request = request;
  }
  login(user2) {
    let result = false;
    if (user2) {
      this.store.setAuthInfo(user2);
      this.request.sendLogin(user2);
      result = true;
    }
    return result;
  }
  responseLogin(user2) {
    let result = false;
    if (user2.isLogined) {
      this.store.login(user2);
      result = true;
    }
    return result;
  }
  afterLogin(user2) {
    navigateAfterLogin();
    this.header.changeAuth(true, user2);
    this.request.sendGetActiveUsers();
    this.request.sendGetInactiveUsers();
    return true;
  }
  startLogout() {
    let result = false;
    const authInfo = this.store.getAuthInfo();
    const isAuth = this.store.isAuth();
    if (isAuth && authInfo) {
      this.request.sendLogout(authInfo);
      result = true;
    }
    return result;
  }
  responseLogout(user2) {
    let result = false;
    if (!user2.isLogined) {
      this.store.logout(user2);
      result = true;
    }
    return result;
  }
  afterLogout() {
    navigateTo(Navigation.auth);
    this.pageAuth.resetForm();
    this.header.changeAuth(false);
    this.pageChat.afterLogout();
    return true;
  }
}
class ControllerUser {
  constructor(store2, pageChat2) {
    __publicField(this, "store");
    __publicField(this, "pageChat");
    this.store = store2;
    this.pageChat = pageChat2;
  }
  responseUserLogin(user2) {
    let result = false;
    if (user2.isLogined) {
      this.store.userLogin(user2);
      this.pageChat.updateUsers(this.store.getUsersList());
      result = true;
    }
    return result;
  }
  responseUserLogout(user2) {
    let result = false;
    if (!user2.isLogined) {
      this.store.userLogout(user2);
      this.pageChat.updateUsers(this.store.getUsersList());
      result = true;
    }
    return result;
  }
  responseActiveUsers(users) {
    let result = false;
    if (users) {
      this.store.setActiveUsers(users);
      this.pageChat.updateUsers(this.store.getUsersList());
      result = true;
    }
    return result;
  }
  responseInactiveUsers(users) {
    let result = false;
    if (users) {
      this.store.setInactiveUsers(users);
      this.pageChat.updateUsers(this.store.getUsersList());
      result = true;
    }
    return result;
  }
}
function getNewId() {
  return "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx".replace(/[xy]/g, setSymbol);
}
function setSymbol() {
  return Math.floor(Math.random() * 16).toString(16);
}
function rqLogin(user2) {
  return {
    id: getNewId(),
    type: UserActions.LOGIN,
    payload: {
      user: user2
    }
  };
}
function rqLogout(user2) {
  return {
    id: getNewId(),
    type: UserActions.LOGOUT,
    payload: {
      user: user2
    }
  };
}
function rqUserActive() {
  return {
    id: getNewId(),
    type: UserActions.USER_ACTIVE,
    payload: null
  };
}
function rqUserInactive() {
  return {
    id: getNewId(),
    type: UserActions.USER_INACTIVE,
    payload: null
  };
}
function rqMsgSend(user2, text2) {
  return {
    id: getNewId(),
    type: MessageActions.MSG_SEND,
    payload: {
      message: {
        to: user2,
        text: text2
      }
    }
  };
}
function rqMsgFromUser(login2) {
  return {
    id: getNewId(),
    type: MessageActions.MSG_FROM_USER,
    payload: {
      user: {
        login: login2
      }
    }
  };
}
function rqMsgRead(id) {
  return {
    id: getNewId(),
    type: MessageActions.MSG_READ,
    payload: {
      message: {
        id
      }
    }
  };
}
function rqMsgDelete(id) {
  return {
    id: getNewId(),
    type: MessageActions.MSG_DELETE,
    payload: {
      message: {
        id
      }
    }
  };
}
function rqMsgEdit(id, text2) {
  return {
    id: getNewId(),
    type: MessageActions.MSG_EDIT,
    payload: {
      message: {
        id,
        text: text2
      }
    }
  };
}
class ServerRequest {
  constructor(connection) {
    __publicField(this, "connection");
    this.connection = connection;
  }
  sendLogin(user2) {
    this.sendRequest(rqLogin(user2));
  }
  sendLogout(user2) {
    this.sendRequest(rqLogout(user2));
  }
  sendGetActiveUsers() {
    this.sendRequest(rqUserActive());
  }
  sendGetInactiveUsers() {
    this.sendRequest(rqUserInactive());
  }
  sendMessage(user2, text2) {
    this.sendRequest(rqMsgSend(user2, text2));
  }
  sendGetMessages(user2) {
    this.sendRequest(rqMsgFromUser(user2));
  }
  sendRead(id) {
    this.sendRequest(rqMsgRead(id));
  }
  sendDelete(id) {
    this.sendRequest(rqMsgDelete(id));
  }
  sendEdit(id, text2) {
    this.sendRequest(rqMsgEdit(id, text2));
  }
  sendRequest(request) {
    this.connection.sendMessage(request);
  }
}
const type$b = UserActions.LOGIN;
function loginHdl(response, controller2) {
  if (response.type !== type$b) {
    return;
  }
  const { user: user2 } = response.payload;
  if (user2) {
    controller2.ctrAuth.responseLogin(user2);
  }
}
const type$a = UserActions.LOGOUT;
function logoutHdl(response, controller2) {
  if (response.type !== type$a) {
    return;
  }
  const { user: user2 } = response.payload;
  if (user2) {
    controller2.ctrAuth.responseLogout(user2);
  }
}
const type$9 = UserActions.USER_ACTIVE;
function userActiveHdl(response, controller2) {
  if (response.type !== type$9) {
    return;
  }
  const { users } = response.payload;
  if (users) {
    controller2.ctrUser.responseActiveUsers(users);
  }
}
const type$8 = UserActions.USER_INACTIVE;
function userInactiveHdl(response, controller2) {
  if (response.type !== type$8) {
    return;
  }
  const { users } = response.payload;
  if (users) {
    controller2.ctrUser.responseInactiveUsers(users);
  }
}
const type$7 = UserActions.USER_EXTERNAL_LOGIN;
function userLoginHdl(response, controller2) {
  if (response.type !== type$7) {
    return;
  }
  const { user: user2 } = response.payload;
  if (user2) {
    controller2.ctrUser.responseUserLogin(user2);
  }
}
const type$6 = UserActions.USER_EXTERNAL_LOGOUT;
function userLogoutHdl(response, controller2) {
  if (response.type !== type$6) {
    return;
  }
  const { user: user2 } = response.payload;
  if (user2) {
    controller2.ctrUser.responseUserLogout(user2);
  }
}
const type$5 = MessageActions.MSG_SEND;
function sendMegHdl(response, controller2) {
  if (response.type !== type$5) {
    return;
  }
  const { message: message2 } = response.payload;
  if (message2) {
    controller2.ctrMessage.responseSendMessage(message2);
  }
}
const type$4 = MessageActions.MSG_FROM_USER;
function formUserHdl(response, controller2) {
  if (response.type !== type$4) {
    return;
  }
  const { messages } = response.payload;
  if (messages) {
    controller2.ctrMessage.responseUserMessages(messages);
  }
}
const type$3 = MessageActions.MSG_DELIVER;
function deliverHdl(response, controller2) {
  if (response.type !== type$3) {
    return;
  }
  const { message: message2 } = response.payload;
  if (message2) {
    controller2.ctrMessage.responseDeliverMessage(message2);
  }
}
const type$2 = MessageActions.MSG_READ;
function readHdl(response, controller2) {
  if (response.type !== type$2) {
    return;
  }
  const { message: message2 } = response.payload;
  if (message2) {
    controller2.ctrMessage.responseReadMessage(message2);
  }
}
const type$1 = MessageActions.MSG_DELETE;
function deleteHdl(response, controller2) {
  if (response.type !== type$1) {
    return;
  }
  const { message: message2 } = response.payload;
  if (message2) {
    controller2.ctrMessage.responseDelete(message2);
  }
}
const type = MessageActions.MSG_EDIT;
function editHdl(response, controller2) {
  if (response.type !== type) {
    return;
  }
  const { message: message2 } = response.payload;
  if (message2) {
    controller2.ctrMessage.responseEditMessage(message2);
  }
}
class ServerResponse {
  constructor(controller2) {
    __publicField(this, "controller");
    this.controller = controller2;
  }
  read(response) {
    loginHdl(response, this.controller);
    logoutHdl(response, this.controller);
    userActiveHdl(response, this.controller);
    userInactiveHdl(response, this.controller);
    userLoginHdl(response, this.controller);
    userLogoutHdl(response, this.controller);
    sendMegHdl(response, this.controller);
    formUserHdl(response, this.controller);
    deliverHdl(response, this.controller);
    readHdl(response, this.controller);
    deleteHdl(response, this.controller);
    editHdl(response, this.controller);
  }
}
class ControllerMessage {
  constructor(store2, pageChat2, request) {
    __publicField(this, "store");
    __publicField(this, "pageChat");
    __publicField(this, "request");
    this.store = store2;
    this.pageChat = pageChat2;
    this.request = request;
  }
  sendMessage(user2, message2) {
    let result = false;
    if (message2 && user2) {
      this.request.sendMessage(user2.login, message2);
      result = true;
    }
    return result;
  }
  responseSendMessage(message2) {
    let result = false;
    if (message2) {
      this.store.setNewMessage(message2);
      this.pageChat.addMessageToDialog(message2);
      result = true;
    }
    return result;
  }
  getUserMessages(users) {
    let result = false;
    if (users) {
      users.forEach((user2) => {
        this.request.sendGetMessages(user2.login);
      });
      result = true;
    }
    return result;
  }
  responseUserMessages(messages) {
    let result = false;
    if (messages) {
      messages.forEach((message2) => {
        this.store.setNewMessage(message2);
        this.pageChat.addMessageToDialog(message2);
      });
      result = true;
    }
    return result;
  }
  responseDeliverMessage(message2) {
    let result = false;
    if (message2) {
      const messageEl = this.store.setDeliverStatus(message2.id);
      if (messageEl) {
        this.pageChat.updateMessage(messageEl);
        result = true;
      }
    }
    return result;
  }
  responseReadMessage(message2) {
    let result = false;
    if (message2) {
      const messageEl = this.store.setReadStatus(message2.id);
      if (messageEl) {
        this.pageChat.updateMessage(messageEl);
        result = true;
      }
    }
    return result;
  }
  readAll(user2) {
    let result = false;
    if (user2) {
      const messages = this.store.getMessagesToUser(user2);
      messages.forEach((message2) => {
        if (!message2.status.isReaded) {
          this.request.sendRead(message2.id);
        }
      });
      result = true;
    }
    return result;
  }
  deleteMessage(message2) {
    let result = false;
    if (message2) {
      this.request.sendDelete(message2.id);
      result = true;
    }
    return result;
  }
  responseDelete(message2) {
    let result = false;
    if (message2) {
      const messageEl = this.store.deleteMessage(message2.id);
      if (messageEl) {
        this.pageChat.deleteMessage(messageEl);
        result = true;
      }
    }
    return result;
  }
  editMessage(id, message2) {
    let result = false;
    if (id && message2) {
      this.request.sendEdit(id, message2);
      result = true;
    }
    return result;
  }
  responseEditMessage(message2) {
    let result = false;
    if (message2) {
      const messageEl = this.store.setEdit(message2);
      if (messageEl) {
        this.pageChat.updateMessage(messageEl);
        result = true;
      }
    }
    return result;
  }
}
class Controller {
  constructor(store2, pageAuth2, pageChat2, alertStack2, header2) {
    __publicField(this, "store");
    __publicField(this, "pageAuth");
    __publicField(this, "pageChat");
    __publicField(this, "connection");
    __publicField(this, "request");
    __publicField(this, "alertStack");
    __publicField(this, "header");
    __publicField(this, "serverResponse");
    __publicField(this, "ctrAuth");
    __publicField(this, "ctrUser");
    __publicField(this, "ctrMessage");
    this.store = store2;
    this.pageAuth = pageAuth2;
    this.pageChat = pageChat2;
    this.alertStack = alertStack2;
    this.header = header2;
    this.serverResponse = new ServerResponse(this);
    this.connection = new Connection(this.alertStack, this.serverResponse);
    this.request = new ServerRequest(this.connection);
    this.ctrAuth = new ControllerAuth(this.store, this.pageAuth, this.pageChat, this.header, this.request);
    this.ctrUser = new ControllerUser(this.store, this.pageChat);
    this.ctrMessage = new ControllerMessage(this.store, this.pageChat, this.request);
    this.connection.setReConnectCallback(this.ctrAuth.reLogin);
    this.connection.setCloseConnectCallback(this.ctrAuth.closeConnection);
  }
}
const version = "1.0.0";
const app$1 = "fun-chat";
const author = "yulikk";
const storageKey = `${author}-${version}-${app$1}`;
const loginKey = "login";
const passwordKey = "password";
class Store {
  constructor() {
    __publicField(this, "controller", null);
    __publicField(this, "user", {
      login: "",
      isLogined: false
    });
    __publicField(this, "authInfo", {
      login: null,
      password: null
    });
    __publicField(this, "usersList", []);
    __publicField(this, "message", []);
    const login2 = sessionStorage.getItem(`${storageKey}-${loginKey}`);
    const password = sessionStorage.getItem(`${storageKey}-${passwordKey}`);
    if (login2 && password) {
      this.authInfo.login = login2;
      this.authInfo.password = password;
    }
  }
  setController(controller2) {
    var _a;
    this.controller = controller2;
    if (this.isAuth()) {
      (_a = this.controller) == null ? void 0 : _a.ctrAuth.reLogin();
    }
    return this.controller;
  }
  setAuthInfo(auth) {
    if (auth.login && auth.password) {
      this.authInfo = auth;
      sessionStorage.setItem(`${storageKey}-${loginKey}`, auth.login);
      sessionStorage.setItem(`${storageKey}-${passwordKey}`, auth.password);
    }
    return this.authInfo;
  }
  getAuthInfo() {
    return this.authInfo;
  }
  isAuth() {
    return this.authInfo.login !== null && this.authInfo.password !== null;
  }
  login(user2) {
    if (user2.login && user2.isLogined) {
      Object.assign(this.user, user2);
      if (this.controller) {
        this.controller.ctrAuth.afterLogin(this.user);
      }
    }
    return this.user;
  }
  logout(user2) {
    if (user2.login === this.user.login) {
      this.user.isLogined = false;
      this.user.login = "";
      this.authInfo.login = null;
      this.authInfo.password = null;
      sessionStorage.removeItem(`${storageKey}-${loginKey}`);
      sessionStorage.removeItem(`${storageKey}-${passwordKey}`);
      this.usersList = [];
      this.message = [];
      if (this.controller) {
        this.controller.ctrAuth.afterLogout();
      }
    }
    return this.user;
  }
  lostConnection() {
    this.message = [];
    this.usersList = [];
  }
  userLogin(user2) {
    const userEl = this.usersList.find((el) => el.login === user2.login);
    if (userEl) {
      userEl.isLogined = true;
    } else {
      this.usersList.push(user2);
    }
    this.usersSort();
    return userEl;
  }
  userLogout(user2) {
    const userEl = this.usersList.find((el) => el.login === user2.login);
    if (userEl) {
      userEl.isLogined = false;
    }
    this.usersSort();
    return userEl;
  }
  getUser() {
    let user2 = null;
    if (this.user.isLogined) {
      user2 = this.user;
    }
    return user2;
  }
  usersSort() {
    this.usersList.sort((a2, b) => Number(b.isLogined) - Number(a2.isLogined));
  }
  updateUsersList(users, filterCondition) {
    this.usersList = this.usersList.filter(filterCondition);
    this.usersList.push(...users);
    this.usersSort();
    if (this.controller) {
      this.controller.ctrMessage.getUserMessages(users);
    }
    return this.usersList;
  }
  setActiveUsers(users) {
    const otherUsers = users.filter((user2) => user2.login !== this.user.login);
    return this.updateUsersList(otherUsers, (user2) => !user2.isLogined);
  }
  setInactiveUsers(users) {
    return this.updateUsersList(users, (user2) => user2.isLogined);
  }
  getUsersList() {
    return this.usersList;
  }
  setNewMessage(message2) {
    this.message.push(message2);
    return message2;
  }
  getUserMessages(user2) {
    return this.message.filter(
      (message2) => message2.from === user2.login || message2.to === user2.login
    );
  }
  setDeliverStatus(id) {
    const message2 = this.message.find((el) => el.id === id);
    if (message2) {
      message2.status.isDelivered = true;
    }
    return message2;
  }
  setReadStatus(id) {
    const message2 = this.message.find((el) => el.id === id);
    if (message2) {
      message2.status.isReaded = true;
    }
    return message2;
  }
  updateMessage(message2) {
    const messageEl = this.message.find((el) => el.id === message2.id);
    if (messageEl) {
      Object.assign(messageEl, message2);
    }
    return messageEl;
  }
  getUserFromMessage(message2) {
    const msgTo = this.getUserFromList(message2.to);
    const msgFrom = this.getUserFromList(message2.from);
    return msgTo || msgFrom;
  }
  getMessagesToUser(user2) {
    return this.message.filter((message2) => message2.to === this.user.login && message2.from === user2.login);
  }
  isMyMessage(message2) {
    return message2.from === this.user.login;
  }
  needReadMessage(user2) {
    return this.message.filter(
      (message2) => message2.from === user2.login && !message2.status.isReaded
    ).length;
  }
  deleteMessage(id) {
    const message2 = this.message.find((el) => el.id === id);
    if (message2) {
      this.message = this.message.filter((el) => el.id !== id);
    }
    return message2;
  }
  getUserFromList(user2) {
    return this.usersList.find((el) => el.login === user2);
  }
  setEdit(message2) {
    const messageEl = this.message.find((el) => el.id === message2.id);
    if (messageEl) {
      messageEl.text = message2.text;
      messageEl.status.isEdited = message2.status.isEdited;
    }
    return messageEl;
  }
}
const footer$1 = "_footer_1i8il_1";
const link = "_link_1i8il_10";
const linkText = "_linkText_1i8il_17";
const logoGit = "_logoGit_1i8il_27";
const logoRs = "_logoRs_1i8il_33";
const classes$1 = {
  footer: footer$1,
  link,
  linkText,
  logoGit,
  logoRs
};
class Footer extends BaseComponent {
  constructor() {
    super({ tag: "footer", className: classes$1.footer });
    this.appendChild([
      a(
        { className: classes$1.link, href: SRC.gitHref, target: "_blank" },
        img$5({ src: SRC.git, alt: SRC.gitAlt, className: classes$1.logoGit, width: 24, height: 24 })
      ),
      a(
        { className: classes$1.link, href: SRC.rsHref, target: "_blank" },
        img$5({ src: SRC.rs, alt: SRC.rsAlt, className: classes$1.logoRs, width: 24, height: 24 })
      ),
      p(classes$1.linkText, TXT.year)
    ]);
  }
}
const app = "_app_1l8o3_1";
const classes = {
  app
};
const { body } = document;
const store = new Store();
const header = new Header();
const page404 = new Page404();
const pageInfo = new Info();
const alertStack = new AlertStack();
const pageAuth = new AuthPage();
const pageChat = new ChatPage(store);
const footer = new Footer();
const controller = new Controller(store, pageAuth, pageChat, alertStack, header);
pageAuth.setController(controller);
store.setController(controller);
header.setController(controller);
pageChat.setController(controller);
const pageContainer = div({ className: classes.app });
body.appendChild(header.getElement());
body.appendChild(pageContainer.getElement());
body.appendChild(alertStack.getElement());
body.appendChild(footer.getElement());
function renderPage(page) {
  switch (page) {
    case Navigation.auth:
      render(Navigation.auth, pageAuth);
      break;
    case Navigation.info:
      render(Navigation.info, pageInfo);
      break;
    case Navigation.chat:
      render(Navigation.chat, pageChat);
      break;
    default:
      render(Navigation.page404, page404);
      break;
  }
}
function render(page, pageComponent) {
  pageContainer.clear();
  header.setActivePage(page);
  pageContainer.append(pageComponent);
}
initializeRouter(renderPage, store, controller);
//# sourceMappingURL=main-DElt7Ljv.js.map
