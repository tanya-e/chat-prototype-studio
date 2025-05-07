
import React, { useState } from "react";
import { SmallAIAvatar, SmallHumanAvatar } from "../icons/MessengerIcons";
import { cn } from "@/lib/utils";

export type MessageType = {
  id: string;
  sender: "ai" | "human" | "user";
  content: string;
  timestamp: Date;
};

export type MessageGroupType = {
  id: string;
  sender: "ai" | "human" | "user";
  messages: {
    id: string;
    content: string;
    timestamp: Date;
  }[];
  showAvatar?: boolean;
};

interface MessageProps {
  message: MessageType;
  isLastInGroup: boolean;
  showAvatar?: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isLastInGroup, showAvatar = true }) => {
  const [showTimestamp, setShowTimestamp] = useState(false);
  const isUser = message.sender === "user";
  const formattedTime = message.timestamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isUser) {
    return (
      <div 
        className="flex flex-col items-end mb-1 relative"
        onMouseEnter={() => setTimeout(() => setShowTimestamp(true), 400)}
        onMouseLeave={() => setShowTimestamp(false)}
      >
        <div className="max-w-xs md:max-w-[260px] px-4 py-3 rounded-[20px] bg-messenger-customer-bg text-messenger-customer-text">
          {message.content}
        </div>
        {isLastInGroup && showTimestamp && (
          <div className="absolute -bottom-6 right-2 text-xs text-messenger-text-muted px-2 py-1 rounded-full bg-messenger-base shadow-sm transition-opacity duration-200 opacity-100">
            {formattedTime}
          </div>
        )}
      </div>
    );
  }

  const isAI = message.sender === "ai";

  return (
    <div 
      className="flex flex-col items-start mb-1 relative"
      onMouseEnter={() => setTimeout(() => setShowTimestamp(true), 400)}
      onMouseLeave={() => setShowTimestamp(false)}
    >
      <div className="max-w-xs md:max-w-[336px] px-4 py-3 rounded-[20px] bg-messenger-ai-bg text-messenger-ai-text">
        {showAvatar && (
          <div className="flex items-center gap-2 mb-2">
            {isAI ? <SmallAIAvatar /> : <SmallHumanAvatar name={isAI ? "AI" : "K"} />}
            <span className="text-sm font-semibold">
              {isAI ? "Fin" : "Kelly"}
            </span>
          </div>
        )}
        {message.content}
      </div>
      {isLastInGroup && showTimestamp && (
        <div className="absolute -bottom-6 left-2 text-xs text-messenger-text-muted px-2 py-1 rounded-full bg-messenger-base shadow-sm transition-opacity duration-200 opacity-100">
          {formattedTime}
        </div>
      )}
    </div>
  );
};

export default Message;
