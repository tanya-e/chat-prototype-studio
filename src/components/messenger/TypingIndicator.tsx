
import React from "react";

interface TypingIndicatorProps {
  sender: "ai" | "human";
  name?: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ sender, name = "Fin" }) => {
  return (
    <div className="flex items-start space-x-2">
      <div className="px-4 py-3 rounded-2xl bg-messenger-ai-bg text-messenger-ai-text inline-block animate-fade-in">
        <div className="typing-indicator">
          <span className="animate-pulse-dots"></span>
          <span className="animate-pulse-dots"></span>
          <span className="animate-pulse-dots"></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
