
import React, { useState, FormEvent } from "react";
import { Send, MoreHorizontal } from "lucide-react";

interface MessageComposerProps {
  onSendMessage: (text: string) => void;
}

const MessageComposer: React.FC<MessageComposerProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="sticky bottom-0 w-full bg-gradient-to-b from-transparent via-messenger-base to-messenger-base px-3 py-3 border-t border-messenger-border">
      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="flex-1 mx-2">
          <div className="flex items-center px-4 py-2 rounded-full border border-messenger-composer-border bg-messenger-ai-bg text-messenger-text-default">
            <input
              type="text"
              placeholder="Ask your question..."
              className="flex-1 bg-transparent border-none focus:outline-none text-sm text-messenger-text-muted font-['SF_Pro'] text-[14px] font-normal leading-[20px]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            
            <div className="flex items-center">
              <button
                type="button"
                className="p-1 text-messenger-icon-muted hover:text-messenger-text-default"
              >
                <MoreHorizontal size={20} />
              </button>
              
              <button
                type="submit"
                disabled={!message.trim()}
                className={`flex items-center justify-center w-8 h-8 rounded-full ml-1 ${
                  message.trim()
                    ? "bg-messenger-customer-bg"
                    : "text-messenger-icon-muted"
                }`}
              >
                <Send size={16} className={message.trim() ? "text-messenger-text-default" : ""} />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MessageComposer;
