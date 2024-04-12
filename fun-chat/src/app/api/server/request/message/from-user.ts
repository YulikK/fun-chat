import getNewId from "@/app/utils/id-generator.ts";
import { MessageActions } from "@/app/utils/type.ts";
import type { ServerAnswer } from "@/app/utils/type";

export default function rqMsgFromUser(login: string): ServerAnswer{
  return {
    id: getNewId(),
    type: MessageActions.MSG_FROM_USER,
    payload: {
      user: {
        login,
      }
    },
  };
}