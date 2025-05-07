
import React, { createContext, useContext, useState, useEffect } from "react";
import { MessageGroupType } from "../components/messenger/Message";

// Define the structure for a conversation
export interface Conversation {
  id: string;
  lastMessage: {
    content: string;
    timestamp: Date;
  };
  messages: MessageGroupType[];
  currentAgent: "ai" | "human";
  isActive: boolean;
}

interface ConversationsContextType {
  conversations: Conversation[];
  activeConversationId: string | null;
  addConversation: (conversation: Conversation) => void;
  getConversation: (id: string) => Conversation | undefined;
  updateConversation: (id: string, updates: Partial<Conversation>) => void;
  setActiveConversation: (id: string | null) => void;
  addMessageToConversation: (conversationId: string, message: MessageGroupType) => void;
}

const ConversationsContext = createContext<ConversationsContextType | undefined>(undefined);

export const useConversations = () => {
  const context = useContext(ConversationsContext);
  if (!context) {
    throw new Error("useConversations must be used within a ConversationsProvider");
  }
  return context;
};

export const ConversationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  const addConversation = (conversation: Conversation) => {
    setConversations((prev) => [conversation, ...prev]);
    setActiveConversationId(conversation.id);
  };

  const getConversation = (id: string) => {
    return conversations.find((conv) => conv.id === id);
  };

  const updateConversation = (id: string, updates: Partial<Conversation>) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === id ? { ...conv, ...updates } : conv
      )
    );
  };

  const setActiveConversation = (id: string | null) => {
    setActiveConversationId(id);
  };

  const addMessageToConversation = (conversationId: string, message: MessageGroupType) => {
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === conversationId) {
          const updatedMessages = [...conv.messages, message];
          return {
            ...conv,
            messages: updatedMessages,
            lastMessage: {
              content: message.messages[message.messages.length - 1].content,
              timestamp: message.messages[message.messages.length - 1].timestamp,
            }
          };
        }
        return conv;
      })
    );
  };

  const value = {
    conversations,
    activeConversationId,
    addConversation,
    getConversation,
    updateConversation,
    setActiveConversation,
    addMessageToConversation,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
};
