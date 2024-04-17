import { MIN_LENGTH_PASS, MIN_LENGTH_NAME } from './constant.ts';
import TXT from './language.ts';
import { AppError, Fields, type serverAnswerError, type serverAnswerSuccess } from './type.ts';

type ValidationType = {
  isValid: boolean;
  error: string;
}

type ValidateOptions = {
  message: string;
  minLength: number;
  regexAll: RegExp;
  regexFirst: RegExp;
  isFirstCapital?: boolean;
}

function getValidationConstant(field: Fields): ValidateOptions {
  const regexAll = /^[a-zA-Z-]*$/;
  const regexFirst = /^[A-Z][a-zA-Z-]*$/;
  let message = '';
  let minLength = 0;
  let isFirstCapital = false;
  if (field === Fields.name) {
    message = TXT.name;
    minLength = MIN_LENGTH_NAME;
    isFirstCapital = true;
  } else if (field === Fields.password){
    message = TXT.password;
    minLength = MIN_LENGTH_PASS;
  }
  return { message, minLength, regexAll, regexFirst, isFirstCapital };

}

export function validateField(value: string, field: Fields): ValidationType {
  const validation: ValidationType = {
    isValid: false,
    error: '',
  }
  const { message, minLength, regexAll, regexFirst, isFirstCapital } = getValidationConstant(field);

  if (value.length < minLength) {
    validation.error = `${message} must be at least ${minLength} characters long`;
  } else if (!regexAll.test(value)) {
    validation.error = `${message} must contain only letters`;
  } else if (isFirstCapital && !regexFirst.test(value)) {
    validation.error = `${message} must start with a capital letter`;
  } else {
    validation.isValid = true;
  }
  return validation;
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
