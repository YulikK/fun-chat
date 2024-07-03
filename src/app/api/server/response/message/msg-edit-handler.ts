import type Controller from "@/app/controller/controller.ts";
import type { serverAnswerSuccess } from "@/app/utils/type.ts";
import  { MessageActions } from "@/app/utils/type.ts";

const type = MessageActions.MSG_EDIT;

export default function editHdl(response: serverAnswerSuccess, controller: Controller): void {

  if (response.type !== type) {
    return;
  }

  const { message } = response.payload;
  if (message) {
    controller.ctrMessage.responseEditMessage(message);
  }
}
