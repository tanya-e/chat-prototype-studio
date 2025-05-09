
import React from "react";
import { ChevronLeft, MoreHorizontal, X } from "lucide-react";
import { AIAvatar, HumanAvatar, UnassignedAvatars } from "../icons/MessengerIcons";
import { trackEvent } from "@/utils/analytics";
import { HeaderStateType } from "../messenger/MessengerHeader";

interface NavBarMinimalProps {
  headerState: HeaderStateType;
  onClose?: () => void;
  onBack?: () => void;
}

const NavBarMinimal: React.FC<NavBarMinimalProps> = ({ headerState, onClose, onBack }) => {
  const handleClose = () => {
    if (onClose) {
      trackEvent("messenger_close_clicked");
      onClose();
    }
  };

  const handleBack = () => {
    if (onBack) {
      trackEvent("messenger_back_clicked");
      onBack();
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0 flex w-full px-4 py-3 justify-between items-center navbar-custom-gradient z-10">
      {/* Back button */}
      <button 
        className="flex p-2 items-center gap-2 rounded-full bg-white/80 shadow-[0px_1px_2px_0px_rgba(15,15,15,0.06)] dark:bg-gray-800/80"
        onClick={handleBack}
      >
        <ChevronLeft size={20} className="text-messenger-icon-muted" />
      </button>

      {/* Center avatar - using absolute positioning for true center */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {headerState === "ai" && (
          <div className="flex w-8 h-8">
            <AIAvatar />
          </div>
        )}
        {headerState === "unassigned" && (
          <UnassignedAvatars />
        )}
        {headerState === "human" && (
          <div className="relative w-8 h-8">
            <HumanAvatar />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></span>
          </div>
        )}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <button className="flex p-2 items-center gap-2 rounded-full bg-white/80 shadow-[0px_1px_2px_0px_rgba(15,15,15,0.06)] dark:bg-gray-800/80">
          <MoreHorizontal size={20} className="text-messenger-icon-muted" />
        </button>
        {onClose && (
          <button 
            className="flex p-2 items-center gap-2 rounded-full bg-white/80 shadow-[0px_1px_2px_0px_rgba(15,15,15,0.06)] dark:bg-gray-800/80"
            onClick={handleClose}
          >
            <X size={20} className="text-messenger-icon-muted" />
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBarMinimal;
