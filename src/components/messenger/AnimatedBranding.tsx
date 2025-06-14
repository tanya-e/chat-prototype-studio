
import React, { useEffect, useState } from "react";
import { trackEvent } from "@/utils/analytics";
import { BrandingFlowType } from "@/types/branding-flows";

interface AnimatedBrandingProps {
  flowType: BrandingFlowType;
  onFinReply?: boolean;
  onUserMessage?: boolean;
}

const AnimatedBranding: React.FC<AnimatedBrandingProps> = ({ 
  flowType,
  onFinReply = false,
  onUserMessage = false
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    // Track when branding is displayed
    trackEvent("branding_displayed", { component: "PoweredByFin" });
    
    // Different logic based on flow type
    if (flowType === "onFinReply" && onFinReply) {
      // Add 300ms stagger delay for onFinReply flow type
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300); // Stagger by 300ms after Fin replies
      return () => clearTimeout(timer);
    } else if (flowType === "afterDelay") {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 4000); // Hide after 4 seconds regardless of user interaction
      return () => clearTimeout(timer);
    } else if (flowType === "onUserMessage" && onUserMessage) {
      setIsVisible(false);
    } else if (flowType === "combo") {
      if (onUserMessage || onFinReply) {
        setIsVisible(false);
      }
    }
  }, [flowType, onFinReply, onUserMessage]);

  const handleClick = () => {
    // Track when the branding is clicked
    trackEvent("branding_clicked", { component: "PoweredByFin" });
  };

  return (
    <div 
      className={`w-full flex justify-center items-center transition-all duration-300 ease-out ${
        isVisible 
          ? "opacity-100" 
          : "opacity-0 pointer-events-none"
      }`}
      style={{
        height: isVisible ? '22px' : '0px', // Exact height to avoid layout shift
        padding: isVisible ? "4px 0 8px" : "0",
        overflow: 'hidden',
        margin: 0,
        position: 'relative',
        transition: "height 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms cubic-bezier(0.4, 0, 0.2, 1), padding 300ms cubic-bezier(0.4, 0, 0.2, 1)"
      }}
    >
      <span
        onClick={handleClick}
        className="cursor-pointer"
        style={{
          color: "var(--messenger-text-muted-extra)",
          fontSize: "12px",
          fontWeight: 457,
          lineHeight: "100%",
          fontStyle: "normal",
        }}
      >
        Powered by Fin
      </span>
    </div>
  );
};

export default AnimatedBranding;
