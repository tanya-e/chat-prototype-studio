
import React, { useState, useEffect } from "react";
import MessageComposer from "../messenger/MessageComposer";
import AnimatedBranding from "../messenger/AnimatedBranding";
import { BrandingFlowType } from "@/types/branding-flows";

interface ComposerWithAnimatedBrandingProps {
  onSendMessage: (text: string) => void;
  flowType: BrandingFlowType;
  finReplied: boolean;
  userMessageSent: boolean;
}

const ComposerWithAnimatedBranding: React.FC<ComposerWithAnimatedBrandingProps> = ({ 
  onSendMessage,
  flowType,
  finReplied,
  userMessageSent
}) => {
  const [shouldAnimateComposer, setShouldAnimateComposer] = useState(false);
  
  // Trigger composer animation when branding disappears based on flow type
  useEffect(() => {
    if ((flowType === "onUserMessage" && userMessageSent) || 
        (flowType === "onFinReply" && finReplied) ||
        (flowType === "combo" && (userMessageSent || finReplied))) {
      setShouldAnimateComposer(true);
    }
  }, [flowType, finReplied, userMessageSent]);
  
  const handleSendMessage = (text: string) => {
    onSendMessage(text);
  };

  return (
    <div className="w-full" style={{ position: 'relative' }}>
      <MessageComposer 
        onSendMessage={handleSendMessage} 
        shouldAnimate={shouldAnimateComposer} 
      />
      <AnimatedBranding 
        flowType={flowType} 
        onFinReply={finReplied} 
        onUserMessage={userMessageSent} 
      />
    </div>
  );
};

export default ComposerWithAnimatedBranding;
