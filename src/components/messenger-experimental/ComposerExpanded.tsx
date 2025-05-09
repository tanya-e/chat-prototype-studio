
import React, { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Smile, Gift, Paperclip, ArrowUp } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
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

  // Adjust height of textarea as user types
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height before calculating the new height
    textarea.style.height = "auto";
    
    // Calculate new height but cap it at approximately 10 lines
    // Assuming line-height of 20px, 10 lines would be ~200px + padding
    const maxHeight = 200; // approximately 10 lines
    const scrollHeight = textarea.scrollHeight;
    
    textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
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
    <div className="w-full mb-0">
      <div className="w-full composer-gradient backdrop-blur-sm">
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
              <Textarea
                ref={textareaRef}
                placeholder="Ask your question..."
                className={cn(
                  "w-full flex-1 bg-transparent border-none resize-none focus:outline-none text-[14px] font-normal leading-[20px] text-messenger-text-default placeholder:text-messenger-text-muted p-0 min-h-[20px] max-h-[200px]",
                  message.length > 0 ? "mb-2" : ""
                )}
                value={message}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onKeyDown={handleKeyDown}
                style={{
                  overflowY: textareaRef.current && textareaRef.current.scrollHeight > 200 ? 'auto' : 'hidden'
                }}
              />
              <div className="flex justify-between items-end w-full">
                <div className="flex items-center gap-4 pb-1">
                  <button type="button" className="text-messenger-icon-muted hover:text-messenger-text-default">
                    <Smile size={16} />
                  </button>
                  <button type="button" className="text-messenger-icon-muted hover:text-messenger-text-default">
                    <Gift size={16} />
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
