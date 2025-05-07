
import React, { useState, FormEvent } from "react";
import { PaperclipIcon, SendIcon, MicIcon } from "../icons/MessengerIcons";

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
              className="flex-1 bg-transparent border-none focus:outline-none text-sm"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            
            <div className="flex items-center">
              <button
                type="button"
                className="p-1 text-messenger-icon-muted hover:text-messenger-text-default"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8.5 12.5C8.5 13.3284 7.82843 14 7 14C6.17157 14 5.5 13.3284 5.5 12.5C5.5 11.6716 6.17157 11 7 11C7.82843 11 8.5 11.6716 8.5 12.5Z" fill="currentColor"/>
                  <path d="M14 12.5C14 13.3284 13.3284 14 12.5 14C11.6716 14 11 13.3284 11 12.5C11 11.6716 11.6716 11 12.5 11C13.3284 11 14 11.6716 14 12.5Z" fill="currentColor"/>
                  <path d="M19.5 12.5C19.5 13.3284 18.8284 14 18 14C17.1716 14 16.5 13.3284 16.5 12.5C16.5 11.6716 17.1716 11 18 11C18.8284 11 19.5 11.6716 19.5 12.5Z" fill="currentColor"/>
                </svg>
              </button>
              
              <button
                type="submit"
                disabled={!message.trim()}
                className={`p-2 rounded-full ml-1 ${
                  message.trim()
                    ? "text-white bg-blue-500 hover:bg-blue-600"
                    : "text-messenger-icon-muted"
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MessageComposer;
