import React, { useState, useEffect, useRef } from "react";
import MessengerHeader, { HeaderStateType } from "./MessengerHeader";
import MessageGroup, { MessageGroupType } from "./MessageGroup";
import TypingIndicator from "./TypingIndicator";
import SystemMessage from "./SystemMessage";
import TeamHandover from "./TeamHandover";
import ComposerExpanded from "../messenger-experimental/ComposerExpanded";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/utils/analytics";
import { BrandingFlowType } from "@/types/branding-flows";
import MessagesView from "./MessagesView";
import { useConversations } from "@/context/ConversationsContext";
import MessageBubbleMinimal from "../messenger-experimental/MessageBubbleMinimal";
import { askOpenAI } from "@/utils/openai";
import gsap from "gsap";

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

const Messenger: React.FC<MessengerProps> = ({ onClose, flowType = "onUserMessage" }) => {
  const [messages, setMessages] = useState<MessageGroupType[]>(initialMessages);
  const [systemMessages, setSystemMessages] = useState<SystemMessageGroup[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [headerState, setHeaderState] = useState<HeaderStateType>("ai");
  const [waitingForHuman, setWaitingForHuman] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userMessageSent, setUserMessageSent] = useState(false);
  const [finReplied, setFinReplied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [newestMessage, setNewestMessage] = useState<MessageGroupType | null>(null);
  
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

  // Track scroll position for handover pill styling
  useEffect(() => {
    const messagesContainer = messagesContainerRef.current;
    if (!messagesContainer) return;

    const handleScroll = () => {
      const { scrollTop } = messagesContainer;
      setIsScrolled(scrollTop > 10); // Apply fixed styling after scrolling down a bit
      
      // Calculate scroll progress (0 to 1)
      const maxScroll = 200;
      const progress = Math.min(scrollTop / maxScroll, 1);
      setScrollProgress(progress);
    };

    messagesContainer.addEventListener("scroll", handleScroll);
    return () => messagesContainer.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSendMessage = (text: string) => {
    if (!activeConversationId) return;
    
    const messageId = `user-msg-${Date.now()}`;
    const newUserMessage: MessageGroupType = {
      id: `user-${Date.now()}`,
      sender: "user",
      messages: [
        {
          id: messageId,
          content: text,
          timestamp: new Date(),
        },
      ],
    };

    setMessages((prev) => [...prev, newUserMessage]);
    addMessageToConversation(activeConversationId, newUserMessage);
    setNewestMessage(newUserMessage);
    
    // Track that user has sent a message for the branding flow
    setUserMessageSent(true);

    // Animate and scroll
    setTimeout(() => {
      if (messagesContainerRef.current) {
        const container = messagesContainerRef.current;
        const newMsgElement = container.querySelector(`[data-message-id="${messageId}"]`);
        
        if (!newMsgElement) {
          // Fallback
          if (text.toLowerCase().includes("human")) {
            triggerHumanHandoff();
          } else {
            simulateAiResponse(text);
          }
          return;
        }
        
        // Animate message
        gsap.fromTo(newMsgElement, 
          { y: 50, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.4, 
            ease: "power2.out",
            onComplete: () => {
              // Position message at the very top of the container's viewport
              const messageEl = newMsgElement as HTMLElement;
              
              // Get current positions
              const containerRect = container.getBoundingClientRect();
              const messageRect = messageEl.getBoundingClientRect();
              
              // Calculate the exact scroll needed
              // We want message.top to equal container.top + 10px
              const currentGap = messageRect.top - containerRect.top;
              const desiredGap = 10;
              const scrollAdjustment = currentGap - desiredGap;
              
              // Check max scrollable position
              const maxScroll = container.scrollHeight - container.clientHeight;
              const targetScroll = container.scrollTop + scrollAdjustment;
              const actualScroll = Math.min(targetScroll, maxScroll);
              
              // Animate the scroll with GSAP for smooth movement
              gsap.to(container, {
                scrollTop: actualScroll,
                duration: 0.6,
                ease: "power2.inOut",
                onComplete: () => {
                  // Trigger response after scroll completes
                  setNewestMessage(null);
                  if (text.toLowerCase().includes("human")) {
                    triggerHumanHandoff();
                  } else {
                    simulateAiResponse(text);
                  }
                }
              });
            }
          }
        );
      }
    }, 100);
  };

  const resetConversation = () => {
    if (!activeConversationId) return;
    
    // Reset conversation to initial state
    updateConversation(activeConversationId, {
      messages: [...initialMessages],
      lastMessage: {
        content: initialMessages[0].messages[0].content,
        timestamp: initialMessages[0].messages[0].timestamp,
      },
      currentAgent: "ai"
    });
    
    setMessages(initialMessages);
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
    if (!activeConversationId) return;
    
    // First show handover pill
    setWaitingForHuman(true);
    
    // After 2 seconds, update header state and show system message
    setTimeout(() => {
      // Update header state to unassigned first
      setHeaderState("unassigned");
      setWaitingForHuman(false);
      
      // Add system message for Kelly joining
      const systemMessageId = `system-${Date.now()}`;
      const newSystemMessage: SystemMessageGroup = {
        id: systemMessageId,
        type: "system",
        content: "Kelly joined the conversation",
        displayed: false
      };
      
      setSystemMessages([newSystemMessage]);
      
      // Update header state to human
      setHeaderState("human");
      updateConversation(activeConversationId, { currentAgent: "human" });
      
      // After showing the system message, show typing indicator
      setTimeout(() => {
        setIsTyping(true);
        
        // Finally show first message from human agent
        setTimeout(() => {
          setIsTyping(false);
          
          const newHumanMessage: MessageGroupType = {
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
          
          setMessages((prev) => [...prev, newHumanMessage]);
          addMessageToConversation(activeConversationId, newHumanMessage);
          
        }, 2000); // Show typing for 2 seconds
      }, 500); // Wait 0.5s after system message before typing
    }, 2000); // Show handover pill for 2 seconds
  };

  const simulateAiResponse = async (userText: string) => {
    if (!activeConversationId) return;
    
    setIsTyping(true);
    
    try {
      // Call OpenAI API
      const response = await askOpenAI(userText);
      const aiContent = response.choices?.[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
      
      setIsTyping(false);
      
      const newAiMessage: MessageGroupType = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        showAvatar: true,
        messages: [
          {
            id: `ai-msg-${Date.now()}`,
            content: aiContent,
            timestamp: new Date(),
          },
        ],
      };
      
      setMessages((prev) => [...prev, newAiMessage]);
      addMessageToConversation(activeConversationId, newAiMessage);
      
      // Track that Fin has replied for branding flow
      setFinReplied(true);
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      setIsTyping(false);
      
      // Show error message
      const errorMessage: MessageGroupType = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        showAvatar: true,
        messages: [
          {
            id: `ai-msg-${Date.now()}`,
            content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
            timestamp: new Date(),
          },
        ],
      };
      
      setMessages((prev) => [...prev, errorMessage]);
      addMessageToConversation(activeConversationId, errorMessage);
    }
  };

  // Function to interleave messages and system messages for display
  const getInterleavedMessages = () => {
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

  const handleBackClick = () => {
    setActiveConversation(null);
  };

  const interleavedMessages = getInterleavedMessages();

  // If no active conversation is selected, show the messages view
  if (activeConversationId === null) {
    return <MessagesView onClose={onClose} />;
  }

  return (
    <div className="flex flex-col h-full bg-messenger-base overflow-hidden">
      <MessengerHeader 
        headerState={headerState} 
        onClose={onClose} 
        onBack={handleBackClick} 
        scrollProgress={scrollProgress}
      />
      
      <div 
        ref={messagesContainerRef} 
        className="flex-1 overflow-y-auto p-4"
        style={{ 
          paddingTop: scrollProgress > 0 ? `${80 - (scrollProgress * 16)}px` : '20px',
          paddingBottom: '120px' // Back to normal padding
        }}
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
            // Render each message in the group as a minimal bubble, including sender
            return (item as MessageGroupType).messages.map((msg) => {
              const isNewest = newestMessage?.messages[0]?.id === msg.id;
              return (
                <div 
                  key={msg.id} 
                  data-message-id={msg.id}
                  style={{ opacity: isNewest ? 0 : 1 }} // Hide initially if newest
                >
                  <MessageBubbleMinimal message={{ ...msg, sender: (item as MessageGroupType).sender }} />
                </div>
              );
            });
          }
        })}
        
        {isTyping && (
          <div className="mb-4">
            <TypingIndicator sender={headerState === "ai" ? "ai" : "human"} name={headerState === "ai" ? "Fin" : "Kelly"} />
          </div>
        )}
        
        {/* Add invisible spacer to ensure scrollability */}
        <div style={{ height: '60vh' }} />
        
        <div ref={messagesEndRef} />
      </div>
      
      {waitingForHuman && (
        <div className="flex justify-center mb-4 mt-auto px-4">
          <TeamHandover variant={isScrolled ? "fixed" : "default"} />
        </div>
      )}
      
      <div className="flex-shrink-0">
        <ComposerExpanded onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default Messenger;
