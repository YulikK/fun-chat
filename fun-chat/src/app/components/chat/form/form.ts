import { BaseComponent } from '../../base-components.ts';
import classes from './form.module.scss';

type submitCallback = (message: string) => void;
export default class MessageForm extends BaseComponent {
  private text: BaseComponent;

  private button: BaseComponent;

  private submitCallback: submitCallback;

  constructor(submitCallback: submitCallback){
    super({ tag: 'form', className: classes.form });
    this.submitCallback = submitCallback;
    this.text = new BaseComponent({ tag: 'input', className: classes.input });
    this.button = new BaseComponent({ tag: 'button', className: classes.button });
    this.appendChild([this.text, this.button]);
    this.addListener('submit', this.onSubmit);
    this.button.addListener('submit', this.onSubmit);
  }

  private onSubmit = (event: Event): void => {
    event.preventDefault();
    const message = this.text.getValue();
    if (message) {
      this.text.setValue('');
      this.submitCallback(message);
    }
  }
}