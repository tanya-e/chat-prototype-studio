import React, { useState, useEffect, useRef } from "react";
import { MessageGroupType } from "../messenger/MessageGroup";
import TypingIndicator from "../messenger/TypingIndicator";
import SystemMessage from "../messenger/SystemMessage";
import TeamHandover from "../messenger/TeamHandover";
import { HeaderStateType } from "../messenger/MessengerHeader";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/utils/analytics";
import { BrandingFlowType } from "@/types/branding-flows";
import MessagesView from "../messenger/MessagesView";
import { useConversations } from "@/context/ConversationsContext";
import NavBarMinimal from "./NavBarMinimal";
import MessageBubbleMinimal from "./MessageBubbleMinimal";
import ComposerExpanded from "./ComposerExpanded";
import BottomDrawer from "./BottomDrawer";

interface MessengerExperimentalProps {
  onClose?: () => void;
  flowType?: BrandingFlowType;
}

// Define a separate type for system messages to avoid type conflicts
interface SystemMessageGroup {
  id: string;
  type: "system";
  content: string;
  displayed: boolean;
}

const initialMessages: MessageGroupType[] = [
  {
    id: "1",
    sender: "ai",
    showAvatar: true,
    messages: [
      {
        id: "1-1",
        content: "Hi there, welcome to Intercom 👋 You are now speaking with Fin AI Agent. I can do much more than chatbots you've seen before. Tell me as much as you can about your question and I'll do my best to help you in an instant.",
        timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      },
    ],
  },
];

const MessengerExperimental: React.FC<MessengerExperimentalProps> = ({ 
  onClose, 
  flowType = "onUserMessage"
}) => {
  const [messages, setMessages] = useState<MessageGroupType[]>(initialMessages);
  const [systemMessages, setSystemMessages] = useState<SystemMessageGroup[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [headerState, setHeaderState] = useState<HeaderStateType>("ai");
  const [waitingForHuman, setWaitingForHuman] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userMessageSent, setUserMessageSent] = useState(false);
  const [finReplied, setFinReplied] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const { toast } = useToast();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  
  const { 
    activeConversationId, 
    setActiveConversation, 
    addConversation, 
    getConversation, 
    addMessageToConversation, 
    updateConversation 
  } = useConversations();
  
  // Initialize a conversation if it's the first render and none exists
  useEffect(() => {
    // Track when the messenger is displayed
    trackEvent("messenger_displayed");
    
    // Only create a new conversation if we don't have an active one
    if (!activeConversationId) {
      const newConversationId = `conv_${Date.now()}`;
      
      addConversation({
        id: newConversationId,
        lastMessage: {
          content: initialMessages[0].messages[0].content,
          timestamp: initialMessages[0].messages[0].timestamp,
        },
        messages: [...initialMessages],
        currentAgent: "ai",
        isActive: true,
      });
    } else {
      // If we already have an active conversation, load its messages
      const conversation = getConversation(activeConversationId);
      if (conversation) {
        setMessages(conversation.messages);
        setHeaderState(conversation.currentAgent);
      }
    }
    
    // Scroll to bottom when initialized
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, []);
  
  // Update messages when active conversation changes
  useEffect(() => {
    if (activeConversationId) {
      const conversation = getConversation(activeConversationId);
      if (conversation) {
        setMessages(conversation.messages);
        setHeaderState(conversation.currentAgent);
      }
    }
  }, [activeConversationId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, systemMessages, isTyping, waitingForHuman]);

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
    if (!activeConversationId) return;
    
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

    setMessages((prev) => [...prev, newUserMessage]);
    addMessageToConversation(activeConversationId, newUserMessage);
    
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

  const triggerHumanHandoff = () => {
    setWaitingForHuman(true);
    setIsTyping(false);
    setSystemMessages((prev) => [
      ...prev,
      {
        id: `sys-${Date.now()}`,
        type: "system",
        content: "A human agent will join the conversation soon.",
        displayed: false,
      },
    ]);
  };

  const simulateAiResponse = () => {
    if (!activeConversationId) return;
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
      setMessages((prev) => [...prev, newAiMessage]);
      addMessageToConversation(activeConversationId, newAiMessage);
      setFinReplied(true);
    }, 1500);
  };

  // Function to interleave messages and system messages for display
  const getInterleavedMessages = () => {
    const result = [...messages];
    systemMessages.forEach(sysMsg => {
      const humanAgentMessageIndex = result.findIndex(
        msg => msg.sender === "human"
      );
      const insertIndex = humanAgentMessageIndex >= 0 
        ? humanAgentMessageIndex 
        : result.length;
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

  const handleBackClick = () => {
    setActiveConversation(null);
  };

  const handleMoreClick = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleDownloadTranscript = () => {
    // Create a simple text transcript
    const transcript = messages
      .map(group =>
        group.messages.map(msg =>
          `${group.sender === 'ai' ? 'Fin' : group.sender === 'user' ? 'You' : 'Agent'}: ${msg.content}`
        ).join('\n')
      )
      .join('\n\n');

    // Create and download the file
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversation-transcript-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    trackEvent("transcript_downloaded");
  };

  const handleExpandMessenger = () => {
    // This could open the messenger in a new window or expand it
    // For now, we'll just track the event and show a toast
    trackEvent("messenger_expand_requested");
    toast({
      title: "Expand Messenger",
      description: "This feature will open the messenger in a larger view.",
    });
  };

  const interleavedMessages = getInterleavedMessages();

  // If no active conversation is selected, show the messages view
  if (activeConversationId === null) {
    return <MessagesView onClose={onClose} />;
  }

  return (
    <div className="flex flex-col h-full bg-messenger-base overflow-hidden">
      {/* Only render the experimental header */}
      <NavBarMinimal
        headerState={headerState}
        onClose={onClose}
        onBack={handleBackClick}
        onMoreClick={handleMoreClick}
      />
      {/* Messages section */}
      <div 
        ref={messagesContainerRef} 
        className="flex-1 overflow-y-auto p-4 pb-0 pt-[94px]"
      >
        {/* Render all messages using MessageBubbleMinimal */}
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
            // Render each message in the group as a minimal bubble, including sender
            return (item as MessageGroupType).messages.map((msg, msgIndex, msgArray) => {
              // Check if this is the last message in the entire conversation
              const isLastMessage = item === interleavedMessages[interleavedMessages.length - 1] &&
                                   msgIndex === msgArray.length - 1;

              return (
                <MessageBubbleMinimal
                  key={msg.id}
                  message={{ ...msg, sender: (item as MessageGroupType).sender }}
                  isLastMessage={isLastMessage}
                />
              );
            });
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
      {/* Only render the experimental composer */}
      <ComposerExpanded onSendMessage={handleSendMessage} />

      {/* Bottom Drawer */}
      <BottomDrawer
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        onDownloadTranscript={handleDownloadTranscript}
        onExpandMessenger={handleExpandMessenger}
      />
    </div>
  );
};

export default MessengerExperimental; 