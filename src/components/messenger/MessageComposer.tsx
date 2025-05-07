
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
        <button
          type="button"
          className="p-2 rounded-full text-messenger-icon-muted hover:bg-messenger-ai-bg"
        >
          <PaperclipIcon className="w-5 h-5" />
        </button>
        
        <div className="flex-1 mx-2">
          <input
            type="text"
            placeholder="Message"
            className="w-full px-4 py-2 rounded-2xl border border-messenger-composer-border bg-messenger-ai-bg text-messenger-text-default focus:outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        
        <button
          type="button"
          className="p-2 rounded-full text-messenger-icon-muted hover:bg-messenger-ai-bg"
        >
          <MicIcon className="w-5 h-5" />
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
          <SendIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default MessageComposer;
