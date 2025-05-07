
import React from "react";
import { ArrowLeft, X } from "lucide-react";

export type HeaderStateType = "ai" | "human" | "unassigned";

interface MessengerHeaderProps {
  headerState: HeaderStateType;
  onClose?: () => void;
  onBack?: () => void;
  showBackButton?: boolean;
}

const MessengerHeader: React.FC<MessengerHeaderProps> = ({
  headerState,
  onClose,
  onBack,
  showBackButton = false,
}) => {
  // Define header data based on state
  const headerData = {
    ai: {
      title: "Fin",
      subtitle: "AI Agent",
    },
    human: {
      title: "Kelly",
      subtitle: "Support Representative",
    },
    unassigned: {
      title: "",
      subtitle: "Finding an agent...",
    },
  };

  const { title, subtitle } = headerData[headerState];

  return (
    <div className="h-14 border-b border-messenger-border flex items-center px-4 gap-4">
      {/* Back button */}
      {showBackButton && (
        <button onClick={onBack} className="text-messenger-text-default h-8 w-8 flex items-center justify-center">
          <ArrowLeft className="h-5 w-5" />
        </button>
      )}

      {/* Avatar/icon - only visible when we have a title */}
      {title && (
        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${headerState === "ai" ? "bg-messenger-ai-bg" : "bg-gray-100"}`}>
          <span className={`uppercase text-sm font-normal ${headerState === "ai" ? "text-messenger-text-default" : "text-gray-700"}`}>
            {title.charAt(0)}
          </span>
        </div>
      )}

      {/* Text content */}
      <div className="flex-1">
        {title && (
          <h3 className="text-messenger-text-default text-base font-normal leading-tight">
            {title}
          </h3>
        )}
        <p className="text-messenger-text-muted text-xs">
          {subtitle}
        </p>
      </div>

      {/* Close button */}
      {onClose && (
        <button onClick={onClose} className="text-messenger-icon-muted hover:text-messenger-text-default h-8 w-8 flex items-center justify-center">
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default MessengerHeader;
