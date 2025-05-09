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

// Import experimental components
import NavBarMinimal from "./NavBarMinimal";
import MessageBubbleMinimal from "./MessageBubbleMinimal";
import ComposerExpanded from "./ComposerExpanded";

// Import classic components
import MessengerHeader from "../messenger/MessengerHeader";
import MessageGroup from "../messenger/MessageGroup";
import ComposerWithAnimatedBranding from "../branding-prototype/ComposerWithAnimatedBranding";
interface MessengerExperimentalProps {
  onClose?: () => void;
  flowType?: BrandingFlowType;
  variant: "classic" | "experimental";
}

// Define system message type
interface SystemMessageGroup {
  id: string;
  type: "system";
  content: string;
  displayed: boolean;
}
const initialMessages: MessageGroupType[] = [{
  id: "1",
  sender: "ai",
  showAvatar: true,
  messages: [{
    id: "1-1",
    content: "Hi there, welcome to Intercom 👋 You are now speaking with Fin AI Agent. I can do much more than chatbots you've seen before. Tell me as much as you can about your question and I'll do my best to help you in an instant.",
    timestamp: new Date(Date.now() - 1000 * 60 * 15) // 15 minutes ago
  }]
}];
const MessengerExperimental: React.FC<MessengerExperimentalProps> = ({
  onClose,
  flowType = "onUserMessage",
  variant = "classic"
}) => {
  const [messages, setMessages] = useState<MessageGroupType[]>(initialMessages);
  const [systemMessages, setSystemMessages] = useState<SystemMessageGroup[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [headerState, setHeaderState] = useState<HeaderStateType>("ai");
  const [waitingForHuman, setWaitingForHuman] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userMessageSent, setUserMessageSent] = useState(false);
  const [finReplied, setFinReplied] = useState(false);
  const {
    toast
  } = useToast();
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
          timestamp: initialMessages[0].messages[0].timestamp
        },
        messages: [...initialMessages],
        currentAgent: "ai",
        isActive: true
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
    messagesEndRef.current?.scrollIntoView({
      behavior: "auto"
    });
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
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages, systemMessages, isTyping, waitingForHuman]);

  // Track scroll position for handover pill styling
  useEffect(() => {
    const messagesContainer = messagesContainerRef.current;
    if (!messagesContainer) return;
    const handleScroll = () => {
      const {
        scrollTop
      } = messagesContainer;
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
      messages: [{
        id: `user-msg-${Date.now()}`,
        content: text,
        timestamp: new Date()
      }]
    };
    setMessages(prev => [...prev, newUserMessage]);
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
      updateConversation(activeConversationId, {
        currentAgent: "human"
      });

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
            messages: [{
              id: `agent-msg-${Date.now()}`,
              content: "Hi there! I'm Kelly. What can I help you with today?",
              timestamp: new Date()
            }]
          };
          setMessages(prev => [...prev, newHumanMessage]);
          addMessageToConversation(activeConversationId, newHumanMessage);
        }, 2000); // Show typing for 2 seconds
      }, 500); // Wait 0.5s after system message before typing
    }, 2000); // Show handover pill for 2 seconds
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
        messages: [{
          id: `ai-msg-${Date.now()}`,
          content: "I understand your question. Let me help you with that. Is there anything specific you'd like to know?",
          timestamp: new Date()
        }]
      };
      setMessages(prev => [...prev, newAiMessage]);
      addMessageToConversation(activeConversationId, newAiMessage);

      // Track that Fin has replied for branding flow
      setFinReplied(true);
    }, 1500);
  };

  // Function to interleave messages and system messages for display
  const getInterleavedMessages = () => {
    const result = [...messages];

    // Insert system messages at the right positions based on their timestamps
    systemMessages.forEach(sysMsg => {
      // Find the index where the human agent's first message appears
      const humanAgentMessageIndex = result.findIndex(msg => msg.sender === "human");

      // If there's a human agent message, insert system message before it
      // Otherwise insert at the end
      const insertIndex = humanAgentMessageIndex >= 0 ? humanAgentMessageIndex : result.length;

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
  return <div className="flex flex-col h-full  overflow-hidden">
      {/* Header based on variant */}
      {variant === "classic" ? <MessengerHeader headerState={headerState} onClose={onClose} onBack={handleBackClick} /> : <NavBarMinimal headerState={headerState} onClose={onClose} onBack={handleBackClick} />}
      
      {/* Messages section */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4">
        {variant === "classic" ?
      // Classic message rendering
      <>
            {interleavedMessages.map(item => {
          if ((item as any).type === "system-message") {
            return <SystemMessage key={item.id} message={(item as any).content} type="human-joined" />;
          } else {
            return <MessageGroup key={item.id} group={item as MessageGroupType} />;
          }
        })}
          </> :
      // Experimental message rendering with MessageBubbleMinimal
      <>
            {interleavedMessages.map(item => {
          if ((item as any).type === "system-message") {
            return <SystemMessage key={item.id} message={(item as any).content} type="human-joined" />;
          } else {
            const group = item as MessageGroupType;
            return <div key={group.id} className={`flex mb-4 ${group.sender === "user" ? "justify-end" : "justify-start"}`}>
                    {group.messages.map(msg => <MessageBubbleMinimal key={msg.id} message={{
                id: msg.id,
                sender: group.sender,
                content: msg.content,
                timestamp: msg.timestamp
              }} />)}
                  </div>;
          }
        })}
          </>}
        
        {isTyping && <div className="mb-4">
            <TypingIndicator sender={headerState === "ai" ? "ai" : "human"} name={headerState === "ai" ? "Fin" : "Kelly"} />
          </div>}
        
        <div ref={messagesEndRef} />
      </div>
      
      {waitingForHuman && <div className="flex justify-center mb-4 mt-auto px-4">
          <TeamHandover variant={isScrolled ? "fixed" : "default"} />
        </div>}
      
      {/* Composer based on variant */}
      {variant === "classic" ? <ComposerWithAnimatedBranding onSendMessage={handleSendMessage} flowType={flowType} finReplied={finReplied} userMessageSent={userMessageSent} /> : <ComposerExpanded onSendMessage={handleSendMessage} />}
    </div>;
};
export default MessengerExperimental;