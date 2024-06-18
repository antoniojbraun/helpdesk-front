export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  usertype: string;
};

export type Ticket = {
  id: string;
  title: string;
  description: string;
  status: string;
  img: string;
  dt_creation: string;
  user_id: string;
  support_id: string;
  room_id: string;
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

export const urlBaseApi = "http://localhost:3100";
