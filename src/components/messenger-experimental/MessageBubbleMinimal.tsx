
import React, { useState, useRef, useEffect } from "react";
import { MessageType } from "../messenger/Message";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface MessageBubbleMinimalProps {
  message: MessageType;
}

const MessageBubbleMinimal: React.FC<MessageBubbleMinimalProps> = ({ message }) => {
  const [showDetails, setShowDetails] = useState(false);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isUser = message.sender === "user";
  const senderName = message.sender === "ai" ? "Fin" : message.sender === "human" ? "Kelly" : "You";
  const formattedTime = message.timestamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleMouseEnter = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    hoverTimerRef.current = setTimeout(() => {
      setShowDetails(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setShowDetails(false);
  };

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  return (
    <div 
      className={`flex flex-col w-[368px] justify-center ${isUser ? 'items-end' : 'items-start'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`max-w-[320px] p-4 flex flex-col items-start gap-2 rounded-[20px] ${isUser ? 'bg-messenger-customer-bg text-messenger-customer-text' : 'bg-[#F5F5F5] text-messenger-text-default'}`}>
        {message.content}
      </div>

      {/* Message details container with negative margin to account for proper spacing */}
      <div className={`flex px-4 pt-[3px] items-center gap-2 w-full ${isUser ? 'justify-end' : 'justify-start'} h-[16px] -mb-4`}>
        {showDetails && (
          <>
            <span className="text-[#A3A3A3] text-[12px] font-normal">{senderName}</span>
            <span className="text-[#A3A3A3] text-[12px] font-normal">{formattedTime}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default MessageBubbleMinimal;
