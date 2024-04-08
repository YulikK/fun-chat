import type { Fields } from "@/app/utils/type.ts";
import { NEED_VALIDATE } from "@/app/utils/type.ts";
import { validateField } from "@/app/utils/validation.ts";
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
  errorContainer?: BaseComponent;
}

export default class Input extends BaseComponent{
  private errorContainer: BaseComponent | null = null;

  private errorsMsg: BaseComponent | null = null;

  private isNeedValidate: boolean;

  private id: Fields;

  constructor({ id, type, placeholder, className, errorContainer, value=''}: InputProps) {
    super({ tag: 'input', id, type, placeholder, className: `${classes.input} ${className || ''}`, value }) 

    this.id = id;
    
    this.isNeedValidate = NEED_VALIDATE.includes(id);
    if (errorContainer) {
      this.errorContainer = errorContainer;
    }
    
    this.element.addEventListener('change', this.onChange);
  }

  private onChange = (event: Event): void => {
    if (this.isNeedValidate) {
      event.preventDefault();
      this.validate();
    }
    
  }

  public isValid(): boolean {
    return this.validate();
  }

  private validate = (): boolean => {
    const value = this.getValue();
    const validationResult = validateField(value, this.id);

    if (validationResult.isValid) {
      this.setSuccess();
    } else {
      this.setError(validationResult.error);
    }
    return validationResult.isValid;
  }

  private setError(error: string): void {
    if (this.errorContainer && this.isNeedValidate) {
      this.errorContainer.getElement().innerHTML = '';
      this.errorsMsg = p(classes.errorMessage!, error);
      this.errorContainer.append(this.errorsMsg);
      this.addClass(classes.error!);
      this.removeClass(classes.success!);
    }
    
  }

  private setSuccess(): void {
    if (this.isNeedValidate && this.errorContainer) {
      this.errorContainer.getElement().innerHTML = '';
    if (this.errorsMsg) {
      this.errorsMsg.destroy();
    }
    this.addClass(classes.success!);
    this.removeClass(classes.error!);
    }
    
  }
} 