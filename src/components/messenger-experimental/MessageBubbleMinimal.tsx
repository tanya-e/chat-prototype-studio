
import React, { useState, useRef, useEffect } from "react";
import { MessageType } from "../messenger/Message";

interface MessageBubbleMinimalProps {
  message: MessageType;
}

const MessageBubbleMinimal: React.FC<MessageBubbleMinimalProps> = ({ message }) => {
  const [showTimestamp, setShowTimestamp] = useState(false);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isUser = message.sender === "user";
  const senderName = message.sender === "ai" ? "Fin" : message.sender === "human" ? "Kelly" : "";
  const formattedTime = message.timestamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleMouseEnter = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    hoverTimerRef.current = setTimeout(() => {
      setShowTimestamp(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setShowTimestamp(false);
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
      className="flex flex-col w-[368px] justify-center items-start"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`max-w-[320px] p-4 flex flex-col items-start gap-2 rounded-[20px] ${isUser ? 'bg-messenger-customer-bg text-messenger-customer-text self-end' : 'bg-[#F5F5F5] text-messenger-text-default'}`}>
        {message.content}
      </div>

      {!isUser && (
        <div className="flex px-4 pt-[3px] items-center gap-2 w-full">
          <span className="text-[#A3A3A3] text-[12px] font-normal">{senderName}</span>
          {showTimestamp && (
            <span className="text-[#A3A3A3] text-[12px] font-normal">{formattedTime}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default MessageBubbleMinimal;
