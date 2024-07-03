import type { ElementProps } from "./base-components.ts";
import { BaseComponent } from "./base-components.ts";

export const div = (props: ElementProps<HTMLDivElement>, ...children: BaseComponent[]): BaseComponent =>
  new BaseComponent({ ...props, tag: 'div' }, ...children);

export const aside = (props: ElementProps<HTMLBaseElement>, ...children: BaseComponent[]): BaseComponent =>
  new BaseComponent({ ...props, tag: 'aside' }, ...children);

export const article = (props: ElementProps<HTMLBaseElement>, ...children: BaseComponent[]): BaseComponent =>
  new BaseComponent({ ...props, tag: 'article' }, ...children);

export const h1 = (className: string, textContent: string, ...children: BaseComponent[]): BaseComponent =>
  new BaseComponent({ tag: 'h1', className, textContent }, ...children);

export const p = (className: string, textContent: string): BaseComponent =>
  new BaseComponent({ tag: 'p', className, textContent });

export const img = ({ src = '', alt = '', className = '', width = 0, height = 0 }): BaseComponent =>
  new BaseComponent({tag: 'img', className, src, alt, width, height });

export const a = (props: ElementProps<HTMLLinkElement>, ...children: BaseComponent[]): BaseComponent =>
  new BaseComponent({ ...props, tag: 'a' }, ...children);

export const span = (props: ElementProps<HTMLElement>, ...children: BaseComponent[]): BaseComponent =>
  new BaseComponent({ ...props, tag: 'span' }, ...children);

export const li = (className: string, onclick?:(evt: Event) => void, ...children: BaseComponent[]): BaseComponent =>
  new BaseComponent({  tag: 'li', className, onclick }, ...children);

export const ul = (props: ElementProps<HTMLElement>, ...children: BaseComponent[]): BaseComponent =>
  new BaseComponent({ ...props, tag: 'ul' }, ...children)

export const nav = (props: ElementProps<HTMLElement>, ...children: BaseComponent[]): BaseComponent =>
  new BaseComponent({ ...props, tag: 'nav' }, ...children)

export const section = (props: ElementProps<HTMLElement>, ...children: BaseComponent[]): BaseComponent =>
  new BaseComponent({ ...props, tag: 'section' }, ...children)

export const form = (props: ElementProps<HTMLElement>, ...children: BaseComponent[]): BaseComponent =>
  new BaseComponent({ ...props, tag: 'form' }, ...children)