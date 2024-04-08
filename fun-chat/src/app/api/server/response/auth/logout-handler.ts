import type Controller from "@/app/controller/controller.ts";
import type { serverAnswerSuccess } from "@/app/utils/type.ts";
import  { UserActions } from "@/app/utils/type.ts";

const type = UserActions.LOGOUT;

export default function logoutHdl(response: serverAnswerSuccess, controller: Controller): void {

  if (response.type !== type) {
    return;
  }

  const { user } = response.payload;
  if (user) {
    controller.responseLogout(user);
  }
}
