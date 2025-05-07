
import React from "react";
import { ArrowLeftIcon, EllipsisIcon, XIcon, AIAvatar, HumanAvatar, UnassignedAvatars } from "../icons/MessengerIcons";

export type HeaderStateType = "ai" | "unassigned" | "human";

interface MessengerHeaderProps {
  headerState: HeaderStateType;
}

const MessengerHeader: React.FC<MessengerHeaderProps> = ({ headerState }) => {
  return (
    <div className="flex items-center justify-between h-16 px-2 border-b border-messenger-border">
      <div className="flex items-center">
        <button className="p-4 text-messenger-icon-muted hover:bg-messenger-ai-bg rounded-xl">
          <ArrowLeftIcon className="w-4 h-4" />
        </button>
        
        <div className="flex items-center">
          <div className="ml-2 mr-2">
            {headerState === "ai" && <AIAvatar />}
            {headerState === "unassigned" && <UnassignedAvatars />}
            {headerState === "human" && <HumanAvatar />}
          </div>
          
          <span className="font-medium text-sm">Fin</span>
        </div>
      </div>
      
      <div className="flex items-center">
        <button className="p-4 text-messenger-icon-muted hover:bg-messenger-ai-bg rounded-xl">
          <EllipsisIcon className="w-4 h-4" />
        </button>
        <button className="p-4 text-messenger-icon-muted hover:bg-messenger-ai-bg rounded-xl">
          <XIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default MessengerHeader;
