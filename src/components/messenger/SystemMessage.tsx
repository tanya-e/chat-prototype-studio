
import React from "react";
import { SmallHumanAvatar } from "../icons/MessengerIcons";
import { cn } from "@/lib/utils";

interface SystemMessageProps {
  message: string;
  timestamp?: Date;
  type?: "human-joined" | "default";
}

const SystemMessage: React.FC<SystemMessageProps> = ({ 
  message, 
  timestamp,
  type = "default" 
}) => {
  const formattedTime = timestamp
    ? timestamp.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";
    
  // Extract name from message if it's a human-joined type
  const isHumanJoined = type === "human-joined";
  let nameContent = null;
  let messageContent = message;
  
  if (isHumanJoined && message.includes("joined")) {
    const parts = message.split(" joined");
    if (parts.length > 1) {
      nameContent = <span className="font-medium">{parts[0]}</span>;
      messageContent = ` joined${parts[1]}`;
    }
  }

  return (
    <div className="flex justify-center my-4 animate-fade-in">
      {isHumanJoined ? (
        <div className="flex items-center gap-1.5 p-2 px-3 rounded-full">
          <SmallHumanAvatar />
          <div className="text-xs text-messenger-text-default">
            {nameContent}{messageContent}
          </div>
          {timestamp && <span className="text-messenger-text-muted text-xs ml-1">• {formattedTime}</span>}
        </div>
      ) : (
        <div className={cn(
          "text-xs text-messenger-text-muted bg-messenger-base px-4 py-1 rounded-full"
        )}>
          {message} {timestamp && `• ${formattedTime}`}
        </div>
      )}
    </div>
  );
};

export default SystemMessage;
