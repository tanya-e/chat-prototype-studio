import React, { useState, useEffect, useRef } from "react";
import MessengerHeader, { HeaderStateType } from "./MessengerHeader";
import MessageGroup, { MessageGroupType } from "./MessageGroup";
import TypingIndicator from "./TypingIndicator";
import MessageComposer from "./MessageComposer";
import SystemMessage from "./SystemMessage";
import TeamHandover from "./TeamHandover";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

// Define a separate type for system messages to avoid type conflicts
interface SystemMessageGroup {
  id: string;
  type: "system";
  content: string;
}

const Messenger: React.FC = () => {
  const [messages, setMessages] = useState<MessageGroupType[]>(initialMessages);
  const [systemMessages, setSystemMessages] = useState<SystemMessageGroup[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [headerState, setHeaderState] = useState<HeaderStateType>("ai");
  const [waitingForHuman, setWaitingForHuman] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { toast } = useToast();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, systemMessages, isTyping]);

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

    setMessages((prev) => [...prev, newUserMessage]);

    // Check if the message contains 'human' to trigger handoff
    if (text.toLowerCase().includes("human")) {
      triggerHumanHandoff();
    } else {
      // Otherwise, simulate AI response
      simulateAiResponse();
    }
  };

  const resetConversation = () => {
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
    setIsTyping(false);
    setHeaderState("unassigned");
    setWaitingForHuman(true);
    
    // Add system message for connecting
    setTimeout(() => {
      // Simulate agent joining after a delay
      setTimeout(() => {
        setHeaderState("human");
        setWaitingForHuman(false);
        
        // First show the system message that Kelly joined
        setSystemMessages((prev) => [
          ...prev,
          {
            id: `system-${Date.now()}`,
            type: "system",
            content: "Kelly joined the conversation"
          }
        ]);
        
        // Then show agent typing
        setTimeout(() => {
          setIsTyping(true);
          
          // Finally show first message from agent
          setTimeout(() => {
            setIsTyping(false);
            setMessages((prev) => [
              ...prev,
              {
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
              },
            ]);
          }, 2000);
        }, 1000);
      }, 3000);
    }, 300);
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
      
      setMessages((prev) => [...prev, newAiMessage]);
    }, 1500);
  };

  // Function to interleave messages and system messages for display
  const getInterleavedMessages = () => {
    const result = [...messages];
    
    // Insert system messages at the right positions based on their timestamps
    systemMessages.forEach(sysMsg => {
      let insertIndex = result.length;
      result.splice(insertIndex, 0, {
        id: sysMsg.id,
        type: "system-message",
        content: sysMsg.content
      } as any);
    });
    
    return result;
  };

  const interleavedMessages = getInterleavedMessages();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="flex gap-4 mb-4">
        <Button 
          variant="outline" 
          onClick={resetConversation}
          className="flex gap-2 items-center"
        >
          <RotateCcw size={16} />
          Reset Conversation
        </Button>
      </div>
      <div 
        className="w-full max-w-[400px] h-[720px] bg-messenger-base rounded-2xl flex flex-col shadow-xl overflow-hidden"
        style={{
          boxShadow: "0px 5px 40px 0px var(--messenger-elevated)"
        }}
      >
        <MessengerHeader headerState={headerState} />
        
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
        
        <MessageComposer onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default Messenger;
