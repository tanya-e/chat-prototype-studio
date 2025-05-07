
import React, { useState, FormEvent } from "react";
import { Send, Smile, Paperclip, GIF } from "lucide-react";

interface MessageComposerProps {
  onSendMessage: (text: string) => void;
}

const MessageComposer: React.FC<MessageComposerProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
      setIsActive(false);
    }
  };

  const handleInputFocus = () => {
    setIsActive(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    if (e.target.value) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  return (
    <div className="sticky bottom-0 w-full bg-gradient-to-b from-transparent via-messenger-base to-messenger-base px-3 py-3 border-t border-messenger-border">
      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="flex-1 mx-2">
          <div 
            className={`flex items-center px-4 py-2 justify-between w-full h-12 rounded-full ${
              isActive 
                ? "border-[1.5px] border-messenger-customer-bg" 
                : "border border-messenger-composer-border"
            } bg-white shadow-sm`}
            style={{
              boxShadow: "0px 0px 4px 0px rgba(15, 15, 15, 0.16)"
            }}
          >
            <input
              type="text"
              placeholder="Ask your question..."
              className="flex-1 bg-transparent border-none focus:outline-none text-sm text-messenger-text-default font-['SF_Pro'] text-[14px] font-normal leading-[20px]"
              value={message}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            
            <div className="flex items-center justify-end gap-4">
              <button
                type="button"
                className="p-1 text-messenger-icon-muted hover:text-messenger-text-default"
              >
                <Smile size={16} />
              </button>
              
              {!isActive && (
                <>
                  <button
                    type="button"
                    className="p-1 text-messenger-icon-muted hover:text-messenger-text-default"
                  >
                    <GIF size={16} />
                  </button>
                  
                  <button
                    type="button"
                    className="p-1 text-messenger-icon-muted hover:text-messenger-text-default"
                  >
                    <Paperclip size={16} />
                  </button>
                </>
              )}
              
              {isActive && message.trim() && (
                <button
                  type="submit"
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-messenger-customer-bg"
                >
                  <Send size={16} className="text-messenger-customer-text" />
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MessageComposer;
