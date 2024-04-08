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
  search = 'search',
}

export const NEED_VALIDATE = [Fields.name, Fields.password];

export type ServerMessage = {
  id: string;
  type: AppError | UserActions;
  payload: {
    error?: string,
    user?: Auth,
    users?: User[],
    message?: Message,
    messages?: Message[],
  } | null;
};

export type User = {
  login: string | null;
  isLogined: boolean;
};

export type Auth = {
  login: string | null;
  password: string | null;
};

export type Message = {
  id: string | null;
  from: string | null;
  to: string | null;
  text: string;
  datetime: number;
  status: MessageStatus;
};

export type MessageStatus = {
  isDelivered: boolean;
  isReaded: boolean;
  isEdited: boolean;
};

export const enum UserActions {
  LOGIN = 'USER_LOGIN',
  LOGOUT = 'USER_LOGOUT',
  USER_ACTIVE = 'USER_ACTIVE',
  USER_INACTIVE = 'USER_INACTIVE',
}

export const enum AppError {
  ERROR = 'ERROR',
}