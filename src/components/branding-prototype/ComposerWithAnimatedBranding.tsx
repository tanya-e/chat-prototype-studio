
import React from "react";
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
  return (
    <div className="w-full">
      <MessageComposer onSendMessage={onSendMessage} />
      <AnimatedBranding 
        flowType={flowType} 
        onFinReply={finReplied} 
        onUserMessage={userMessageSent} 
      />
    </div>
  );
};

export default ComposerWithAnimatedBranding;
