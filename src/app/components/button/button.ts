import type { Callback } from '@/app/utils/type.ts';
import { BaseComponent } from '../base-components.ts';

import classes from './button.module.scss';

interface Props {
  textContent: string;
  onClick?: Callback;
  className?: string;
}

const Button = ({textContent, onClick, className }: Props):BaseComponent  =>
  new BaseComponent({
    tag: 'button',
    className: `${classes.btn} ${className || ''}`,
    textContent,
    onclick: (PreventDefault: Event): void => {
      PreventDefault.preventDefault();
      onClick?.();
    },
  });
export default Button;