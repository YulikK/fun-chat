

type Rule = (value: string) => string | null;
type RuleWithArgs<T> = (value: string, args: T) => string | null;

const message = {
  minLength: 'Value is too short',
  startsWithCapitalLetter: 'Value must start with a capital letter',
  onlyLatinLetters: 'Value must contain only Latin letters',
  hasLowerCase: 'Value must contain at least one lowercase letter',
  hasUpperCase: 'Value must contain at least one uppercase letter',
  hasNumberOrSpecialCharacter: 'Value must contain at least one number or special character',
}

export default class Validation {
  private rules: Rule[] = [];

  constructor(rules: Rule[]) {
    this.rules = rules;
  }

  public validate(value: string): string | null {
    let errorMessage: string | null = null;
    this.rules.forEach(rule => {
      const result = rule(value);
      if (!errorMessage && result) {
        errorMessage = result;
      }
    });
    return errorMessage;
  }

  public static minLengthRule: RuleWithArgs<number> = (value: string, minLength: number) => value.length >= minLength ? null : message.minLength;

  public static minLengthRuleWrapper(minLength: number): Rule {
    return (value: string) => Validation.minLengthRule(value, minLength);
  }

  public static startsWithCapitalLetterRule = (value: string): string | null =>
    value.charAt(0) === value.charAt(0).toUpperCase() ? null : message.startsWithCapitalLetter;

  public static onlyLatinLettersRule = (value: string): string | null =>
    /^[a-zA-Z]+$/.test(value) ? null : message.onlyLatinLetters;

  public static hasLowerCaseRule = (value: string): string | null =>
    /[a-z]/.test(value) ? null : message.hasLowerCase;

  public static hasUpperCaseRule = (value: string): string | null =>
    /[A-Z]/.test(value) ? null : message.hasUpperCase;

  public static hasNumberOrSpecialCharacterRule = (value: string): string | null =>
    /\d|[!@#$%^&*(),.?":{}|<>]/.test(value) ? null : message.hasNumberOrSpecialCharacter;

}
