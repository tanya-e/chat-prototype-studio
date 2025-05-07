
import React, { useState, useRef, MouseEvent } from "react";
import { SmallAIAvatar, SmallHumanAvatar } from "../icons/MessengerIcons";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isUser = message.sender === "user";
  const formattedTime = message.timestamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX + 4, y: e.clientY });
  };

  if (isUser) {
    return (
      <div
        className="flex flex-col items-end mb-1 relative"
        onMouseEnter={() => setShowTimestamp(true)}
        onMouseLeave={() => setShowTimestamp(false)}
        onMouseMove={handleMouseMove}
      >
        <div className="max-w-xs md:max-w-[260px] px-4 py-3 rounded-[20px] bg-messenger-customer-bg text-messenger-customer-text">
          {message.content}
        </div>
        {isLastInGroup && showTimestamp && (
          <div 
            className="fixed z-50 px-2 py-1 text-xs bg-messenger-base shadow-md text-messenger-text-muted rounded-md border-none pointer-events-none"
            style={{ 
              left: `${mousePosition.x}px`, 
              top: `${mousePosition.y - 30}px`
            }}
          >
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
      onMouseEnter={() => setShowTimestamp(true)}
      onMouseLeave={() => setShowTimestamp(false)}
      onMouseMove={handleMouseMove}
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
        <div 
          className="fixed z-50 px-2 py-1 text-xs bg-messenger-base shadow-md text-messenger-text-muted rounded-md border-none pointer-events-none"
          style={{ 
            left: `${mousePosition.x}px`, 
            top: `${mousePosition.y - 30}px`
          }}
        >
          {formattedTime}
        </div>
      )}
    </div>
  );
};

export default Message;
