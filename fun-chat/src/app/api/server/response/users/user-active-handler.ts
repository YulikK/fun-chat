import type Controller from "@/app/controller/controller.ts";
import type { serverAnswerSuccess } from "@/app/utils/type.ts";
import  { UserActions } from "@/app/utils/type.ts";

const type = UserActions.USER_ACTIVE;

export default function userActiveHdl(response: serverAnswerSuccess, controller: Controller): void {

  if (response.type !== type) {
    return;
  }

  const { users } = response.payload;
  if (users) {
    controller.responseActiveUsers(users);
  }
}
