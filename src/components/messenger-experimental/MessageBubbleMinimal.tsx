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
      className={`flex flex-col w-[368px] justify-center ${isUser ? 'items-end mb-[22px]' : 'items-start mb-[6px]'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`max-w-[320px] p-4 flex flex-col items-start gap-2 rounded-[20px] ${isUser ? 'bg-messenger-customer-bg text-messenger-customer-text' : 'bg-[#F5F5F5] text-messenger-text-default'}`}>
        {message.content}
      </div>
      {/* Metadata for AI and human senders, shown on hover only */}
      {!isUser && (
        <div
          style={{
            color: "var(--Text-Text-muted-extra, #A3A3A3)",
            fontFamily: 'SF Pro Text',
            fontSize: 11,
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
            letterSpacing: '0.072px',
            marginTop: 4,
            marginLeft: 16,
            minHeight: 16, // Reserve space for metadata
            transition: 'opacity 0.2s',
            opacity: showDetails ? 1 : 0,
          }}
          className="flex gap-2"
        >
          <span>{senderName}</span>
          <span>•</span>
          <span>{formattedTime}</span>
        </div>
      )}
    </div>
  );
};

export default MessageBubbleMinimal;
