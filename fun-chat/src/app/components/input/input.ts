import type { Fields } from "@/app/utils/type.ts";
import type Validation from "@/app/utils/validation.ts";
// import { NEED_VALIDATE } from "@/app/utils/type.ts";
// import { validateField } from "@/app/utils/validation-response.ts";
import { BaseComponent } from '../base-components.ts';
import { p } from "../tags.ts";
import classes from './input.module.scss';


interface InputProps {
  tag?: string;
  id: Fields;
  type: string;
  placeholder?: string;
  className?: string;
  value?: string;
  validation: Validation | undefined;
  errorContainer?: BaseComponent;
}

export default class Input extends BaseComponent{
  private errorContainer: BaseComponent | null = null;

  private errorsMsg: BaseComponent | null = null;

  // private isNeedValidate: boolean;

  private id: Fields;

  private validation: Validation | undefined;

  constructor({ id, type, placeholder, className, errorContainer, validation, value=''}: InputProps) {
    super({ tag: 'input', id, type, placeholder, className: `${classes.input} ${className || ''}`, value })

    this.id = id;

    this.validation = validation;
    // this.isNeedValidate = NEED_VALIDATE.includes(id);
    if (errorContainer) {
      this.errorContainer = errorContainer;
    }

    this.element.addEventListener('change', this.onChange);
  }

  private onChange = (event: Event): void => {
    if (this.validation) {
      event.preventDefault();
      this.validate();
    }

  }

  public isValid(): boolean {
    return this.validate();
  }

  private validate = (): boolean => {
    const value = this.getValue();
    let isValid = true;
    if (this.validation) {
      const message = this.validation.validate(value);
      if (message) {
        this.setError(`${this.id.toString()}: ${message}`);
        isValid = false;
      } else {
        this.setSuccess();
      }
    }
    // this.validation?.validate
    // const validationResult = validateField(value, this.id);

    // if (validationResult.isValid) {
    //   this.setSuccess();
    // } else {
    //   this.setError(validationResult.error);
    // }
    return isValid;
  }

  private setError(error: string): void {
    if (this.errorContainer && this.validation) {
      this.errorContainer.getElement().innerHTML = '';
      this.errorsMsg = p(classes.errorMessage!, error);
      this.errorContainer.append(this.errorsMsg);
      this.addClass(classes.error!);
      this.removeClass(classes.success!);
    }

  }

  private setSuccess(): void {
    if (this.validation && this.errorContainer) {
      this.errorContainer.getElement().innerHTML = '';
    if (this.errorsMsg) {
      this.errorsMsg.destroy();
    }
    this.addClass(classes.success!);
    this.removeClass(classes.error!);
    }

  }
}
