import React, { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Smile, Image, Paperclip, ArrowUp } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { trackEvent } from "@/utils/analytics";
import { cn } from "@/lib/utils";

interface ComposerExpandedProps {
  onSendMessage: (text: string) => void;
}

const ComposerExpanded: React.FC<ComposerExpandedProps> = ({
  onSendMessage
}) => {
  const [message, setMessage] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [hasText, setHasText] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize textarea height on component mount and adjust as text changes
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Force minimum styles with more aggressive approach
    textarea.style.cssText = `
      height: 16px !important;
      min-height: 16px !important;
      line-height: 16px !important;
      font-size: 14px !important;
      padding: 0 !important;
      margin: 0 !important;
      border: none !important;
      outline: none !important;
      background: transparent !important;
      resize: none !important;
      overflow-y: hidden !important;
    `;
    
    if (message) {
      // Reset height before calculating the new height
      textarea.style.height = "auto";
      
      // Calculate new height but cap it at approximately 10 lines
      const maxHeight = 200; // approximately 10 lines
      const scrollHeight = textarea.scrollHeight;
      
      textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
      textarea.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden';
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
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
    setIsFocused(true);
    trackEvent("composer_focused");
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const handleContainerClick = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };
  
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter key sends message, Shift+Enter adds line break
    if (e.key === 'Enter') {
      if (!e.shiftKey) {
        e.preventDefault();
        if (message.trim()) {
          handleSubmit(e);
        }
      }
      // Shift+Enter does nothing here, allowing default textarea behavior (new line)
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
    <div className="w-full mb-0 relative">
      <div className="w-full absolute bottom-0 left-0 right-0 composer-gradient">
        <form onSubmit={handleSubmit} className="w-full py-[16px]">
          <div 
            ref={containerRef}
            onClick={handleContainerClick}
            className={cn(
              "w-[360px] mx-auto px-[14px] py-[12px] pr-[8px] flex flex-col justify-between rounded-[22px] border bg-white shadow-[0px_0px_4px_0px_rgba(15,15,15,0.16)] transition-colors",
              isFocused 
                ? "border-messenger-composer-border" 
                : "border-[#F5F5F5]"
            )}
          >
            <div className="flex flex-col w-full">
              <textarea
                ref={textareaRef}
                placeholder="Ask your question..."
                className="w-full bg-transparent border-none resize-none text-[14px] font-normal text-messenger-text-default placeholder:text-messenger-text-muted focus:outline-none"
                value={message}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onKeyDown={handleKeyDown}
                rows={1}
              />
              
              <div className="flex justify-between items-end w-full mt-1">
                <div className="flex items-center gap-4">
                  <button type="button" className="text-messenger-icon-muted hover:text-messenger-text-default">
                    <Smile size={16} />
                  </button>
                  <button type="button" className="text-messenger-icon-muted hover:text-messenger-text-default">
                    <Image size={16} />
                  </button>
                  <button type="button" className="text-messenger-icon-muted hover:text-messenger-text-default">
                    <Paperclip size={16} />
                  </button>
                </div>
                <div className="flex items-center">
                  <button type={hasText ? "submit" : "button"} disabled={!hasText} className={`w-8 h-8 rounded-full flex items-center justify-center ${hasText ? 'bg-messenger-customer-bg' : 'bg-[#F5F5F5]'}`}>
                    <ArrowUp size={16} className={hasText ? 'text-messenger-customer-text' : 'text-messenger-icon-muted'} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComposerExpanded;
