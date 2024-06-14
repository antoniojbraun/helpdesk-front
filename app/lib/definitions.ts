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
  number: number;
  description: string;
  status: string;
  img: string;
  createdAt: string;
  user: User;
  support_id: string;
  room: Room;
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
  chatData: [];
};

export var urlBaseApi = "";

export function environmentVariables() {
  let env = process.env.ENVIRONMENT;

  if (env == "DEV") {
    urlBaseApi = "https://helpdesk-backend-muvo.onrender.com/api"
  }
  else if (env == "LOCAL") {
    urlBaseApi = "https://localhost:7233/api"
  }
  else {
    urlBaseApi = "http://localhost:3100"
  }

}

environmentVariables()

//export const urlBaseApi = "https://helpdesk-backend-muvo.onrender.com/api"
//export const urlBaseApi = "https://localhost:7233/api";
//export const urlBaseApi = "http://localhost:3100";

