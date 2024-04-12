import { BaseComponent } from "@/app/components/base-components.ts";
import type Controller from "@/app/controller/controller";
import type { Auth } from "@/app/utils/type.ts";
import { Fields } from "@/app/utils/type.ts";
import { div, img, form } from "@/app/components/tags.ts";
import Input from "@/app/components/input/input.ts";
import Button from "@/app/components/button/button.ts";
import classes from "./auth.module.scss";



export default class AuthPage extends BaseComponent {
  private controller: Controller | null = null;

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
    this.addListener('submit', this.login);
    this.loginBtn.addListener('click', this.login);
    
    this.generateView();
  }

  public setController(controller: Controller): boolean {
    let result = false;
    if (controller) {
      this.controller = controller;
      result = true;
    }
    return result;
    
  }

  public resetForm(): void {
    this.name.setValue('');
    this.password.setValue('');
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
      const user: Auth = {
        login: this.name.getValue(),
        password: this.password.getValue(),
      }
      if (this.controller !== null) {
        this.controller.ctrAuth.login(user);
      }
      
    }
    
  }

  private validateForm = (): boolean =>  this.name.isValid() && this.password.isValid()

}