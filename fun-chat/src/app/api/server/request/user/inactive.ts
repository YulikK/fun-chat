import getNewId from "@/app/utils/id-generator.ts";
import { UserActions } from "@/app/utils/type.ts";
import type { ServerAnswer } from "@/app/utils/type";

export default function rqUserInactive(): ServerAnswer{
  return {
    id: getNewId(),
    type: UserActions.USER_INACTIVE,
    payload: null,
  };
}