
import React from "react";
import MessageComposer from "./MessageComposer";
import PoweredByBranding from "./PoweredByBranding";

interface ComposerWithBrandingProps {
  onSendMessage: (text: string) => void;
}

const ComposerWithBranding: React.FC<ComposerWithBrandingProps> = ({ onSendMessage }) => {
  return (
    <div className="w-full">
      <MessageComposer onSendMessage={onSendMessage} />
      <PoweredByBranding />
    </div>
  );
};

export default ComposerWithBranding;
