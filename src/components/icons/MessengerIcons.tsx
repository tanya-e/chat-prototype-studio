
import React from "react";

export const ArrowLeftIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
  </svg>
);

export const EllipsisIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
  </svg>
);

export const XIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
  </svg>
);

export const PaperclipIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"/>
  </svg>
);

export const SendIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
  </svg>
);

export const MicIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
    <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z"/>
  </svg>
);

export const AIAvatar = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-gray-900 text-white rounded-md">
    <span>AI</span>
  </div>
);

export const HumanAvatar = ({ src = "/lovable-uploads/13d897b7-a539-4a96-86ca-347f5f8a891c.png" }: { src?: string }) => (
  <div className="flex items-center justify-center w-8 h-8 bg-white border border-gray-200 rounded-full overflow-hidden">
    <img src={src} alt="Human Avatar" className="w-full h-full object-cover" />
  </div>
);

export const UnassignedAvatars = () => (
  <div className="flex -space-x-2">
    <div className="w-7 h-7 rounded-full border border-messenger-border bg-white z-30 shadow-sm"></div>
    <div className="w-7 h-7 rounded-full border border-messenger-border bg-white z-20 shadow-sm"></div>
    <div className="w-7 h-7 rounded-full border border-messenger-border bg-white z-10 shadow-sm"></div>
  </div>
);

export const SmallAIAvatar = () => (
  <div className="flex items-center justify-center w-5 h-5 bg-gray-900 text-white text-[8px] rounded-md">
    AI
  </div>
);

export const SmallHumanAvatar = ({ name = "K" }: { name?: string }) => (
  <div className="flex items-center justify-center w-5 h-5 bg-gray-500 text-white text-[8px] rounded-full">
    {name}
  </div>
);
