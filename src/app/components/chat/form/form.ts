import type { Message } from '@/app/utils/type.ts';
import { BaseComponent } from '../../base-components.ts';
import classes from './form.module.scss';

type submitCallback = (message: string) => void;
type editCallback = (text: string, message: Message) => void;
type closeCallback = (message: Message) => void;
export default class MessageForm extends BaseComponent {
  private text: BaseComponent;

  private button: BaseComponent;

  private btnClose: BaseComponent;

  private editMessage: Message | null = null;

  private submitCallback: submitCallback;

  private editCallback: editCallback;

  private closeCallback: closeCallback;

  constructor(submitCallback: submitCallback, editCallback: editCallback, closeCallback: closeCallback){
    super({ tag: 'form', className: classes.form });
    this.submitCallback = submitCallback;
    this.editCallback = editCallback;
    this.closeCallback = closeCallback;
    this.text = new BaseComponent({ tag: 'input', className: classes.input });
    this.button = new BaseComponent({ tag: 'button', className: classes.button });
    this.btnClose = new BaseComponent({ tag: 'button', className: `${classes.btnClose} ${classes.hide}` });
    this.appendChild([this.text, this.button, this.btnClose]);
    this.addListener('submit', this.onSubmit);
    this.button.addListener('submit', this.onSubmit);
    this.btnClose.addListener('click', this.onClose);
  }

  public setEditMessage(message: Message): void {
    this.editMessage = message;
    this.btnClose.removeClass(classes.hide!);
    this.text.setValue(message.text);
  }

  public deleteMessageHandler(message: Message): void {
    if (message && this.editMessage === message) {
      this.onClose();
    }
  }

  private onSubmit = (event: Event): void => {
    event.preventDefault();
    const message = this.text.getValue();
    if (message) {
      this.text.setValue('');
      if (this.editMessage) {
        if (this.editMessage.text !== message) {
          this.editCallback(message, this.editMessage);
        }
        this.onClose();
      } else {
        this.submitCallback(message);
      }
    }
  }

  private onClose = (): void => {
    if (this.editMessage) {
      const message = this.editMessage;
      this.editMessage = null;
      this.text.setValue('');
      this.btnClose.addClass(classes.hide!);
      this.closeCallback(message);
    }
  }
}
