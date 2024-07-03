export type User = {
  id: string;
  name: string;
  email: string;
  userType: string;
};

export type TicketByUser = {
  id: string;
  number: number;
  title: string;
  description: string;
  status: string;
  room: {
    id: string;
    name: string;
    description: string;
  };
  createdAt: string;
};

export type itemTicket = {
  id: string;
  number: number;
  title: string;
  description: string;
  status: string;
  responsible: string;
  attendant: string;
  room: {
    id: string;
    name: string;
    description: string;
  };
  createdAt: string;
  imagesBase64: string;
};

export type Room = {
  id: string;
  name: string;
  description: string;
};

export interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export type State = {
  errors?: {
    title?: string[];
    description?: string[];
    roomid?: string[];
    userid?: string[];
    images?: string[];
  };
  message?: string | null;
};

export type StateRoom = {
  errors?: {
    name?: string[];
    description?: string[];
  };
  message: string | null;
  status: boolean;
};

export interface InfoUrl {
  slug: string;
  id: string;
  redirect?: string;
}

export type Chat = {
  message: string;
  sendedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    userType: string;
  };
  imageBase64: string;
};

export type InitialState = {
  message: null;
  errors: {};
};

export type DataSession = {
  user: {
    id: string;
    name: string;
    role: string;
    token: string;
    expirationDate: string;
  };
};

export type DataCreateRoom = {
  name?: string;
  description?: string;
};

export type DataUpdateRoom = {
  id: string;
  name?: string;
  description?: string;
};

export type RoomFormError = {
  name?: string[] | undefined;
  description?: string[] | undefined;
  msg?: string[] | undefined;
  status?: boolean;
};

export type TicketFormError = {
  title?: string[] | undefined;
  description?: string[] | undefined;
  roomid?: string[] | undefined;
  userid?: string[] | undefined;
  images?: string[] | undefined;
  msg?: string[] | undefined;
  status?: boolean;
};

export type MessageChatFormError = {
  message?: string[] | undefined;
  image?: string[] | undefined;
  msg?: string[] | undefined;
  status?: boolean;
};

export type CreateUserFormErrors = {
  name?: string[] | undefined;
  email?: string[] | undefined;
  password?: string[] | undefined;
  confirmPassword?: string[] | undefined;
  userType?: string[] | undefined;
  msg?: string[] | undefined;
  status?: boolean;
};

export const initialState = { message: null, errors: {} };

export let urlBaseApi = "";

function environmentVariables() {
  const env = process.env.NEXT_PUBLIC_ENVIRONMENT;
  switch (env) {
    case "DEV":
      urlBaseApi = "https://helpdesk-backend-muvo.onrender.com/api";
      break;
    case "LOCAL":
      urlBaseApi = "http://localhost:7233/api";
      break;
    default:
      urlBaseApi = "http://localhost:3000";
  }
}

environmentVariables();
