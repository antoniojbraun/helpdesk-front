export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  usertype: string;
};

export type TicketList = {
  id: string;
  number: number;
  title: string;
  roomName: string;
  createdAt: string;
  status: string;
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
    room?: string[];
  };
  message?: string | null;
};

export interface InfoUrl {
  slug: string;
  id: string;
}

export type Message = {
  id: number;
  userType: string;
  author: string;
  message: string;
  day_sent: string;
  hour_sent: string;
};

export type Chat = {
  id: string;
  chatdata: [];
};

export const initialState = { message: null, errors: {} };

export const urlBaseApi = "http://localhost:3100";
