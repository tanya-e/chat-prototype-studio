
import React from "react";
import { ArrowLeft, MoreHorizontal, ChevronLeft, X } from "lucide-react";
import { AIAvatar, HumanAvatar, UnassignedAvatars } from "../icons/MessengerIcons";
import { trackEvent } from "@/utils/analytics";

export type HeaderStateType = "ai" | "unassigned" | "human";

interface MessengerHeaderProps {
  headerState: HeaderStateType;
  onClose?: () => void;
}

const MessengerHeader: React.FC<MessengerHeaderProps> = ({ headerState, onClose }) => {
  const handleClose = () => {
    if (onClose) {
      trackEvent("messenger_close_clicked");
      onClose();
    }
  };

  return (
    <div className="flex items-center justify-between h-16 px-2 border-b border-messenger-border">
      <div className="flex items-center">
        <button className="flex items-center justify-center p-4 text-messenger-icon-muted hover:bg-messenger-ai-bg rounded-xl">
          <ChevronLeft size={16} />
        </button>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            {headerState === "ai" && <AIAvatar />}
            {headerState === "unassigned" && <UnassignedAvatars />}
            {headerState === "human" && (
              <div className="relative">
                <HumanAvatar />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></span>
              </div>
            )}
          </div>
          
          <div className="flex flex-col">
            <span className="font-medium text-sm">
              {headerState === "ai" && "Fin"}
              {headerState === "unassigned" && "Intercom"}
              {headerState === "human" && "Kelly"}
            </span>
            {/* Removed "The team can also help" text */}
          </div>
        </div>
      </div>
      
      <div className="flex items-center">
        <button className="flex items-center justify-center p-4 text-messenger-icon-muted hover:bg-messenger-ai-bg rounded-xl">
          <MoreHorizontal size={16} />
        </button>
        {/* Removed Expand button */}
        {onClose && (
          <button 
            className="flex items-center justify-center p-4 text-messenger-icon-muted hover:bg-messenger-ai-bg rounded-xl"
            onClick={handleClose}
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default MessengerHeader;
