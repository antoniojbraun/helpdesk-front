export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  userType: string;
};

export type Ticket = {
  id: string;
  title: string;
  description: string;
  room: string;
  dt_creation: string;
  status: string;
  user_id: number;
};

export type Room = {
  id: string;
  title: string;
  description: string;
};
