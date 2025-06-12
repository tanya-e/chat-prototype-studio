import React from "react";
import { Download, Expand } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadTranscript: () => void;
  onExpandMessenger: () => void;
}

const BottomDrawer: React.FC<BottomDrawerProps> = ({
  isOpen,
  onClose,
  onDownloadTranscript,
  onExpandMessenger,
}) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Drawer */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 bg-messenger-base rounded-t-[20px] shadow-[0px_-4px_20px_0px_rgba(15,15,15,0.16)] z-50 transition-transform duration-300 ease-out",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-8 h-1 bg-messenger-text-muted-extra rounded-full" />
        </div>
        
        {/* Content */}
        <div className="px-4 pb-6">
          <div className="space-y-2">
            {/* Download Transcript Option */}
            <button
              onClick={() => {
                onDownloadTranscript();
                onClose();
              }}
              className="w-full flex items-center gap-3 p-4 rounded-lg hover:bg-messenger-ai-bg transition-colors"
            >
              <Download 
                size={20} 
                className="text-messenger-text-muted-extra" 
              />
              <span className="text-messenger-text-default font-medium">
                Download transcript
              </span>
            </button>
            
            {/* Expand Messenger Option */}
            <button
              onClick={() => {
                onExpandMessenger();
                onClose();
              }}
              className="w-full flex items-center gap-3 p-4 rounded-lg hover:bg-messenger-ai-bg transition-colors"
            >
              <Expand 
                size={20} 
                className="text-messenger-text-muted-extra" 
              />
              <span className="text-messenger-text-default font-medium">
                Expand messenger
              </span>
            </button>
          </div>
        </div>
        
        {/* Safe area for mobile devices */}
        <div className="h-safe-area-inset-bottom" />
      </div>
    </>
  );
};

export default BottomDrawer;
