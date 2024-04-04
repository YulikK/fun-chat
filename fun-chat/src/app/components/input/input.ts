import type { FieldName } from "@/app/utils/type.ts";
import { BaseComponent } from '../base-components.ts';
import classes from './input.module.scss';

interface Props {
  tag?: string;
  id: FieldName;
  type: string;
  placeholder?: string;
  className?: string;
  value?: string;
}

export default class Input extends BaseComponent{

  constructor({ id, type, placeholder, className, value }: Props) {
    super({ tag: 'input', id, type, placeholder, className: `${classes.input} ${className || ''}`, value }) 
  }

} 