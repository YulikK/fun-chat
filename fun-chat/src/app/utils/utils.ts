import type { serverAnswerError, serverAnswerSuccess } from "./type.ts";
import { AppError } from "./type.ts";

export function isSuccessAnswer(entity: unknown): entity is serverAnswerSuccess {
  return Boolean(
    typeof entity === 'object' &&
      entity &&
      'type' in entity &&
      typeof entity.type === 'string' &&
      entity.type !== AppError.ERROR.toString() &&
      'id' in entity
  );
}

export function isErrorAnswer(entity: unknown): entity is serverAnswerError {
  return Boolean(
    typeof entity === 'object' &&
      entity &&
      'type' in entity &&
      typeof entity.type === 'string' &&
      entity.type === AppError.ERROR.toString() &&
      'id' in entity
  );
}