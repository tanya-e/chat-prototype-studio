
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
      className="w-12 h-12 bg-[#5E6AD2] rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300"
      onClick={handleClick}
      aria-label="Open messenger"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 4C6.48 4 2 8.48 2 14C2 16.4714 2.95392 18.7291 4.5 20.4L3.73 22.3286C3.62902 22.5759 3.64369 22.8577 3.77137 23.0892C3.89905 23.3208 4.1227 23.4784 4.38 23.52C4.5 23.54 4.62 23.54 4.74 23.51L8.39 22.46C9.5 22.8228 10.724 23 12 23C17.52 23 22 18.52 22 13C22 7.48 17.52 4 12 4Z"
          fill="white"
        />
      </svg>
    </button>
  );
};

export default MessengerLauncher;
