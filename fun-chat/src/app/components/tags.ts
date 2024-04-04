import type { ElementProps } from "./base-components.ts";
import { BaseComponent } from "./base-components.ts";

export const div = (props: ElementProps<HTMLDivElement>, ...children: BaseComponent[]): BaseComponent<HTMLDivElement> =>
  new BaseComponent<HTMLDivElement>({ ...props, tag: 'div' }, ...children);

export const h1 = (className: string, textContent: string, ...children: BaseComponent[]): BaseComponent<HTMLElementTagNameMap['h1']> =>
  new BaseComponent({ tag: 'h1', className, textContent }, ...children);

export const p = (className: string, textContent: string): BaseComponent<HTMLElementTagNameMap['h1']> =>
  new BaseComponent({ tag: 'p', className, textContent });

export const img = ({ src = '', alt = '', className = '', width = 0, height = 0 }): BaseComponent<HTMLElementTagNameMap['img']> =>
  new BaseComponent<HTMLElementTagNameMap['img']>({
    tag: 'img',
    className,
    src,
    alt,
    width,
    height
  });

export const a = (props: ElementProps<HTMLLinkElement>, ...children: BaseComponent[]): BaseComponent<HTMLLinkElement> =>
  new BaseComponent<HTMLLinkElement>({ ...props, tag: 'a' }, ...children);

export const span = (props: ElementProps<HTMLElement>, ...children: BaseComponent[]): BaseComponent =>
  new BaseComponent({ ...props, tag: 'span' }, ...children);

export const li = (className: string, onclick?:(evt: Event) => void, ...children: BaseComponent[]): BaseComponent<HTMLElementTagNameMap['li']> =>
  new BaseComponent<HTMLElementTagNameMap['li']>({  tag: 'li', className, onclick }, ...children);

export const ul = (props: ElementProps<HTMLElement>, ...children: BaseComponent[]): BaseComponent<HTMLElementTagNameMap['ul']> =>
  new BaseComponent<HTMLElementTagNameMap['ul']>({ ...props, tag: 'ul' }, ...children)

export const nav = (props: ElementProps<HTMLElement>, ...children: BaseComponent[]): BaseComponent<HTMLElementTagNameMap['nav']> =>
  new BaseComponent<HTMLElementTagNameMap['nav']>({ ...props, tag: 'nav' }, ...children)

export const section = (props: ElementProps<HTMLElement>, ...children: BaseComponent[]): BaseComponent<HTMLElementTagNameMap['section']> =>
  new BaseComponent<HTMLElementTagNameMap['section']>({ ...props, tag: 'section' }, ...children)