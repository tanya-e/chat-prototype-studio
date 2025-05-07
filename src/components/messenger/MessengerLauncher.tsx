
import React from "react";
import { trackEvent } from "@/utils/analytics";

interface MessengerLauncherProps {
  onClick: () => void;
}

const MessengerLauncher: React.FC<MessengerLauncherProps> = ({ onClick }) => {
  const handleClick = () => {
    trackEvent("launcher_clicked");
    onClick();
  };

  return (
    <button
      className="w-12 h-12 bg-gray-900 dark:bg-gray-100 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform duration-300"
      onClick={handleClick}
      aria-label="Open messenger"
    >
      <img 
        src="/lovable-uploads/5fa68c45-a1ea-4eb5-ae6a-f60290864d03.png" 
        alt="Chat icon" 
        className="w-5 h-5 scale-95 invert dark:invert-0"
      />
    </button>
  );
};

export default MessengerLauncher;
