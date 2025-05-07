
import React from "react";

interface TeamHandoverProps {
  message?: string;
}

const TeamHandover: React.FC<TeamHandoverProps> = ({ 
  message = "The team will get back to you." 
}) => {
  return (
    <div 
      className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-messenger-base rounded-[20px] animate-fade-in whitespace-nowrap"
      style={{ 
        border: "1px solid rgba(0, 0, 0, 0.05)",
        boxShadow: "0px 1px 2px 0px rgba(15, 15, 15, 0.06)",
        width: "272px"
      }}
    >
      <div 
        className="flex justify-end items-center flex-shrink-0" 
        style={{ width: "46px", height: "16px", aspectRatio: "46.32/16.00" }}
      >
        <div className="flex -space-x-2">
          <div className="w-6 h-6 rounded-full border-2 border-messenger-base bg-gray-200 z-30"></div>
          <div className="w-6 h-6 rounded-full border-2 border-messenger-base bg-gray-300 z-20"></div>
          <div className="w-6 h-6 rounded-full border-2 border-messenger-base bg-gray-100 z-10"></div>
        </div>
      </div>
      <span className="text-messenger-text-muted text-sm leading-[150%] truncate">
        {message}
      </span>
    </div>
  );
};

export default TeamHandover;
