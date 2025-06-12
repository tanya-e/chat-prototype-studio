import { ArrowLeft, MoreHorizontal, X, Paperclip, Send, Mic, UserRound, Smile, Image } from "lucide-react";
import FinNewLogo from "../../assets/visuals/Fin-New.svg";

export { ArrowLeft, MoreHorizontal, X, Paperclip, Send, Mic, UserRound, Smile, Image };

// Smile Icon from assets - using currentColor for theming
export const SmileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="6.525" stroke="currentColor" strokeWidth="1.7"/>
    <path d="M5.81836 5.33594C6.42574 5.33594 6.91873 5.82821 6.91895 6.43555C6.91895 7.04306 6.42587 7.53613 5.81836 7.53613C5.21103 7.53592 4.71875 7.04293 4.71875 6.43555C4.71896 5.82834 5.21116 5.33615 5.81836 5.33594ZM10.1816 5.33594C10.789 5.33594 11.282 5.82821 11.2822 6.43555C11.2822 7.04306 10.7892 7.53613 10.1816 7.53613C9.57431 7.53592 9.08203 7.04293 9.08203 6.43555C9.08224 5.82834 9.57444 5.33615 10.1816 5.33594Z" fill="currentColor"/>
    <path d="M10 10C9.55973 10.6045 8.82811 11 8 11C7.17189 11 6.44027 10.6045 6 10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
  </svg>
);

// GIF Icon from assets - using currentColor for theming
export const GifIcon = () => (
  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M14.2588 3.7H4.25879C4.0931 3.7 3.95879 3.83431 3.95879 4H2.25879C2.25879 2.89543 3.15422 2 4.25879 2H14.2588C15.3634 2 16.2588 2.89543 16.2588 4V12C16.2588 13.1046 15.3634 14 14.2588 14H4.25879C3.15422 14 2.25879 13.1046 2.25879 12H3.95879C3.95879 12.1657 4.0931 12.3 4.25879 12.3H14.2588C14.4245 12.3 14.5588 12.1657 14.5588 12V4C14.5588 3.83431 14.4245 3.7 14.2588 3.7ZM5.76953 7.10083C5.75391 6.86646 5.69661 6.6425 5.59766 6.42896C5.5013 6.21541 5.36198 6.02531 5.17969 5.85864C4.9974 5.68937 4.77344 5.55656 4.50781 5.46021C4.24219 5.36385 3.9349 5.31567 3.58594 5.31567C3.07812 5.31567 2.64844 5.41854 2.29688 5.62427C1.94531 5.83 1.67839 6.11515 1.49609 6.47974C1.3138 6.84172 1.22266 7.26099 1.22266 7.73755V8.37817C1.22266 8.72713 1.26823 9.05135 1.35938 9.35083C1.45312 9.64771 1.59635 9.90812 1.78906 10.1321C1.98177 10.3534 2.22656 10.5266 2.52344 10.6516C2.82031 10.7766 3.17318 10.8391 3.58203 10.8391C3.96484 10.8391 4.29427 10.7857 4.57031 10.679C4.84896 10.5696 5.07682 10.4224 5.25391 10.2375C5.43359 10.05 5.56641 9.83781 5.65234 9.60083C5.73828 9.36125 5.78125 9.11125 5.78125 8.85083V7.81177H3.64062V8.71411H4.57031V8.94849C4.57031 9.09692 4.53516 9.23494 4.46484 9.36255C4.39453 9.49015 4.28776 9.59302 4.14453 9.67114C4.0013 9.74927 3.82161 9.78833 3.60547 9.78833C3.34245 9.78833 3.13021 9.72713 2.96875 9.60474C2.8099 9.47974 2.69401 9.31047 2.62109 9.09692C2.55078 8.88338 2.51562 8.6425 2.51562 8.37427V7.74927C2.51562 7.30916 2.60677 6.96932 2.78906 6.72974C2.97135 6.48755 3.23307 6.36646 3.57422 6.36646C3.70964 6.36646 3.83073 6.38468 3.9375 6.42114C4.04688 6.4576 4.14193 6.50968 4.22266 6.57739C4.30339 6.6451 4.36849 6.72323 4.41797 6.81177C4.46745 6.90031 4.5013 6.99666 4.51953 7.10083H5.76953ZM8.09766 10.7415V5.40942H6.8125V10.7415H8.09766ZM10.6211 8.72974V10.7415H9.33594V5.40942H12.8867V6.44067H10.6211V7.72974H12.6797V8.72974H10.6211Z" fill="currentColor"/>
  </svg>
);

// Attachment Icon from assets - using currentColor for theming
export const AttachmentIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M7.66975 2.50677C8.0017 2.83871 8.0017 3.3769 7.66976 3.70885L3.52394 7.85471C3.07066 8.31802 2.81815 8.94134 2.82124 9.58962C2.82434 10.2391 3.08375 10.8611 3.54306 11.3204C4.00238 11.7796 4.62445 12.0389 5.27395 12.0418C5.92225 12.0448 6.54557 11.7921 7.00879 11.3387L12.9337 5.41283C13.0904 5.25619 13.1786 5.04354 13.1787 4.82199C13.1787 4.60046 13.0908 4.38795 12.9341 4.23123C12.7775 4.07453 12.565 3.98647 12.3434 3.98642C12.1219 3.98638 11.9094 4.07431 11.7528 4.23086V4.23086L5.87112 10.1125C5.53918 10.4444 5.00099 10.4444 4.66904 10.1125C4.3371 9.78055 4.3371 9.24236 4.66904 8.91041L10.5507 3.02877C11.0263 2.55339 11.6714 2.28628 12.3438 2.28642C13.0162 2.28656 13.6611 2.55383 14.1364 3.0294C14.6118 3.50496 14.8788 4.14989 14.8787 4.82235C14.8785 5.4947 14.6113 6.13945 14.1359 6.61481L8.20237 12.5493C7.4191 13.3183 6.36382 13.7468 5.26621 13.7418C4.16858 13.7368 3.11733 13.2986 2.3411 12.5226C1.56486 11.7465 1.1265 10.6953 1.12126 9.59772C1.11603 8.5001 1.54438 7.4448 2.31318 6.66136L2.31879 6.65564L6.46767 2.50678C6.79961 2.17483 7.3378 2.17482 7.66975 2.50677Z" fill="currentColor"/>
  </svg>
);

export const AIAvatar = () => (
  <div className="flex items-center justify-center w-10 h-10 overflow-hidden rounded-lg bg-messenger-base shadow-[0px_1px_4px_0px_rgba(15,15,15,0.06),0px_4px_28px_0px_rgba(15,15,15,0.06)]">
    <img
      src={FinNewLogo}
      alt="Fin AI Avatar"
      className="w-[33.91px] h-[33.91px] object-contain"
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
      src={FinNewLogo} 
      alt="Fin AI Avatar" 
      className="w-full h-full object-contain"
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

