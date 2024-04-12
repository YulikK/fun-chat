import getNewId from "@/app/utils/id-generator.ts";
import { MessageActions } from "@/app/utils/type.ts";
import type { ServerAnswer } from "@/app/utils/type";

export default function rqMsgSend(user: string, text: string): ServerAnswer{
  return {
    id: getNewId(),
    type: MessageActions.MSG_SEND,
    payload: {
      message: {
        to: user,
        text,
      }
    },
  };
}