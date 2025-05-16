
import React, { useState, useEffect, useRef } from "react";
import MessengerHeader from "../messenger/MessengerHeader";
import MessageGroup from "../messenger/MessageGroup";
import TypingIndicator from "../messenger/TypingIndicator";
import { BrandingFlowType } from "../../types/branding-flows";
import ComposerWithAnimatedBranding from "./ComposerWithAnimatedBranding";
import MessageStackBranding from "../messenger/MessageStackBranding";

interface MessengerPreviewProps {
  flowType: BrandingFlowType;
}

const MessengerPreview: React.FC<MessengerPreviewProps> = ({ flowType }) => {
  const [isFinMessageVisible, setIsFinMessageVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [userSentMessage, setUserSentMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Simulate staggered loading and initial Fin message
  useEffect(() => {
    // Reset state when flow changes
    setIsFinMessageVisible(false);
    setIsTyping(false);
    setUserSentMessage(false);

    // Show typing indicator
    setTimeout(() => {
      setIsTyping(true);
      
      // Show Fin message after typing
      setTimeout(() => {
        setIsTyping(false);
        setIsFinMessageVisible(true);
      }, 1000); // 1s typing animation
    }, 200); // 0.2s delay before typing starts
  }, [flowType]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isFinMessageVisible, isTyping, userSentMessage]);

  const handleSendMessage = (text: string) => {
    // Mark that user has sent a message (for flow types that need it)
    setUserSentMessage(true);
  };

  // Mock the onClose function for MessengerHeader
  const handleClose = () => {
    // This is just a preview, so we don't need to do anything
  };

  // Determine if we should show the composer branding (for all flows except inMessageStack)
  const showComposerBranding = flowType !== "inMessageStack";

  return (
    <div className="flex flex-col h-full w-full bg-messenger-base overflow-hidden rounded-lg shadow-md">
      <MessengerHeader headerState="ai" onClose={handleClose} />
      
      <div className="flex-1 overflow-y-auto p-4">
        {flowType === "inMessageStack" && <MessageStackBranding userMessageSent={userSentMessage} />}
        
        {isFinMessageVisible && (
          <MessageGroup
            group={{
              id: "1",
              sender: "ai",
              showAvatar: true,
              messages: [
                {
                  id: "1-1",
                  content: "Hi there, welcome to Intercom 👋 You are now speaking with Fin AI Agent. I can do much more than chatbots you've seen before. Tell me as much as you can about your question and I'll do my best to help you in an instant.",
                  timestamp: new Date(),
                },
              ],
            }}
          />
        )}
        
        {userSentMessage && (
          <MessageGroup
            group={{
              id: "2",
              sender: "user",
              messages: [
                {
                  id: "2-1",
                  content: "Hello! I have a question about your product.",
                  timestamp: new Date(),
                },
              ],
            }}
          />
        )}
        
        {isTyping && (
          <div className="mb-4">
            <TypingIndicator sender="ai" name="Fin" />
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="mt-auto">
        {showComposerBranding ? (
          <ComposerWithAnimatedBranding 
            onSendMessage={handleSendMessage} 
            flowType={flowType} 
            finReplied={isFinMessageVisible}
            userMessageSent={userSentMessage}
          />
        ) : (
          <ComposerWithAnimatedBranding 
            onSendMessage={handleSendMessage} 
            flowType="onUserMessage" 
            finReplied={isFinMessageVisible}
            userMessageSent={userSentMessage}
          />
        )}
      </div>
    </div>
  );
};

export default MessengerPreview;
