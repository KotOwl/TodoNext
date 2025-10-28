import { Timestamp } from "firebase/firestore";

export interface IEventCreate {
  title: string;
  description: string;
  date: string;
  time: string;
  type: EventType;
}

export interface IEventRead {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  type: EventType;
  userId: string;
}

export enum EventType {
  LOW = "low_priority",
  MEDIUM = "medium_priority",
  HIGH = "high_priority",
}

export const EventTypeColor = {
  [EventType.LOW]: "text-blue-500",
  [EventType.MEDIUM]: "text-yellow-500",
  [EventType.HIGH]: "text-red-500",
} as const;

export interface EventFilters {
    startDate?: string;
    endDate?: string;
    type?: string;
    title?: string;
  }

export const EventTypeLabel = {
  [EventType.LOW]: "Low priority",
  [EventType.MEDIUM]: "Medium priority",
  [EventType.HIGH]: "High priority",
} as const;