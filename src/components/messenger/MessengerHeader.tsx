
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
        
        <div className="ml-2">
          {headerState === "ai" && <AIAvatar />}
          {headerState === "unassigned" && <UnassignedAvatars />}
          {headerState === "human" && <HumanAvatar />}
        </div>
        
        {headerState === "human" && (
          <div className="ml-2 flex flex-col items-start">
            <span className="text-sm font-medium">Kelly</span>
            <span className="text-xs text-messenger-text-muted">Support Agent</span>
          </div>
        )}
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
