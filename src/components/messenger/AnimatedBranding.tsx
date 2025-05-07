
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
      setIsVisible(false);
    } else if (flowType === "afterDelay") {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 4000);
      return () => clearTimeout(timer);
    } else if (flowType === "onUserMessage" && onUserMessage) {
      setIsVisible(false);
    } else if (flowType === "combo") {
      if (onUserMessage || (onFinReply && setTimeout(() => setIsVisible(false), 4000))) {
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
      className={`w-full flex justify-center items-center transition-all duration-300 ease-in ${
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-1.5 pointer-events-none"
      }`}
      style={{
        padding: "4px 0 8px",
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
