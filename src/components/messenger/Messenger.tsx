import React, { useState, useRef } from "react";
import MessengerHeader from "./MessengerHeader";
import MessageGroup from "./MessageGroup";
import TypingIndicator from "./TypingIndicator";
import MessageComposer from "./MessageComposer";
import SystemMessage from "./SystemMessage";
import TeamHandover from "./TeamHandover";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMessages } from "./hooks/useMessages";
import { triggerHumanHandoff, simulateAiResponse } from "./utils/handoffUtils";
import { HeaderStateType } from "./types";

const Messenger: React.FC = () => {
  const [headerState, setHeaderState] = useState<HeaderStateType>("ai");
  const [waitingForHuman, setWaitingForHuman] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { toast } = useToast();
  
  const {
    isTyping,
    resetConversation: resetMessages,
    addUserMessage,
    addAiResponse,
    addHumanAgentMessage,
    addSystemMessage,
    simulateTyping,
    getInterleavedMessages,
    messagesEndRef
  } = useMessages();
  
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Track scroll position for handover pill styling
  React.useEffect(() => {
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
    addUserMessage(text);

    // Check if the message contains 'human' to trigger handoff
    if (text.toLowerCase().includes("human")) {
      triggerHumanHandoff({
        setIsTyping,
        setHeaderState,
        setWaitingForHuman,
        addSystemMessage,
        addHumanAgentMessage,
        simulateTyping
      });
    } else {
      // Otherwise, simulate AI response
      simulateAiResponse({
        simulateTyping,
        addAiResponse
      });
    }
  };

  const resetConversation = () => {
    resetMessages();
    setHeaderState("ai");
    setWaitingForHuman(false);
    
    toast({
      title: "Conversation Reset",
      description: "The conversation has been reset to the beginning.",
    });
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
              return <MessageGroup key={item.id} group={item} />;
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
