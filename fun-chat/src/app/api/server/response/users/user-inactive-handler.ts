import type Controller from "@/app/controller/controller.ts";
import type { serverAnswerSuccess } from "@/app/utils/type.ts";
import  { UserActions } from "@/app/utils/type.ts";

const type = UserActions.USER_INACTIVE;

export default function userInactiveHdl(response: serverAnswerSuccess, controller: Controller): void {

  if (response.type !== type) {
    return;
  }

  const { users } = response.payload;
  if (users) {
    controller.responseInactiveUsers(users);
  }
}
