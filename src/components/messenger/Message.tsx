
import React from "react";
import { SmallAIAvatar, SmallHumanAvatar } from "../icons/MessengerIcons";

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
  const isUser = message.sender === "user";
  const formattedTime = message.timestamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isUser) {
    return (
      <div className="flex flex-col items-end">
        <div className="max-w-xs md:max-w-[260px] px-4 py-3 rounded-2xl bg-messenger-customer-bg text-messenger-customer-text">
          {message.content}
        </div>
        {isLastInGroup && (
          <div className="text-xs text-messenger-text-muted my-1 px-1">
            {formattedTime}
          </div>
        )}
      </div>
    );
  }

  const isAI = message.sender === "ai";

  return (
    <div className="flex flex-col items-start">
      {showAvatar && isLastInGroup && (
        <div className="flex items-center gap-2 mb-1 mt-1">
          {isAI ? <SmallAIAvatar /> : <SmallHumanAvatar name={isAI ? "AI" : "K"} />}
          <span className="text-sm font-semibold">
            {isAI ? "AI Assistant" : "Kelly"}
          </span>
        </div>
      )}
      <div className="max-w-xs md:max-w-[336px] px-4 py-3 rounded-2xl bg-messenger-ai-bg text-messenger-ai-text">
        {message.content}
      </div>
      {isLastInGroup && (
        <div className="text-xs text-messenger-text-muted my-1 px-1">
          {formattedTime}
        </div>
      )}
    </div>
  );
};

export default Message;
