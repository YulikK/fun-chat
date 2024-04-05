import { BaseComponent } from "@/app/components/base-components.ts";
import { Fields } from "@/app/utils/type.ts";
import { div, img, form } from "@/app/components/tags.ts";
import Input from "@/app/components/input/input.ts";
import Button from "@/app/components/button/button.ts";
import classes from "./auth.module.scss";


export default class AuthPage extends BaseComponent {
  private name: Input;

  private password: Input;

  private errorsContainer: BaseComponent;

  private loginBtn: BaseComponent;

  constructor() {
    super({ tag: 'div', className: classes.container });
    this.errorsContainer = div({ className: classes.errors });
    this.name = new Input({ id: Fields.name, type: 'text', placeholder: 'Name', errorContainer: this.errorsContainer});
    this.password = new Input({ id: Fields.password, type: 'password', placeholder: 'password', errorContainer: this.errorsContainer });
    this.loginBtn = Button({ textContent: 'Login', className: classes.login });
    this.loginBtn.addListener('click', this.login);
    
    this.generateView();
  }

  private generateView(): void {
    const modal = form({ className: classes.form },
      img({ className: classes.img, src: 'img/user.png', alt: 'user', width: 40, height: 40 }),
      div({ className: classes.inputWrapper },
        this.name,
        this.password),
      this.errorsContainer,
      this.loginBtn
      );

    this.append(modal)
  }

  private login = (): void => {

    if (this.validateForm()) {
      console.log('is correct');
      // this.updateUser();
      // this.loginCallback();
    }
    
  }

  private validateForm = (): boolean =>  this.name.isValid() && this.password.isValid()

}