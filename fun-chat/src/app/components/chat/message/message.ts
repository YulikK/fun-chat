import { Status } from '@/app/utils/type.ts';
import type { Message, User } from '@/app/utils/type.ts';
import { getDateFormat } from '@/app/utils/utils.ts';
import { BaseComponent } from '../../base-components.ts';
import classes from './message.module.scss';
import { a, div, img, p, span } from '../../tags.ts';


const MY_MSG = 'You';

export default class MessageComponent extends BaseComponent {
  private message: Message;

  private text: BaseComponent;

  private time: BaseComponent;

  private user: BaseComponent;

  private editStatus: BaseComponent;

  private btnEdit: BaseComponent;

  private btnDelete: BaseComponent;

  private isMy: boolean;

  private deliverStatus: BaseComponent;

  private isEdit = false;

  constructor(message: Message, isMy: boolean, user: User) {
    super({ tag: 'div', className: `${classes.message} ${isMy ? classes.right : classes.left}` });
    this.message = message;
    this.text = p(classes.text!, message.text);
    this.time = span({ className: classes.time, textContent: getDateFormat(message.datetime) });
    this.isMy = isMy;
    this.user = span({ className: classes.user, textContent: `${this.isMy ? MY_MSG : user.login}` });
    this.editStatus = img({className: `${classes.img} ${!this.message.status.isEdited ? classes.hide : ''}` , src: `img/is-edit.png`, alt: 'is edit', width: 15, height: 15});
    this.btnEdit = getBtn('edit');
    this.btnDelete = getBtn('delete');
    this.btnDelete.addListener('click', this.onDelete);
    this.btnEdit.addListener('click', this.onEdit);
    this.deliverStatus = this.getStatusComponent(); 
    
    this.appendChild(this.getView());
  }

  public getMessage(): Message {
    return this.message;
  }

  public updateMessage(message: Message): void {
    this.message = message;
    this.text.setText(message.text);
    this.updateDeliverStatus();
    this.updateEditStatus();
  }

  private updateDeliverStatus(): void {
    const status = this.getStatus();
    this.deliverStatus.setElementSrc(`img/${status}.png`);
  }

  private updateEditStatus(): void {
    if (this.message.status.isEdited) {
      this.editStatus.removeClass(classes.hide!);
    }
  }

  private getStatusComponent(): BaseComponent {
    const status = this.getStatus();
    return img({className: classes.img, src: `img/${status}.png`, alt: status, width: 15, height: 15});
  }

  private getStatus(): Status {
    let status = Status.sended;
    status = this.message.status.isDelivered ? Status.delivered : status;
    status = this.message.status.isReaded ? Status.readed : status;
    return status;;
  }

  private getView(): BaseComponent[] {
    const controls = div({ className: classes.controls });
    controls.append(div({ className: classes.wrap },
      this.user,
      this.editStatus))
    if (this.isMy) {
      controls.append(div({ className: classes.wrap },
        this.btnEdit,
        this.btnDelete))
    }
    const info = div({ className: classes.info })
    info.append(this.time);
    if (this.isMy) {
      info.append(this.deliverStatus);
    }
    return [
      controls,
      this.text,
      info
    ]
  }

  private onDelete = (): void =>{
    this.destroy();
  }

  private onEdit = (): void => {
    this.isEdit = !this.isEdit;
    this.editStatus.removeClass(classes.hide!);
  }
  
}

function getBtn(name: string): BaseComponent {
  return a({ className: classes['btn-round']},
    img({className: classes.img, src: `img/${name}.png`, alt: name, width: 15, height: 15}))
}