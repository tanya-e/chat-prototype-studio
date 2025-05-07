
import React, { useState, useEffect, useRef } from "react";
import MessengerHeader, { HeaderStateType } from "./MessengerHeader";
import MessageGroup, { MessageGroupType } from "./MessageGroup";
import TypingIndicator from "./TypingIndicator";
import SystemMessage from "./SystemMessage";
import TeamHandover from "./TeamHandover";
import ComposerWithAnimatedBranding from "../branding-prototype/ComposerWithAnimatedBranding";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/utils/analytics";
import { BrandingFlowType } from "@/types/branding-flows";
import { useConversations } from "./ConversationsContext";
import MessagesView from "./MessagesView";

interface MessengerProps {
  onClose?: () => void;
  flowType?: BrandingFlowType;
}

// Define a separate type for system messages to avoid type conflicts
interface SystemMessageGroup {
  id: string;
  type: "system";
  content: string;
  displayed: boolean; // Add a flag to track if message has been displayed
}

const Messenger: React.FC<MessengerProps> = ({ onClose, flowType = "onUserMessage" }) => {
  const [isMessagesView, setIsMessagesView] = useState(false);
  const [systemMessages, setSystemMessages] = useState<SystemMessageGroup[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [headerState, setHeaderState] = useState<HeaderStateType>("ai");
  const [waitingForHuman, setWaitingForHuman] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userMessageSent, setUserMessageSent] = useState(false);
  const [finReplied, setFinReplied] = useState(false);
  const { toast } = useToast();
  
  const {
    conversations,
    currentConversationId,
    addMessageToCurrentConversation,
    createNewConversation,
    setCurrentConversation,
    getCurrentMessages
  } = useConversations();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Initialize a conversation if none exists
  useEffect(() => {
    if (conversations.length === 0 && !isMessagesView) {
      createNewConversation();
    }
    
    // Track when the messenger is displayed
    trackEvent("messenger_displayed");
    
    // Scroll to bottom when initialized
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (!isMessagesView) { // Only scroll in conversation view
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [getCurrentMessages(), systemMessages, isTyping, waitingForHuman, isMessagesView]);

  // Track scroll position for handover pill styling
  useEffect(() => {
    const messagesContainer = messagesContainerRef.current;
    if (!messagesContainer) return;

    const handleScroll = () => {
      const { scrollTop } = messagesContainer;
      setIsScrolled(scrollTop > 10); // Apply fixed styling after scrolling down a bit
    };

    messagesContainer.addEventListener("scroll", handleScroll);
    return () => messagesContainer.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSendMessage = (text: string) => {
    const newUserMessage: MessageGroupType = {
      id: `user-${Date.now()}`,
      sender: "user",
      messages: [
        {
          id: `user-msg-${Date.now()}`,
          content: text,
          timestamp: new Date(),
        },
      ],
    };

    addMessageToCurrentConversation(newUserMessage);
    
    // Track that user has sent a message for the branding flow
    setUserMessageSent(true);

    // Check if the message contains 'human' to trigger handoff
    if (text.toLowerCase().includes("human")) {
      triggerHumanHandoff();
    } else {
      // Otherwise, simulate AI response
      simulateAiResponse();
    }
  };

  const resetConversation = () => {
    if (currentConversationId) {
      createNewConversation();
    }
    
    setSystemMessages([]);
    setIsTyping(false);
    setHeaderState("ai");
    setWaitingForHuman(false);
    
    toast({
      title: "Conversation Reset",
      description: "The conversation has been reset to the beginning.",
    });
  };

  const triggerHumanHandoff = () => {
    // First show handover pill
    setWaitingForHuman(true);
    
    // After 2 seconds, update header state and show system message
    setTimeout(() => {
      // Update header state to unassigned first
      setHeaderState("unassigned");
      setWaitingForHuman(false);
      
      // Add system message for Kelly joining
      const systemMessageId = `system-${Date.now()}`;
      setSystemMessages([
        {
          id: systemMessageId,
          type: "system",
          content: "Kelly joined the conversation",
          displayed: false
        }
      ]);
      
      // Update header state to human
      setHeaderState("human");
      
      // After showing the system message, show typing indicator
      setTimeout(() => {
        setIsTyping(true);
        
        // Finally show first message from human agent
        setTimeout(() => {
          setIsTyping(false);
          
          const newAgentMessage: MessageGroupType = {
            id: `agent-${Date.now()}`,
            sender: "human",
            showAvatar: true,
            messages: [
              {
                id: `agent-msg-${Date.now()}`,
                content: "Hi there! I'm Kelly. What can I help you with today?",
                timestamp: new Date(),
              },
            ],
          };
          
          addMessageToCurrentConversation(newAgentMessage);
          
        }, 2000); // Show typing for 2 seconds
      }, 500); // Wait 0.5s after system message before typing
    }, 2000); // Show handover pill for 2 seconds
  };

  const simulateAiResponse = () => {
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      const newAiMessage: MessageGroupType = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        showAvatar: true,
        messages: [
          {
            id: `ai-msg-${Date.now()}`,
            content: "I understand your question. Let me help you with that. Is there anything specific you'd like to know?",
            timestamp: new Date(),
          },
        ],
      };
      
      addMessageToCurrentConversation(newAiMessage);
      
      // Track that Fin has replied for branding flow
      setFinReplied(true);
    }, 1500);
  };

  // Function to interleave messages and system messages for display
  const getInterleavedMessages = () => {
    const messages = getCurrentMessages();
    const result = [...messages];
    
    // Insert system messages at the right positions based on their timestamps
    systemMessages.forEach(sysMsg => {
      // Find the index where the human agent's first message appears
      const humanAgentMessageIndex = result.findIndex(
        msg => msg.sender === "human"
      );
      
      // If there's a human agent message, insert system message before it
      // Otherwise insert at the end
      const insertIndex = humanAgentMessageIndex >= 0 
        ? humanAgentMessageIndex 
        : result.length;
        
      // Insert the system message if not already in the result
      if (!sysMsg.displayed) {
        result.splice(insertIndex, 0, {
          id: sysMsg.id,
          type: "system-message",
          content: sysMsg.content
        } as any);
      }
    });
    
    return result;
  };

  const interleavedMessages = getInterleavedMessages();
  
  const handleBackClick = () => {
    setIsMessagesView(true);
  };
  
  const handleStartNewConversation = () => {
    createNewConversation();
    setIsMessagesView(false);
  };
  
  const handleSelectConversation = (id: string) => {
    setCurrentConversation(id);
    setIsMessagesView(false);
  };

  return (
    <div className="flex flex-col h-full bg-messenger-base overflow-hidden">
      {isMessagesView ? (
        <MessagesView 
          conversations={conversations} 
          onNewConversation={handleStartNewConversation}
          onSelectConversation={handleSelectConversation}
        />
      ) : (
        <>
          <MessengerHeader 
            headerState={headerState} 
            onClose={onClose} 
            onBack={handleBackClick} 
            showBackButton={true} 
          />
          
          <div 
            ref={messagesContainerRef} 
            className="flex-1 overflow-y-auto p-4"
          >
            {interleavedMessages.map((item) => {
              if ((item as any).type === "system-message") {
                return (
                  <SystemMessage
                    key={item.id}
                    message={(item as any).content}
                    type="human-joined"
                  />
                );
              } else {
                return <MessageGroup key={item.id} group={item as MessageGroupType} />;
              }
            })}
            
            {isTyping && (
              <div className="mb-4">
                <TypingIndicator sender={headerState === "ai" ? "ai" : "human"} name={headerState === "ai" ? "Fin" : "Kelly"} />
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {waitingForHuman && (
            <div className="flex justify-center mb-4 mt-auto px-4">
              <TeamHandover variant={isScrolled ? "fixed" : "default"} />
            </div>
          )}
          
          <ComposerWithAnimatedBranding 
            onSendMessage={handleSendMessage} 
            flowType={flowType}
            finReplied={finReplied}
            userMessageSent={userMessageSent}
          />
        </>
      )}
    </div>
  );
};

export default Messenger;
