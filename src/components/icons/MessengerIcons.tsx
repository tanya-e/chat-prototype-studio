
import React from "react";
import { ArrowLeft, MoreHorizontal, X, Paperclip, Send, Mic, UserRound } from "lucide-react";

export { ArrowLeft, MoreHorizontal, X, Paperclip, Send, Mic, UserRound };

export const AIAvatar = () => (
  <div className="flex items-center justify-center w-8 h-8 bg-gray-900 text-white rounded-md">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="black"/>
      <path d="M17.55 11.2C17.55 10.8 17.475 10.425 17.325 10.075C17.175 9.725 16.975 9.4 16.7 9.15C16.45 8.875 16.125 8.675 15.775 8.525C15.425 8.375 15.05 8.3 14.65 8.3C14.15 8.3 13.675 8.45 13.25 8.75C12.85 8.45 12.375 8.3 11.875 8.3C11.675 8.3 11.475 8.325 11.3 8.375C11.125 8.425 10.95 8.5 10.8 8.6C10.65 8.7 10.525 8.8 10.4 8.925C10.275 9.05 10.175 9.2 10.1 9.35C10.05 9.45 10 9.55 9.975 9.675C9.95 9.775 9.925 9.9 9.925 10C9.925 10.1 9.925 10.225 9.95 10.325C9.975 10.425 10 10.525 10.025 10.625H7.55V15.6H8.85V11.9H9.95C9.95 12.825 10.275 13.575 10.925 14.15C11.6 14.7 12.45 14.975 13.475 14.975C14.5 14.975 15.35 14.7 16.025 14.15C16.7 13.575 17.025 12.825 17.025 11.9H18.125V15.6H19.425V11.9H20.525V10.625H17.55V11.2ZM13.475 13.7C12.75 13.7 12.175 13.5 11.75 13.1C11.325 12.7 11.125 12.15 11.125 11.45V11.2H15.85V11.475C15.85 12.15 15.65 12.7 15.225 13.1C14.8 13.5 14.2 13.7 13.475 13.7Z" fill="white"/>
    </svg>
  </div>
);

export const HumanAvatar = ({ src = "/lovable-uploads/b986ca6f-33e9-4609-8ab5-ce3d84ffe6ad.png" }: { src?: string }) => (
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
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="black"/>
      <path d="M17.55 11.2C17.55 10.8 17.475 10.425 17.325 10.075C17.175 9.725 16.975 9.4 16.7 9.15C16.45 8.875 16.125 8.675 15.775 8.525C15.425 8.375 15.05 8.3 14.65 8.3C14.15 8.3 13.675 8.45 13.25 8.75C12.85 8.45 12.375 8.3 11.875 8.3C11.675 8.3 11.475 8.325 11.3 8.375C11.125 8.425 10.95 8.5 10.8 8.6C10.65 8.7 10.525 8.8 10.4 8.925C10.275 9.05 10.175 9.2 10.1 9.35C10.05 9.45 10 9.55 9.975 9.675C9.95 9.775 9.925 9.9 9.925 10C9.925 10.1 9.925 10.225 9.95 10.325C9.975 10.425 10 10.525 10.025 10.625H7.55V15.6H8.85V11.9H9.95C9.95 12.825 10.275 13.575 10.925 14.15C11.6 14.7 12.45 14.975 13.475 14.975C14.5 14.975 15.35 14.7 16.025 14.15C16.7 13.575 17.025 12.825 17.025 11.9H18.125V15.6H19.425V11.9H20.525V10.625H17.55V11.2ZM13.475 13.7C12.75 13.7 12.175 13.5 11.75 13.1C11.325 12.7 11.125 12.15 11.125 11.45V11.2H15.85V11.475C15.85 12.15 15.65 12.7 15.225 13.1C14.8 13.5 14.2 13.7 13.475 13.7Z" fill="white"/>
    </svg>
  </div>
);

export const SmallHumanAvatar = ({ name = "K" }: { name?: string }) => (
  <div className="flex items-center justify-center w-5 h-5 bg-gray-500 text-white text-[8px] rounded-full">
    {name}
  </div>
);
