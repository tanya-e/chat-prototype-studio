
import React, { createContext, useContext, useState, useEffect } from "react";
import { Conversation } from "./MessagesView";
import { MessageGroupType } from "./MessageGroup";

interface ConversationsContextType {
  conversations: Conversation[];
  currentConversationId: string | null;
  addMessageToCurrentConversation: (group: MessageGroupType) => void;
  createNewConversation: () => string;
  setCurrentConversation: (id: string) => void;
  getCurrentMessages: () => MessageGroupType[];
}

const ConversationsContext = createContext<ConversationsContextType | undefined>(undefined);

export const useConversations = () => {
  const context = useContext(ConversationsContext);
  if (context === undefined) {
    throw new Error("useConversations must be used within a ConversationsProvider");
  }
  return context;
};

interface ConversationsProviderProps {
  children: React.ReactNode;
}

export const ConversationsProvider: React.FC<ConversationsProviderProps> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [messagesMap, setMessagesMap] = useState<Record<string, MessageGroupType[]>>({});
  
  // Create a new conversation
  const createNewConversation = () => {
    const id = `conv-${Date.now()}`;
    const newConversation: Conversation = {
      id,
      sender: "ai",
      senderName: "Fin",
      lastMessage: "Hi there, welcome to Intercom 👋 You are now speaking with Fin AI Agent.",
      timestamp: new Date(),
      isNew: true,
    };
    
    setConversations(prev => [newConversation, ...prev]);
    setCurrentConversationId(id);
    
    // Initialize with welcome message
    setMessagesMap(prev => ({
      ...prev,
      [id]: [
        {
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
        },
      ]
    }));
    
    return id;
  };

  // Add a message to the current conversation
  const addMessageToCurrentConversation = (group: MessageGroupType) => {
    if (!currentConversationId) return;
    
    // Update messages for the current conversation
    setMessagesMap(prev => {
      const updatedMessages = [...(prev[currentConversationId] || []), group];
      return {
        ...prev,
        [currentConversationId]: updatedMessages
      };
    });
    
    // Update the conversation preview in the list
    setConversations(prev => {
      return prev.map(conv => {
        if (conv.id === currentConversationId) {
          const messageContent = group.messages[0].content;
          
          return {
            ...conv,
            lastMessage: messageContent,
            sender: group.sender === "user" ? "ai" : group.sender, // Map "user" to "ai" for the Conversation type
            senderName: group.sender === "ai" ? "Fin" : "Kelly",
            timestamp: new Date(),
            isNew: false,
          };
        }
        return conv;
      });
    });
  };
  
  // Set current conversation
  const setCurrentConversation = (id: string) => {
    setCurrentConversationId(id);
    
    // Mark conversation as read
    setConversations(prev => 
      prev.map(conv => 
        conv.id === id ? { ...conv, isNew: false } : conv
      )
    );
  };
  
  // Get messages for current conversation
  const getCurrentMessages = (): MessageGroupType[] => {
    if (!currentConversationId) return [];
    return messagesMap[currentConversationId] || [];
  };

  return (
    <ConversationsContext.Provider
      value={{
        conversations,
        currentConversationId,
        addMessageToCurrentConversation,
        createNewConversation,
        setCurrentConversation,
        getCurrentMessages,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};
