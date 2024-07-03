import getNewId from "@/app/utils/id-generator.ts";
import { MessageActions } from "@/app/utils/type.ts";
import type { ServerAnswer } from "@/app/utils/type";

export default function rqMsgRead(id: string): ServerAnswer{
  return {
    id: getNewId(),
    type: MessageActions.MSG_READ,
    payload: {
      message: {
        id,
      }
    },
  };
}