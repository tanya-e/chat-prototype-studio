
import { ReactNode } from "react";

export type HeaderStateType = "ai" | "unassigned" | "human";

export interface MessageType {
  id: string;
  sender: "ai" | "human" | "user";
  content: string;
  timestamp: Date;
}

export interface MessageGroupType {
  id: string;
  sender: "ai" | "human" | "user";
  messages: {
    id: string;
    content: string;
    timestamp: Date;
  }[];
  showAvatar?: boolean;
}

export interface SystemMessageGroup {
  id: string;
  type: "system";
  content: string;
  displayed: boolean;
}
