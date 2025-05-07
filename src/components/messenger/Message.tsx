
import React, { useState, useRef, MouseEvent, useEffect } from "react";
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isUser = message.sender === "user";
  const formattedTime = message.timestamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX + 4, y: e.clientY });
  };

  const handleMouseEnter = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    // Timestamp display has been disabled as requested
    // The timer setup is kept for easy re-enabling
    // hoverTimerRef.current = setTimeout(() => {
    //   setShowTimestamp(true);
    // }, 500);
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    // Timestamp hiding code kept for structure
    // setShowTimestamp(false);
  };

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  if (isUser) {
    return (
      <div
        className="flex flex-col items-end mb-1 relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <div className="max-w-xs md:max-w-[260px] px-4 py-3 rounded-[20px] bg-messenger-customer-bg text-messenger-customer-text">
          {message.content}
        </div>
        {/* Timestamp has been removed but structure kept for future use */}
      </div>
    );
  }

  const isAI = message.sender === "ai";

  return (
    <div
      className="flex flex-col items-start mb-1 relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-xs md:max-w-[336px] px-4 py-3 rounded-[20px] bg-messenger-ai-bg text-messenger-ai-text">
        {showAvatar && (
          <div className="flex items-center gap-2 mb-2">
            {isAI ? <SmallAIAvatar /> : <SmallHumanAvatar />}
            <span className="text-sm font-semibold">
              {isAI ? "Fin" : "Kelly"}
            </span>
          </div>
        )}
        {message.content}
      </div>
      {/* Timestamp has been removed but structure kept for future use */}
    </div>
  );
};

export default Message;
