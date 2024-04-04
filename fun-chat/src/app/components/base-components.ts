export type Props<T extends HTMLElement = HTMLElement> = Partial<
  Omit<T, 'style' | 'dataset' | 'classList' | 'children' | 'tagName '>
  > & {
  type?: string;
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  htmlFor?: T extends HTMLLabelElement ? string : never;
  checked?: T extends HTMLInputElement ? boolean : never;
  id?: string;
  placeholder?: string;
  value?: string | number;
  tag: keyof HTMLElementTagNameMap;
};

export type ElementProps<T extends HTMLElement = HTMLElement> = Omit<Props<T>, 'tag'>;

export class BaseComponent {
  protected element: HTMLElement;

  protected child: BaseComponent[] = [];

  constructor(props: Props, ...child: BaseComponent[]) {
    this.element = document.createElement(props.tag);
    Object.assign(this.element, props);
    if (child) {
      this.appendChild(child);
    }
  }
  
  public append(child: BaseComponent): void {
      this.child.push(child);
      this.element.append(child.getElement());
  }
  
  public appendChild(child: BaseComponent[]): void {
    child.forEach((el) => {
      if (el instanceof BaseComponent) {
        this.append(el);
      } else {
        throw new Error('Child is not an instance of BaseComponent');
      }
    });
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public getChildren(): BaseComponent[] {
    return this.child;
  }

  public destroy(): void {
    this.destroyChild();
    this.element.remove();
  }

  public clear(): void {
    this.element.innerHTML = '';
  }

  public destroyChild(): void {
    this.child.forEach(child => child.destroy());
    this.child = [];
  }

  public clearChild(): void {
    this.child = [];
  }

  public getValue(): string {
    let value = '';
    if (this.element instanceof HTMLInputElement) {
      value = this.element.value.trim();
    };
    return value;
  }

  public setElementSrc(src: string): void {
    if (this.element instanceof HTMLImageElement) {
      this.element.src = src;
    }
  }

  public addClass(classNameClassName: string): void {
    this.element.classList.add(classNameClassName);
  }

  public toggleClass(classSurname: string): void {
    this.element.classList.toggle(classSurname);
  }

  public removeClass(className: string): void {
    this.element.classList.remove(className);
  }
}