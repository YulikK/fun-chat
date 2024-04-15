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

export enum Status {
  sended = 'sended',
  delivered = 'delivered',
  readed = 'readed',
}

export const NEED_VALIDATE = [Fields.name, Fields.password];

export type ServerAnswer = {
  id: string;
  type: AppError | UserActions | MessageActions;
  payload: {
    error?: string,
    user?: Auth | MessageFrom,
    users?: User[],
    message?: Message | MessageSend | MessageId,
    messages?: Message[],
  } | null;
};

type MessageFrom = {
  login: string
}

export type serverAnswerError= {
  id: string,
  type: AppError.ERROR,
  payload: {
    error: string
  },
}

export type serverAnswerSuccess = {
  id: string,
  type: UserActions | MessageActions,
  payload: {
    user?: User,
    users?: User[],
    message?: Message,
    messages?: Message[],
  },
}

export type User = {
  login: string;
  isLogined: boolean;
};

export type Auth = {
  login: string | null;
  password: string | null;
};

export type Message = {
  id: string;
  from: string;
  to: string;
  text: string;
  datetime: number;
  status: MessageStatus;
};

export type MessageSend = {
  to: string | null;
  text: string;
};

export type MessageId = {
  id: string;
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
  USER_EXTERNAL_LOGIN = 'USER_EXTERNAL_LOGIN',
  USER_EXTERNAL_LOGOUT = 'USER_EXTERNAL_LOGOUT',
}

export const enum MessageActions {
  MSG_SEND = 'MSG_SEND',
  MSG_FROM_USER = 'MSG_FROM_USER',
  MSG_DELIVER = 'MSG_DELIVER',
  MSG_READ = 'MSG_READ',
  MSG_DELETE = 'MSG_DELETE',
  MSG_EDIT = 'MSG_EDIT',
}

export const enum AppError {
  ERROR = 'ERROR',
}