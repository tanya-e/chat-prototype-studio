
import React from "react";
import { ArrowLeft, MoreHorizontal, X, Paperclip, Send, Mic, UserRound } from "lucide-react";

export { ArrowLeft, MoreHorizontal, X, Paperclip, Send, Mic, UserRound };

export const AIAvatar = () => (
  <div className="flex items-center justify-center w-8 h-8 overflow-hidden rounded-md">
    <img 
      src="/lovable-uploads/266386fe-9896-4d94-adcb-411ea69f8cb7.png" 
      alt="Fin AI Avatar" 
      className="w-full h-full object-cover"
    />
  </div>
);

export const HumanAvatar = () => (
  <div className="flex items-center justify-center w-8 h-8 overflow-hidden rounded-full">
    <img 
      src="/lovable-uploads/85f44b3f-9c1f-4e6a-a830-410a47bf3a18.png" 
      alt="Human Avatar" 
      className="w-full h-full object-cover"
    />
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
  <div className="flex items-center justify-center w-5 h-5 overflow-hidden rounded-md">
    <img 
      src="/lovable-uploads/266386fe-9896-4d94-adcb-411ea69f8cb7.png" 
      alt="Fin AI Avatar" 
      className="w-full h-full object-cover"
    />
  </div>
);

export const SmallHumanAvatar = () => (
  <div className="flex items-center justify-center w-5 h-5 overflow-hidden rounded-full">
    <img 
      src="/lovable-uploads/85f44b3f-9c1f-4e6a-a830-410a47bf3a18.png" 
      alt="Human Avatar" 
      className="w-full h-full object-cover"
    />
  </div>
);

