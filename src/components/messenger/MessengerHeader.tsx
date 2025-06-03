import React, { useEffect, useRef } from "react";
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
}

const MessengerHeader: React.FC<MessengerHeaderProps> = ({ 
  headerState, 
  onClose, 
  onBack, 
  subtitle,
  scrollProgress = 0 
}) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!headerRef.current || !avatarRef.current) return;

    // Calculate values based on scroll progress
    const avatarScale = 1 - (scrollProgress * 0.375); // 32px to 20px (20/32 = 0.625, so scale by 0.625)
    const borderRadiusScale = headerState === "ai" ? 
      8 - (scrollProgress * 4) : // For AI: 8px to 4px border radius
      999; // Human stays circular
    
    const headerPadding = 16 - (scrollProgress * 8); // 16px to 8px padding
    const buttonScale = 1 - (scrollProgress * 0.158); // 38px to 32px (32/38 = 0.842)

    // Apply animations with GSAP
    gsap.to(avatarRef.current, {
      scale: avatarScale,
      duration: 0.3,
      ease: "power2.out"
    });

    // Animate border radius for AI avatar
    if (headerState === "ai") {
      const avatarElement = avatarRef.current.querySelector('div');
      if (avatarElement) {
        gsap.to(avatarElement, {
          borderRadius: `${borderRadiusScale}px`,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }

    gsap.to(headerRef.current, {
      paddingTop: `${headerPadding}px`,
      paddingBottom: `${headerPadding}px`,
      height: `${64 - (scrollProgress * 16)}px`, // 64px to 48px
      borderBottomColor: `rgba(235, 235, 235, ${1 - (scrollProgress * 0.5)})`, // Fade border
      duration: 0.3,
      ease: "power2.out"
    });

    // Animate buttons
    const buttons = [backButtonRef.current, moreButtonRef.current, closeButtonRef.current].filter(Boolean);
    buttons.forEach(button => {
      if (button) {
        gsap.to(button, {
          scale: buttonScale,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });

  }, [scrollProgress, headerState]);

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
      className="relative flex items-center justify-between px-2 border-b border-messenger-border"
      style={{ height: '64px' }} // Initial height
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
