import React, { useState, useRef, useEffect, KeyboardEvent } from "react";
import { ArrowUp } from "lucide-react";
import { SmileIcon, GifIcon, AttachmentIcon } from "../icons/MessengerIcons";
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
      {/* Gradient background matching Figma */}
      <div className="w-full absolute bottom-0 left-0 right-0 composer-gradient h-[101px]">
        <div className="flex flex-col justify-end items-center h-full py-4 px-4">
          {/* Main composer container */}
          <form onSubmit={handleSubmit} className="w-full max-w-[360px]">
            <div
              ref={containerRef}
              onClick={handleContainerClick}
              className={cn(
                "w-full flex flex-col justify-between rounded-[22px] border-[1.5px] bg-messenger-input-base shadow-[0px_0px_4px_0px_rgba(15,15,15,0.16)] transition-colors",
                isFocused
                  ? "border-messenger-composer-border"
                  : "border-messenger-border"
              )}
              style={{
                paddingTop: '11px',
                paddingRight: '8px',
                paddingBottom: '8px',
                paddingLeft: '16px'
              }}
            >
              <div className="flex flex-col w-full gap-0.5">
                <textarea
                  ref={textareaRef}
                  placeholder="Ask your question..."
                  className="w-full bg-transparent border-none resize-none text-[14px] font-normal text-messenger-text-default placeholder:text-messenger-text-muted focus:outline-none"
                  style={{
                    fontFamily: 'SF Pro Text', // Same as message bubbles
                    fontSize: '14px', // Same as message bubbles
                    fontWeight: 400, // Same as message bubbles
                    lineHeight: '1.5em' // Same as message bubbles (21px at 14px font)
                  }}
                  value={message}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  onKeyDown={handleKeyDown}
                  rows={1}
                />

                <div className="flex justify-between items-end w-full" style={{ gap: '28px' }}>
                  <div className="flex items-center gap-4 pb-0.5">
                    <button type="button" className="text-messenger-text-muted-extra hover:text-messenger-text-default transition-colors">
                      <SmileIcon />
                    </button>
                    <button type="button" className="text-messenger-text-muted-extra hover:text-messenger-text-default transition-colors">
                      <GifIcon />
                    </button>
                    <button type="button" className="text-messenger-text-muted-extra hover:text-messenger-text-default transition-colors">
                      <AttachmentIcon />
                    </button>
                  </div>

                  {/* Send button inside composer like in Figma */}
                  <button
                    type={hasText ? "submit" : "button"}
                    disabled={!hasText}
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center transition-colors flex-shrink-0",
                      hasText
                        ? 'bg-messenger-customer-bg hover:bg-messenger-customer-bg/90'
                        : 'bg-messenger-send-button-disabled'
                    )}
                  >
                    <ArrowUp size={16} className={hasText ? 'text-messenger-customer-text' : 'text-messenger-send-button-disabled-text'} />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ComposerExpanded;
