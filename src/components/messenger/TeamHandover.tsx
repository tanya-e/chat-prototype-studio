
import React from "react";

interface TeamHandoverProps {
  message?: string;
}

const TeamHandover: React.FC<TeamHandoverProps> = ({ 
  message = "The team will get back to you." 
}) => {
  return (
    <div className="flex justify-center my-4">
      <div 
        className="flex items-center gap-2 px-3 py-2.5 bg-messenger-base border border-messenger-border rounded-lg animate-fade-in"
        style={{ width: "272px" }}
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
        <span className="text-messenger-text-muted text-sm leading-[150%]">
          {message}
        </span>
      </div>
    </div>
  );
};

export default TeamHandover;
