export type Callback = () => void;

export enum Navigation {
  auth = 'auth',
  info = 'info',
  chat = 'chat',
  page404 = '',
}

export enum Fields {
  name = 'name',
  password = 'password',
}
