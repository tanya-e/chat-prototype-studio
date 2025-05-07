
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import MessengerHeader from "./MessengerHeader";
import { AIAvatar } from "../icons/MessengerIcons";
import PoweredByBranding from "./PoweredByBranding";

type LoadingStateType = "toMessages" | "toConversation";

interface MessengerLoadingStateProps {
  type: LoadingStateType;
}

const MessengerLoadingState: React.FC<MessengerLoadingStateProps> = ({ type }) => {
  return (
    <div className="flex flex-col h-full bg-messenger-base overflow-hidden">
      {type === "toMessages" ? (
        // Loading state when transitioning to All Messages view
        <>
          <div className="flex items-center justify-between h-16 px-5 border-b border-messenger-border">
            <h1 className="text-lg font-semibold">Messages</h1>
            <div className="w-8 h-8"></div> {/* Spacer for layout consistency */}
          </div>

          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-20 h-20 mb-4">
              <img 
                src="/lovable-uploads/52203891-a6f1-403f-a565-ac1ecd6fbb01.png" 
                alt="Intercom Logo" 
                className="w-full h-full opacity-30"
              />
            </div>
          </div>

          <div className="mt-auto">
            <PoweredByBranding />
          </div>

          <div className="flex h-14 border-t border-messenger-border">
            <button className="flex-1 flex items-center justify-center text-messenger-text-muted">
              Home
            </button>
            <button className="flex-1 flex items-center justify-center text-messenger-text-default font-medium bg-messenger-ai-bg border-t-2 border-messenger-customer-bg">
              Messages
            </button>
            <button className="flex-1 flex items-center justify-center text-messenger-text-muted">
              Help
            </button>
          </div>
        </>
      ) : (
        // Loading state when transitioning to a conversation
        <>
          <MessengerHeader 
            headerState="ai" 
            onClose={undefined}
            onBack={undefined}
            subtitle="The team can also help" 
          />
          
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-20 h-20 mb-4">
              <img 
                src="/lovable-uploads/52203891-a6f1-403f-a565-ac1ecd6fbb01.png" 
                alt="Intercom Logo" 
                className="w-full h-full opacity-30"
              />
            </div>
          </div>
          
          <div className="mt-auto pb-4">
            <PoweredByBranding />
          </div>
        </>
      )}
    </div>
  );
};

export default MessengerLoadingState;
