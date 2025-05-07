import React, { useState, useEffect, useRef } from "react";
import MessengerHeader, { HeaderStateType } from "./MessengerHeader";
import MessageGroup, { MessageGroupType } from "./MessageGroup";
import TypingIndicator from "./TypingIndicator";
import MessageComposer from "./MessageComposer";
import SystemMessage from "./SystemMessage";

const initialMessages: MessageGroupType[] = [
  {
    id: "1",
    sender: "ai",
    showAvatar: true,
    messages: [
      {
        id: "1-1",
        content: "Hello! How can I help you today?",
        timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      },
    ],
  },
];

const Messenger: React.FC = () => {
  const [messages, setMessages] = useState<MessageGroupType[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [headerState, setHeaderState] = useState<HeaderStateType>("ai");
  const [waitingForHuman, setWaitingForHuman] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

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

  const triggerHumanHandoff = () => {
    setIsTyping(false);
    setHeaderState("unassigned");
    setWaitingForHuman(true);
    
    // Add system message
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `system-${Date.now()}`,
          sender: "ai",
          messages: [
            {
              id: `system-msg-${Date.now()}`,
              content: "Hang tight, we are connecting you…",
              timestamp: new Date(),
            },
          ],
        },
      ]);
      
      // Simulate agent joining after a delay
      setTimeout(() => {
        setHeaderState("human");
        setWaitingForHuman(false);
        
        // Add system message for agent joining
        setMessages((prev) => [
          ...prev,
          {
            id: `system-join-${Date.now()}`,
            sender: "ai",
            messages: [
              {
                id: `system-join-msg-${Date.now()}`,
                content: "Kelly joined the conversation",
                timestamp: new Date(),
              },
            ],
          },
        ]);
        
        // Show agent typing
        setTimeout(() => {
          setIsTyping(true);
          
          // Show first message from agent
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div 
        className="w-full max-w-[400px] h-[720px] bg-messenger-base rounded-2xl flex flex-col shadow-xl overflow-hidden"
        style={{
          boxShadow: "0px 5px 40px 0px var(--messenger-elevated)"
        }}
      >
        <MessengerHeader headerState={headerState} />
        
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((group) => (
            <MessageGroup key={group.id} group={group} />
          ))}
          
          {waitingForHuman && (
            <SystemMessage message="Hang tight, we are connecting you…" timestamp={new Date()} />
          )}
          
          {isTyping && (
            <div className="mb-4">
              <TypingIndicator sender={headerState === "ai" ? "ai" : "human"} name={headerState === "ai" ? "AI Assistant" : "Kelly"} />
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <MessageComposer onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default Messenger;
