import { Timestamp } from "firebase/firestore";

export interface IEventCreate {
  title: string;
  description: string;
  date: string;
  time: string;
}

export interface IEventRead {
  id: string;
  title: string;
  description: string;
  eventDate: string;
}
