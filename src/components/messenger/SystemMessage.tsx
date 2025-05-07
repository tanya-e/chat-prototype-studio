
import React from "react";

interface SystemMessageProps {
  message: string;
  timestamp?: Date;
}

const SystemMessage: React.FC<SystemMessageProps> = ({ message, timestamp }) => {
  const formattedTime = timestamp
    ? timestamp.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div className="flex justify-center my-4">
      <div className="text-xs text-messenger-text-muted bg-messenger-base px-4 py-1 rounded-full animate-fade-in">
        {message} {timestamp && `• ${formattedTime}`}
      </div>
    </div>
  );
};

export default SystemMessage;
