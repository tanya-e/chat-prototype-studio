import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, MoreHorizontal, ChevronLeft, X } from "lucide-react";
import { AIAvatar, HumanAvatar, UnassignedAvatars } from "../icons/MessengerIcons";
import { trackEvent } from "@/utils/analytics";
import gsap from "gsap";

export type HeaderStateType = "ai" | "unassigned" | "human";

interface MessengerHeaderProps {
  headerState: HeaderStateType;
  onClose?: () => void;
  onBack?: () => void;
  subtitle?: string;
  scrollProgress?: number; // 0 to 1, where 0 is no scroll and 1 is fully scrolled
  userMessageSent?: boolean; // Track if user has sent first message
}

const MessengerHeader: React.FC<MessengerHeaderProps> = ({ 
  headerState, 
  onClose, 
  onBack, 
  subtitle,
  scrollProgress = 0,
  userMessageSent = false
}) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!headerRef.current || !avatarRef.current) return;

    // Determine if header should be scaled down
    // Scale down if user sent message AND not hovered
    const shouldScaleDown = userMessageSent && !isHovered;
    
    // Calculate scale values with natural transitions
    const avatarScale = shouldScaleDown ? 0.625 : 1; // 32px to 20px when scaled down
    const headerHeight = shouldScaleDown ? 48 : 64; // Smaller header when scaled down
    const headerPadding = shouldScaleDown ? 8 : 16; // Less padding when scaled down
    const buttonScale = shouldScaleDown ? 0.842 : 1; // 38px to 32px when scaled down

    // Border radius for AI avatar
    const borderRadius = headerState === "ai" ? 
      (shouldScaleDown ? 4 : 8) : 999; // More rounded when scaled down

    // Apply animations with natural easing
    gsap.to(avatarRef.current, {
      scale: avatarScale,
      duration: 0.4,
      ease: "power2.inOut"
    });

    // Animate border radius for AI avatar
    if (headerState === "ai") {
      const avatarElement = avatarRef.current.querySelector('div');
      if (avatarElement) {
        gsap.to(avatarElement, {
          borderRadius: `${borderRadius}px`,
          duration: 0.4,
          ease: "power2.inOut"
        });
      }
    }

    gsap.to(headerRef.current, {
      paddingTop: `${headerPadding}px`,
      paddingBottom: `${headerPadding}px`,
      height: `${headerHeight}px`,
      duration: 0.4,
      ease: "power2.inOut"
    });

    // Animate buttons
    const buttons = [backButtonRef.current, moreButtonRef.current, closeButtonRef.current].filter(Boolean);
    buttons.forEach(button => {
      if (button) {
        gsap.to(button, {
          scale: buttonScale,
          duration: 0.4,
          ease: "power2.inOut"
        });
      }
    });

  }, [scrollProgress, headerState, userMessageSent, isHovered]);

  const handleClose = () => {
    if (onClose) {
      trackEvent("messenger_close_clicked");
      onClose();
    }
  };

  const handleBack = () => {
    if (onBack) {
      trackEvent("messenger_back_clicked");
      onBack();
    }
  };

  return (
    <div 
      ref={headerRef}
      className="relative flex items-center justify-between px-2 backdrop-blur-md bg-white/80 dark:bg-gray-900/80"
      style={{ height: '64px' }} // Initial height
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left side - Back button */}
      <div className="flex items-center">
        {onBack && (
          <button 
            ref={backButtonRef}
            className="relative flex items-center justify-center min-w-[38px] min-h-[38px] w-[38px] h-[38px] text-messenger-icon-muted hover:text-messenger-text-default hover:bg-messenger-ai-bg rounded-lg transition-colors before:absolute before:inset-0 before:content-['']"
            onClick={handleBack}
          >
            <ChevronLeft size={16} />
          </button>
        )}
        {!onBack && <div className="w-[38px]" />} {/* Spacer when no back button */}
      </div>
      
      {/* Center - Avatar (absolutely positioned) */}
      <div 
        ref={avatarRef}
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        {headerState === "ai" && <AIAvatar />}
        {headerState === "unassigned" && <UnassignedAvatars />}
        {headerState === "human" && (
          <div className="relative">
            <HumanAvatar />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></span>
          </div>
        )}
      </div>
      
      {/* Right side - Action buttons */}
      <div className="flex items-center gap-1">
        <button 
          ref={moreButtonRef}
          className="relative flex items-center justify-center min-w-[38px] min-h-[38px] w-[38px] h-[38px] text-messenger-icon-muted hover:text-messenger-text-default hover:bg-messenger-ai-bg rounded-lg transition-colors before:absolute before:inset-0 before:content-['']"
        >
          <MoreHorizontal size={16} />
        </button>
        {onClose && (
          <button 
            ref={closeButtonRef}
            className="relative flex items-center justify-center min-w-[38px] min-h-[38px] w-[38px] h-[38px] text-messenger-icon-muted hover:text-messenger-text-default hover:bg-messenger-ai-bg rounded-lg transition-colors before:absolute before:inset-0 before:content-['']"
            onClick={handleClose}
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default MessengerHeader;
