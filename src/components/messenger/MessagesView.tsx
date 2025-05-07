import React from "react";
import { useConversations } from "../../context/ConversationsContext";
import { AIAvatar, HumanAvatar } from "../icons/MessengerIcons";
import { Button } from "../ui/button";
import { MessageSquare, X } from "lucide-react";

interface MessagesViewProps {
  onClose?: () => void;
}

const MessagesView: React.FC<MessagesViewProps> = ({ onClose }) => {
  const { conversations, setActiveConversation, addConversation } = useConversations();

  const startNewConversation = () => {
    // Create a new conversation with initial welcome message
    const newConversationId = `conv_${Date.now()}`;
    const newConversation = {
      id: newConversationId,
      lastMessage: {
        content: "Hi there, welcome to Intercom 👋",
        timestamp: new Date(),
      },
      messages: [
        {
          id: "1",
          sender: "ai" as const,
          showAvatar: true,
          messages: [
            {
              id: "1-1",
              content: "Hi there, welcome to Intercom 👋 You are now speaking with Fin AI Agent. I can do much more than chatbots you've seen before. Tell me as much as you can about your question and I'll do my best to help you in an instant.",
              timestamp: new Date(),
            },
          ],
        },
      ],
      currentAgent: "ai" as const,
      isActive: true,
    };
    
    addConversation(newConversation);
    setActiveConversation(newConversationId);
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    
    // If less than 24 hours, show time
    if (diff < 24 * 60 * 60 * 1000) {
      return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } 
    // Otherwise show date
    else {
      return timestamp.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="flex flex-col h-full bg-messenger-base">
      <div className="flex items-center h-16 px-5 border-b border-messenger-border">
        <div className="flex items-center gap-2 flex-1 justify-center">
          <h1 className="text-lg font-semibold">Messages</h1>
        </div>
        {onClose && (
          <button 
            className="flex items-center justify-center p-4 text-messenger-icon-muted hover:bg-messenger-ai-bg rounded-xl"
            onClick={onClose}
          >
            <X size={16} />
          </button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-6 text-messenger-text-muted">
            <p className="mb-4 text-center">No conversations yet</p>
          </div>
        ) : (
          <div className="divide-y divide-messenger-border">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                className="flex items-center w-full p-4 text-left hover:bg-messenger-ai-bg transition-colors"
                onClick={() => setActiveConversation(conversation.id)}
              >
                <div className="relative mr-3">
                  {conversation.currentAgent === "ai" ? (
                    <AIAvatar />
                  ) : (
                    <div className="relative">
                      <HumanAvatar />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium truncate">
                      {conversation.currentAgent === "ai" ? "Fin" : "Kelly"}
                    </p>
                    <span className="text-xs text-messenger-text-muted">
                      {formatTimestamp(conversation.lastMessage.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-messenger-text-muted truncate">
                    {conversation.lastMessage.content}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-messenger-border">
        <Button 
          onClick={startNewConversation}
          className="w-full flex items-center justify-center gap-2"
          variant="default"
        >
          <MessageSquare size={16} />
          <span>Send us a message</span>
        </Button>
      </div>
      
      <div className="flex h-14 border-t border-messenger-border">
        <button className="flex-1 flex items-center justify-center text-messenger-text-muted">
          Home
        </button>
        <button className="flex-1 flex items-center justify-center text-messenger-text-default font-medium bg-messenger-ai-bg border-t-2 border-messenger-customer-bg">
          Messages
        </button>
        <button className="flex-1 flex items-center justify-center text-messenger-text-muted">
          Help
        </button>
      </div>
    </div>
  );
};

export default MessagesView;
