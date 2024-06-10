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
  room: string;
  dt_creation: string;
  status: string;
  user_id: string;
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
