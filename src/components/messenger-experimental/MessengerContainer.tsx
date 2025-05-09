
import React, { useState } from "react";
import MessengerLauncher from "../messenger/MessengerLauncher";
import { trackEvent } from "@/utils/analytics";
import { BrandingFlowType } from "@/types/branding-flows";
import { ConversationsProvider } from "@/context/ConversationsContext";
import MessengerExperimental from "./MessengerExperimental";

interface MessengerContainerProps {
  flowType?: BrandingFlowType;
  variant?: "classic" | "experimental";
}

const MessengerContainer: React.FC<MessengerContainerProps> = ({ 
  flowType = "onUserMessage",
  variant = "classic"
}) => {
  const [isMessengerOpen, setIsMessengerOpen] = useState(false);

  const openMessenger = () => {
    setIsMessengerOpen(true);
    trackEvent("messenger_opened");
  };

  const closeMessenger = () => {
    setIsMessengerOpen(false);
    trackEvent("messenger_closed");
  };

  return (
    <ConversationsProvider>
      <div className="fixed bottom-4 right-4 flex flex-col items-end justify-end gap-2 z-50">
        {isMessengerOpen ? (
          <div 
            className="animate-messenger-open w-[400px] h-[95vh] max-h-[95vh] rounded-2xl overflow-hidden origin-bottom-right"
            style={{ boxShadow: "0px 5px 40px rgba(0, 0, 0, 0.2)" }}
          >
            <MessengerExperimental 
              onClose={closeMessenger} 
              flowType={flowType} 
              variant={variant} 
            />
          </div>
        ) : (
          <MessengerLauncher onClick={openMessenger} />
        )}
      </div>
    </ConversationsProvider>
  );
};

export default MessengerContainer;
