
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/utils/analytics";

// Define conversation types
export interface Conversation {
  id: string;
  sender: "ai" | "human";
  senderName: string;
  lastMessage: string;
  timestamp: Date;
  isNew?: boolean;
}

interface MessagesViewProps {
  conversations: Conversation[];
  onNewConversation: () => void;
  onSelectConversation: (conversationId: string) => void;
}

const MessagesView: React.FC<MessagesViewProps> = ({
  conversations,
  onNewConversation,
  onSelectConversation,
}) => {
  const { toast } = useToast();
  
  const handleNewConversation = () => {
    onNewConversation();
    trackEvent("new_conversation_from_messages");
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="flex flex-col h-full bg-messenger-base">
      {/* Header */}
      <div className="px-4 py-3 border-b border-messenger-border flex items-center">
        <h2 className="text-lg font-normal text-messenger-text-default flex-1 text-center tracking-wide">
          MESSAGES
        </h2>
      </div>
      
      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-4 text-messenger-text-muted">
            <MessageSquare className="h-12 w-12 mb-2 opacity-30" />
            <p className="text-sm">No recent messages</p>
          </div>
        ) : (
          <div className="divide-y divide-messenger-border">
            {conversations.map((convo) => (
              <button
                key={convo.id}
                className="w-full px-4 py-3 flex items-start hover:bg-gray-50 dark:hover:bg-gray-800 text-left transition-colors"
                onClick={() => onSelectConversation(convo.id)}
              >
                <div className="h-8 w-8 rounded-full flex-shrink-0 mr-3 mt-1 overflow-hidden bg-messenger-ai-bg flex items-center justify-center">
                  {convo.sender === "ai" ? (
                    <MessageSquare className="h-4 w-4 text-messenger-icon-muted" />
                  ) : (
                    <User className="h-4 w-4 text-messenger-icon-muted" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <p className="text-sm font-normal text-messenger-text-default tracking-wide">
                      {convo.senderName}
                    </p>
                    <span className="text-xs text-messenger-text-muted-extra">
                      {formatTimestamp(convo.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-messenger-text-muted line-clamp-1">
                    {convo.lastMessage}
                  </p>
                </div>
                
                {convo.isNew && (
                  <div className="w-2 h-2 rounded-full bg-blue-500 ml-2 mt-3"></div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* CTA Button */}
      <div className="p-4 border-t border-messenger-border">
        <Button 
          onClick={handleNewConversation} 
          className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white"
        >
          <span className="font-mono uppercase text-xs tracking-wider">Send us a message</span>
        </Button>
      </div>
    </div>
  );
};

export default MessagesView;
