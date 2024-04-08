import type { serverAnswerSuccess } from "@/app/utils/type.ts";
import type Controller from "../../controller/controller.ts";
import loginHdl from "./response/auth/login-handler.ts";
import logoutHdl from "./response/auth/logout-handler.ts";
import userActiveHdl from "./response/users/user-active-handler.ts";
import userInactiveHdl from "./response/users/user-inactive-handler.ts";
import userLoginHdl from "./response/users/user-login-handler.ts";
import userLogoutHdl from "./response/users/user-logout-handler.ts";

export default class ServerResponse {
  private controller: Controller;

  constructor(controller: Controller) {
    this.controller = controller;
  }

  public read(response: serverAnswerSuccess): void {
    loginHdl(response, this.controller);
    logoutHdl(response, this.controller);
    userActiveHdl(response, this.controller);
    userInactiveHdl(response, this.controller);
    userLoginHdl(response, this.controller);
    userLogoutHdl(response, this.controller)
  }
}