import getNewId from "@/app/utils/id-generator.ts";
import { UserActions } from "@/app/utils/type.ts";
import type { Auth, ServerAnswer } from "@/app/utils/type";

export default function rqLogout(user: Auth): ServerAnswer{
  return {
    id: getNewId(),
    type: UserActions.LOGOUT,
    payload: {
      user
    },
  };
}