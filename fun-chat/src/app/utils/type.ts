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

export type ServerMessage = {
  id: string;
  type: AppError | UserActions;
  payload: {
    error?: string,
    user?: User,
    users?: User[],
    message?: Message,
    messages?: Message[],
  } | null;
};

export type User = {
  id?: string | null;
  login: string | null;
  password?: string | null;
  isLogined?: boolean;
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
}

export const enum AppError {
  ERROR = 'ERROR',
}