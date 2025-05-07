
import React, { useEffect } from "react";
import { trackEvent } from "@/utils/analytics";

const PoweredByBranding: React.FC = () => {
  useEffect(() => {
    // Track when the branding is displayed
    trackEvent("branding_displayed", { component: "PoweredByFin" });
  }, []);
  
  const handleClick = () => {
    // Track when the branding is clicked
    trackEvent("branding_clicked", { component: "PoweredByFin" });
  };

  return (
    <div 
      className="w-full flex justify-center items-center"
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

export default PoweredByBranding;
