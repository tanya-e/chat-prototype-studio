
import React, { useState, FormEvent } from "react";
import { Send, Smile, Paperclip, Image } from "lucide-react";

interface MessageComposerProps {
  onSendMessage: (text: string) => void;
}

const MessageComposer: React.FC<MessageComposerProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [hasText, setHasText] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
      setIsActive(false);
      setHasText(false);
    }
  };

  const handleInputFocus = () => {
    setIsActive(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    setHasText(e.target.value.trim() !== "");
  };

  return (
    <div className="sticky bottom-0 w-full bg-gradient-to-b from-transparent via-messenger-base to-messenger-base px-3 py-3 border-messenger-border">
      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="flex-1 mx-2">
          <div 
            className={`flex items-center justify-between w-full h-12 rounded-full ${
              isActive 
                ? "border-[1.5px] border-messenger-customer-bg" 
                : "border border-messenger-composer-border"
            } bg-messenger-input-base shadow-sm`}
            style={{
              boxShadow: "0px 0px 4px 0px rgba(15, 15, 15, 0.16)",
              padding: isActive && hasText ? "8px 8px 8px 16px" : isActive ? "8px 16px" : "8px 16px"
            }}
          >
            <input
              type="text"
              placeholder="Ask your question..."
              className="flex-1 bg-transparent border-none focus:outline-none text-sm text-messenger-text-default font-['SF_Pro'] text-[14px] font-normal leading-[20px]"
              value={message}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              style={{
                "::placeholder": {
                  color: "var(--messenger-text-muted-extra)"
                }
              }}
            />
            
            <style jsx>{`
              input::placeholder {
                color: var(--messenger-text-muted-extra);
              }
            `}</style>
            
            <div className="flex items-center justify-end gap-4">
              <button
                type="button"
                className="p-1 text-messenger-icon-muted hover:text-messenger-text-default"
              >
                <Smile size={16} />
              </button>
              
              {!hasText && (
                <>
                  <button
                    type="button"
                    className="p-1 text-messenger-icon-muted hover:text-messenger-text-default"
                  >
                    <Image size={16} />
                  </button>
                  
                  <button
                    type="button"
                    className="p-1 text-messenger-icon-muted hover:text-messenger-text-default"
                  >
                    <Paperclip size={16} />
                  </button>
                </>
              )}
              
              {hasText && (
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
