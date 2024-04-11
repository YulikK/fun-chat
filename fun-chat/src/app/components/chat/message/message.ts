import { Status } from '@/app/utils/type.ts';
import type { User } from '@/app/utils/type.ts';
import { BaseComponent } from '../../base-components.ts';
import classes from './message.module.scss';
import { a, div, img, p, span } from '../../tags.ts';

const MY_MSG = 'You';

export default class Message extends BaseComponent {
  private text: BaseComponent;

  private time: BaseComponent;

  private user: BaseComponent;

  private editStatus: BaseComponent;

  private btnEdit: BaseComponent;

  private btnDelete: BaseComponent;

  private isMy: boolean;

  private status: Status = Status.delivered;

  private deliverStatus: BaseComponent;

  private isEdit = false;

  constructor(text: string, time: string, isMy: boolean, user: User) {
    super({ tag: 'div', className: `${classes.message} ${isMy ? classes.right : classes.left}` });
    this.text = p(classes.text!, text);
    this.time = span({ className: classes.time, textContent: time });
    this.isMy = isMy;
    this.user = span({ className: classes.user, textContent: `${this.isMy ? MY_MSG : user.login}` });
    this.editStatus = img({className: `${classes.img} ${classes.hide}` , src: `img/is-edit.png`, alt: 'is edit', width: 15, height: 15});
    this.btnEdit = getBtn('edit');
    this.btnDelete = getBtn('delete');
    this.btnDelete.addListener('click', this.onDelete);
    this.btnEdit.addListener('click', this.onEdit);
    this.deliverStatus = img({className: classes.img, src: `img/${this.status}.png`, alt: this.status, width: 15, height: 15});
    
    this.appendChild(this.getView());
  }

  private getView(): BaseComponent[] {
    return [
      div({ className: classes.controls },
        div({ className: classes.wrap },
          this.user,
          this.editStatus),
        div({ className: classes.wrap },
          this.btnEdit,
          this.btnDelete),
      ),
      this.text,
      div({ className: classes.info },
        this.time,
        this.deliverStatus)
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