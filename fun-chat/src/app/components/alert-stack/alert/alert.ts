import { BaseComponent } from '../../base-components.ts';
import type AlertStack from '../alert-stack.ts';
import { p } from '../../tags.ts';
import Button from '../../button/button.ts';
import classes from './alert.module.scss';

const TIME_SHOW = 3000;
export default class AlertComponent extends BaseComponent {
  private closeBtn: BaseComponent;

  private alertStack: AlertStack;

  private timeout: NodeJS.Timeout | null = null;

  constructor(alertStack: AlertStack, message: string) {
    super({ tag: 'div', className: classes.alert });
    this.alertStack = alertStack;
    const text = p(classes.message!, message);
    this.closeBtn = Button({ textContent: '', className: classes['btn-close'] });
    this.closeBtn.addListener('click', this.onClose);

    this.appendChild([text, this.closeBtn]);
  }

  public show(): void {
    this.addClass(classes.show!);
    this.alertStack.append(this);
    this.timeout = setTimeout(this.onHide, TIME_SHOW);
  }

  private onHide = (): void => {
    this.addClass(classes.close!);
    this.timeout = setTimeout(this.onClose, 1000);
  };

  private onClose = (): void => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.destroy();
  };
}
