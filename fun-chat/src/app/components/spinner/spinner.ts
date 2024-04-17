import SRC from '@/app/utils/src.ts';
import { BaseComponent } from '../base-components.ts';
import { div, img, p } from '../tags.ts';
import classes from './spinner.module.scss';

export default class Spinner extends BaseComponent {
  private text: BaseComponent;

  constructor() {
    super({ tag: 'div', className: `${classes.bg} ${classes.hide}` });
    const modal = div({ className: classes.modal });
    this.text = p(classes.msg!, '');
    const spinner = img({ src: SRC.spinner, alt: SRC.spinnerAlt, className: classes.spinner, width: 40, height: 40 });
    modal.appendChild([spinner, this.text])
    this.append(modal);
    document.body.appendChild(this.getElement())
  }

  public show(): void {
    this.removeClass(classes.hide!);
  }

  public hide(): void {
    this.addClass(classes.hide!);
  }

  public setMessage(text: string): void {
    this.text.setText(text);
  }
}
