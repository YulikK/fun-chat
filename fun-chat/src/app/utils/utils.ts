import type { serverAnswerError, serverAnswerSuccess } from "./type.ts";
import { AppError } from "./type.ts";

export function getDateFormat(datetime: number): string {

  const date = new Date(datetime);

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
}

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