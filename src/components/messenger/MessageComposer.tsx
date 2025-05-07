
import React, { useState, FormEvent, useEffect } from "react";
import { ArrowUp, Smile, Paperclip, Image } from "lucide-react";
import { trackEvent } from "@/utils/analytics";

interface MessageComposerProps {
  onSendMessage: (text: string) => void;
  shouldAnimate?: boolean;
}

const MessageComposer: React.FC<MessageComposerProps> = ({
  onSendMessage,
  shouldAnimate = false
}) => {
  const [message, setMessage] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [hasText, setHasText] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Track when the composer is displayed
    trackEvent("composer_displayed");
  }, []);

  // Handle animation state when branding disappears
  useEffect(() => {
    if (shouldAnimate) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300); // Match the duration of the branding fade-out
      return () => clearTimeout(timer);
    }
  }, [shouldAnimate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
      setIsActive(false);
      setHasText(false);
      
      // Track message sent event
      trackEvent("message_sent", { 
        messageLength: message.length,
        containsQuestion: message.includes('?')
      });
    }
  };

  const handleInputFocus = () => {
    setIsActive(true);
    
    // Track when the input is focused
    trackEvent("composer_focused");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    setMessage(newValue);
    
    const hasContent = newValue.trim() !== "";
    setHasText(hasContent);
    
    // Track when the user starts typing (if they weren't already)
    if (hasContent && !hasText) {
      trackEvent("composer_typing_started");
    } else if (!hasContent && hasText) {
      trackEvent("composer_cleared");
    }
  };

  return (
    <div 
      className="sticky bottom-0 w-full bg-gradient-to-b from-transparent via-messenger-base to-messenger-base px-3 border-messenger-border transition-all duration-300 ease-out"
      style={{
        paddingTop: "3px", 
        paddingBottom: isAnimating ? "16px" : "3px" // Adjusted to 16px for better spacing
      }}
    >
      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="flex-1 mx-2">
          <div className={`flex items-center justify-between w-full h-12 rounded-full ${isActive ? "border-[1.5px] border-messenger-customer-bg" : "border border-messenger-composer-border"} bg-messenger-input-base shadow-sm`} style={{
          boxShadow: "0px 0px 4px 0px rgba(15, 15, 15, 0.16)",
          padding: isActive && hasText ? "8px 8px 8px 16px" : isActive ? "8px 16px" : "8px 16px"
        }}>
            <input 
              type="text" 
              placeholder="Ask your question..." 
              className="flex-1 bg-transparent border-none focus:outline-none text-sm text-messenger-text-default font-['SF_Pro'] text-[14px] font-normal leading-[20px] placeholder:text-messenger-text-muted-extra" 
              value={message} 
              onChange={handleInputChange} 
              onFocus={handleInputFocus} 
            />
            
            <div className="flex items-center justify-end gap-4">
              <button type="button" className="p-1 text-messenger-icon-muted hover:text-messenger-text-default">
                <Smile size={16} />
              </button>
              
              {!hasText && <>
                  <button type="button" className="p-1 text-messenger-icon-muted hover:text-messenger-text-default">
                    <Image size={16} />
                  </button>
                  
                  <button type="button" className="p-1 text-messenger-icon-muted hover:text-messenger-text-default">
                    <Paperclip size={16} />
                  </button>
                </>}
              
              {hasText && <button type="submit" className="flex items-center justify-center w-8 h-8 rounded-full bg-messenger-customer-bg">
                  <ArrowUp size={16} className="text-messenger-customer-text" />
                </button>}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MessageComposer;
