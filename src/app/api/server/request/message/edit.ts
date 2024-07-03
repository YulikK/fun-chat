import getNewId from "@/app/utils/id-generator.ts";
import { MessageActions } from "@/app/utils/type.ts";
import type { ServerAnswer } from "@/app/utils/type";

export default function rqMsgEdit(id: string, text: string): ServerAnswer{
  return {
    id: getNewId(),
    type: MessageActions.MSG_EDIT,
    payload: {
      message: {
        id,
        text
      }
    },
  };
}