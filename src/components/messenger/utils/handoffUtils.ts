
import { HeaderStateType } from "../types";

interface HandoffProps {
  setIsTyping: (isTyping: boolean) => void;
  setHeaderState: (state: HeaderStateType) => void;
  setWaitingForHuman: (waiting: boolean) => void;
  addSystemMessage: (content: string) => void;
  addHumanAgentMessage: (content: string) => void;
  simulateTyping: (duration: number, callback: () => void) => void;
}

export const triggerHumanHandoff = ({
  setIsTyping,
  setHeaderState,
  setWaitingForHuman,
  addSystemMessage,
  addHumanAgentMessage,
  simulateTyping
}: HandoffProps) => {
  setIsTyping(false);
  setHeaderState("unassigned");
  setWaitingForHuman(true);
  
  // First add the system message for Kelly joining
  addSystemMessage("Kelly joined the conversation");
  
  // Wait a small delay before showing the human response sequence
  setTimeout(() => {
    // Update header state to human
    setHeaderState("human");
    setWaitingForHuman(false);
    
    // Show typing indicator then message
    setTimeout(() => {
      simulateTyping(2000, () => {
        addHumanAgentMessage("Hi there! I'm Kelly. What can I help you with today?");
      });
    }, 1000);
  }, 3000);
};

export const simulateAiResponse = ({
  simulateTyping,
  addAiResponse
}: {
  simulateTyping: (duration: number, callback: () => void) => void;
  addAiResponse: (content: string) => void;
}) => {
  simulateTyping(1500, () => {
    addAiResponse("I understand your question. Let me help you with that. Is there anything specific you'd like to know?");
  });
};
