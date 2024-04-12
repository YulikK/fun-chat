import type { serverAnswerSuccess } from "@/app/utils/type.ts";
import type Controller from "../../controller/controller.ts";
import loginHdl from "./response/auth/login-handler.ts";
import logoutHdl from "./response/auth/logout-handler.ts";
import userActiveHdl from "./response/users/user-active-handler.ts";
import userInactiveHdl from "./response/users/user-inactive-handler.ts";
import userLoginHdl from "./response/users/user-login-handler.ts";
import userLogoutHdl from "./response/users/user-logout-handler.ts";
import sendMegHdl from "./response/message/msg-send-handler.ts";
import formUserHdl from "./response/message/msg-from-user-handler.ts";
import deliverHdl from "./response/message/msg-deliver-handler.ts";
import readHdl from "./response/message/msg-read-handler.ts";
import deleteHdl from "./response/message/msg-delete-handler.ts";

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
    sendMegHdl(response, this.controller);
    formUserHdl(response, this.controller);
    deliverHdl(response, this.controller);
    readHdl(response, this.controller);
    deleteHdl(response, this.controller);
  }
}