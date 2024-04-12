import getNewId from "@/app/utils/id-generator.ts";
import { UserActions } from "@/app/utils/type.ts";
import type { ServerAnswer } from "@/app/utils/type";

export default function rqUserActive(): ServerAnswer{
  return {
    id: getNewId(),
    type: UserActions.USER_ACTIVE,
    payload: null,
  };
}