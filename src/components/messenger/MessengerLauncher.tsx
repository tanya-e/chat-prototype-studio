
import React from "react";
import { Smile } from "lucide-react";
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
      className="w-12 h-12 bg-[#5E6AD2] rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300"
      onClick={handleClick}
      aria-label="Open messenger"
    >
      <Smile className="w-6 h-6 text-white" />
    </button>
  );
};

export default MessengerLauncher;
