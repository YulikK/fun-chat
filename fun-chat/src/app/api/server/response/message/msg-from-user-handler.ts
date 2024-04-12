import type Controller from "@/app/controller/controller.ts";
import type { serverAnswerSuccess } from "@/app/utils/type.ts";
import  { MessageActions } from "@/app/utils/type.ts";

const type = MessageActions.MSG_FROM_USER;

export default function formUserHdl(response: serverAnswerSuccess, controller: Controller): void {

  if (response.type !== type) {
    return;
  }

  const { messages } = response.payload;
  if (messages) {
    controller.ctrMessage.responseUserMessages(messages);
  }
}
