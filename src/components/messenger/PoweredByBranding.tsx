
import React from "react";

const PoweredByBranding: React.FC = () => {
  return (
    <div 
      className="w-full flex justify-center items-center py-2"
      style={{
        padding: "8px 0",
      }}
    >
      <span
        style={{
          color: "var(--messenger-text-muted)",
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
