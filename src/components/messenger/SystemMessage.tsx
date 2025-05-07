
import React from "react";
import { SmallHumanAvatar } from "../icons/MessengerIcons";

interface SystemMessageProps {
  message: string;
  type?: "human-joined" | "default";
}

const SystemMessage: React.FC<SystemMessageProps> = ({ 
  message, 
  type = "default" 
}) => {
  // Extract name from message if it's a human-joined type
  const isHumanJoined = type === "human-joined";
  let nameContent = null;
  let messageContent = message;
  
  if (isHumanJoined && message.includes("joined")) {
    const parts = message.split(" joined");
    if (parts.length > 1) {
      nameContent = <span className="font-medium">{parts[0]}</span>;
      messageContent = " joined" + parts[1]; // Add space before "joined"
    }
  }

  return (
    <div className="flex justify-center my-4 animate-fade-in">
      {isHumanJoined ? (
        <div className="flex items-center gap-1.5 py-6 px-6">
          <SmallHumanAvatar />
          <div className="text-xs flex">
            <span 
              style={{
                color: 'var(--messenger-text-default)',
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: '150%',
                letterSpacing: '0.048px'
              }}
            >
              {nameContent}
            </span>
            <span 
              style={{
                color: 'var(--messenger-text-muted)',
                fontSize: '12px',
                fontWeight: 400,
                lineHeight: '150%',
                letterSpacing: '0.048px'
              }}
            >
              {messageContent}
            </span>
          </div>
        </div>
      ) : (
        <div className="text-xs text-messenger-text-muted bg-messenger-base px-4 py-1 rounded-full">
          {message}
        </div>
      )}
    </div>
  );
};

export default SystemMessage;
