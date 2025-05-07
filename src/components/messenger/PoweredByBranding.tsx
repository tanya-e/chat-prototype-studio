
import React from "react";

const PoweredByBranding: React.FC = () => {
  return (
    <div 
      className="w-full flex justify-center items-center"
      style={{
        padding: "4px 0 8px",
      }}
    >
      <span
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
