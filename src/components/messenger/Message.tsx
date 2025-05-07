
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
  const isUser = message.sender === "user";
  const formattedTime = message.timestamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isUser) {
    return (
      <TooltipProvider>
        <Tooltip open={showTimestamp}>
          <TooltipTrigger asChild>
            <div 
              className="flex flex-col items-end mb-1 relative"
              onMouseEnter={() => setShowTimestamp(true)}
              onMouseLeave={() => setShowTimestamp(false)}
            >
              <div className="max-w-xs md:max-w-[260px] px-4 py-3 rounded-[20px] bg-messenger-customer-bg text-messenger-customer-text">
                {message.content}
              </div>
            </div>
          </TooltipTrigger>
          {isLastInGroup && (
            <TooltipContent side="top" sideOffset={5} className="bg-messenger-base shadow-md text-xs text-messenger-text-muted py-1 px-2 rounded-md border-none">
              {formattedTime}
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    );
  }

  const isAI = message.sender === "ai";

  return (
    <TooltipProvider>
      <Tooltip open={showTimestamp}>
        <TooltipTrigger asChild>
          <div 
            className="flex flex-col items-start mb-1 relative"
            onMouseEnter={() => setShowTimestamp(true)}
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
          </div>
        </TooltipTrigger>
        {isLastInGroup && (
          <TooltipContent side="top" sideOffset={5} className="bg-messenger-base shadow-md text-xs text-messenger-text-muted py-1 px-2 rounded-md border-none">
            {formattedTime}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default Message;
