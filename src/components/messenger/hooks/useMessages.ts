import { useState, useRef, useEffect } from "react";
import { MessageGroupType, SystemMessageGroup } from "../types";

// Initial messages to start the conversation
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

export function useMessages() {
  const [messages, setMessages] = useState<MessageGroupType[]>(initialMessages);
  const [systemMessages, setSystemMessages] = useState<SystemMessageGroup[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, systemMessages, isTyping]);
  
  const resetConversation = () => {
    setMessages(initialMessages);
    setSystemMessages([]);
    setIsTyping(false);
  };
  
  const addUserMessage = (text: string) => {
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
    return newUserMessage;
  };
  
  const addAiResponse = (content: string) => {
    const newAiMessage: MessageGroupType = {
      id: `ai-${Date.now()}`,
      sender: "ai",
      showAvatar: true,
      messages: [
        {
          id: `ai-msg-${Date.now()}`,
          content,
          timestamp: new Date(),
        },
      ],
    };
    
    setMessages((prev) => [...prev, newAiMessage]);
  };
  
  const addHumanAgentMessage = (content: string) => {
    const newAgentMessage: MessageGroupType = {
      id: `agent-${Date.now()}`,
      sender: "human",
      showAvatar: true,
      messages: [
        {
          id: `agent-msg-${Date.now()}`,
          content,
          timestamp: new Date(),
        },
      ],
    };
    
    setMessages((prev) => [...prev, newAgentMessage]);
  };
  
  const addSystemMessage = (content: string) => {
    const systemMessageId = `system-${Date.now()}`;
    setSystemMessages([
      {
        id: systemMessageId,
        type: "system",
        content,
        displayed: false
      }
    ]);
  };
  
  const simulateTyping = (duration: number, callback: () => void) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, duration);
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
  
  return {
    messages,
    isTyping,
    resetConversation,
    addUserMessage,
    addAiResponse,
    addHumanAgentMessage,
    addSystemMessage,
    simulateTyping,
    getInterleavedMessages,
    messagesEndRef,
  };
}
