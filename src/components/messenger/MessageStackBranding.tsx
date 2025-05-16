
import React, { useEffect, useState } from "react";
import { trackEvent } from "@/utils/analytics";

interface MessageStackBrandingProps {
  userMessageSent: boolean;
}

const MessageStackBranding: React.FC<MessageStackBrandingProps> = ({ 
  userMessageSent
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    // Track when branding is displayed
    trackEvent("branding_displayed", { component: "PoweredByFinMessageStack" });
    
    // Hide when user sends a message
    if (userMessageSent) {
      setIsVisible(false);
    }
  }, [userMessageSent]);

  const handleClick = () => {
    // Track when the branding is clicked
    trackEvent("branding_clicked", { component: "PoweredByFinMessageStack" });
  };

  if (!isVisible) return null;

  return (
    <div 
      className="w-full flex items-center justify-center mb-4 transition-all duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
        height: isVisible ? 'auto' : 0,
        overflow: 'hidden',
      }}
    >
      <div 
        className="inline-flex items-center justify-center rounded-full bg-white/10 px-3 py-1 text-xs"
        style={{
          color: "var(--messenger-text-muted-extra)",
        }}
      >
        <span
          onClick={handleClick}
          className="cursor-pointer font-medium"
        >
          Powered by Fin
        </span>
      </div>
    </div>
  );
};

export default MessageStackBranding;
