import React, { useState } from "react";
import { Smile, Gift, Paperclip, ArrowUp } from "lucide-react";
import { trackEvent } from "@/utils/analytics";
interface ComposerExpandedProps {
  onSendMessage: (text: string) => void;
}
const ComposerExpanded: React.FC<ComposerExpandedProps> = ({
  onSendMessage
}) => {
  const [message, setMessage] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [hasText, setHasText] = useState(false);
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
  return <div className="w-full mb-0">
      <div className="w-full bg-gradient-to-t from-messenger-base/95 via-messenger-base/80 to-transparent">
        <form onSubmit={handleSubmit} className="w-full py-[16px]">
          <div className="w-[360px] mx-auto px-[14px] py-[12px] pr-[8px] flex justify-between items-start rounded-[22px] border border-[#F5F5F5] bg-white shadow-[0px_0px_4px_0px_rgba(15,15,15,0.16)]">
            <div className="flex flex-col items-start gap-2 flex-1">
              <input type="text" placeholder="Ask your question..." className="w-full flex-1 bg-transparent border-none focus:outline-none text-[14px] font-normal leading-[20px] text-messenger-text-default placeholder:text-messenger-text-muted" value={message} onChange={handleInputChange} onFocus={handleInputFocus} />
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
    </div>;
};
export default ComposerExpanded;