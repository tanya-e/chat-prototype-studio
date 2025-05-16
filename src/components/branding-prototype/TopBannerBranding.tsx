
import React, { useEffect, useState } from "react";
import { trackEvent } from "@/utils/analytics";

interface TopBannerBrandingProps {
  onUserMessage: boolean;
}

const TopBannerBranding: React.FC<TopBannerBrandingProps> = ({ onUserMessage }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);
  
  useEffect(() => {
    // Track when branding is displayed
    trackEvent("branding_displayed", { component: "PoweredByFinAi" });
    
    // Trigger animation in after mount
    const timer = setTimeout(() => {
      setHasAnimatedIn(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Hide when user sends a message
    if (onUserMessage) {
      setIsVisible(false);
    }
  }, [onUserMessage]);

  const handleClick = () => {
    // Track when the branding is clicked
    trackEvent("branding_clicked", { component: "PoweredByFinAi" });
  };

  return (
    <div 
      className={`w-full flex justify-center items-center transition-all duration-500 ease-out ${
        isVisible 
          ? "opacity-100 transform translate-y-0" 
          : "opacity-0 transform -translate-y-12 pointer-events-none"
      }`}
      style={{
        height: isVisible ? 'auto' : '0px',
        overflow: 'hidden',
        margin: '6px 0 8px',
        paddingTop: '4px',
        transition: "transform 500ms cubic-bezier(0.4, 0, 0.2, 1), opacity 500ms cubic-bezier(0.4, 0, 0.2, 1), height 500ms cubic-bezier(0.4, 0, 0.2, 1)"
      }}
    >
      <div
        onClick={handleClick}
        className={`cursor-pointer transition-all duration-300 ease-out ${
          hasAnimatedIn ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-2"
        }`}
      >
        <img 
          src="/lovable-uploads/96794479-fde1-43c9-a555-d70ba09c1430.png" 
          alt="Powered by Fin.ai" 
          className="h-5" 
        />
      </div>
    </div>
  );
};

export default TopBannerBranding;
