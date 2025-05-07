
import React from "react";
import { ArrowLeft, MoreHorizontal, X } from "lucide-react";
import { AIAvatar, HumanAvatar, UnassignedAvatars } from "../icons/MessengerIcons";

export type HeaderStateType = "ai" | "unassigned" | "human";

interface MessengerHeaderProps {
  headerState: HeaderStateType;
}

const MessengerHeader: React.FC<MessengerHeaderProps> = ({ headerState }) => {
  return (
    <div className="flex items-center justify-between h-16 px-2 border-b border-messenger-border">
      <div className="flex items-center">
        <button className="p-4 text-messenger-icon-muted hover:bg-messenger-ai-bg rounded-xl">
          <ArrowLeft size={16} />
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
          <MoreHorizontal size={16} />
        </button>
        <button className="p-4 text-messenger-icon-muted hover:bg-messenger-ai-bg rounded-xl">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default MessengerHeader;
