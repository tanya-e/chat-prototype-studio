import React, { useState, useRef, useEffect } from "react";
import { MessageType } from "../messenger/Message";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";
import "./streaming-animations.css";
import "./markdown-styles.css";

interface MessageBubbleMinimalProps {
  message: MessageType;
  isStreaming?: boolean;
  streamedContent?: string;
}

const MessageBubbleMinimal: React.FC<MessageBubbleMinimalProps> = ({ 
  message, 
  isStreaming = false, 
  streamedContent = "" 
}) => {
  const [reaction, setReaction] = useState<'up' | 'down' | null>(null);
  const [showReactionAnimation, setShowReactionAnimation] = useState(false);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isUser = message.sender === "user";
  const isAI = message.sender === "ai";
  const senderName = message.sender === "ai" ? "Fin" : message.sender === "human" ? "Kelly" : "You";
  const formattedTime = message.timestamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).toUpperCase();

  // Get content to display (streamed content if streaming, otherwise message content)
  const displayContent = isStreaming && streamedContent ? streamedContent : message.content;

  // Split content into words for streaming animation
  const words = displayContent.split(' ');
  const fadeWordsCount = Math.min(40, words.length);

  // Calculate opacity for each word based on position (most recent = 0%, oldest = 100%)
  const getWordOpacity = (wordIndex: number, totalFadeWords: number) => {
    const position = totalFadeWords - wordIndex - 1; // 0 = most recent, totalFadeWords-1 = oldest
    return Math.min(position / (totalFadeWords - 1), 1); // 0 to 1 progression
  };

  const handleReaction = (type: 'up' | 'down') => {
    // Toggle reaction if same type is clicked, otherwise set new reaction
    const newReaction = reaction === type ? null : type;
    setReaction(newReaction);
    
    if (newReaction) {
      setShowReactionAnimation(true);
      setTimeout(() => {
        setShowReactionAnimation(false);
      }, 300);
    }
  };

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  return (
    <div className={`flex flex-col w-[368px] justify-center ${isUser ? 'items-end mb-[22px]' : 'items-start mb-[16px]'} relative`}>
      <div className="relative">
        <div 
          className={`max-w-[320px] ${isUser ? 'p-4 bg-messenger-customer-bg' : ''} flex flex-col items-start gap-2 rounded-[20px] relative ${
            isUser ? 'text-messenger-customer-text message-user' : 'text-messenger-text-default'
          } ${isStreaming && isAI ? 'streaming-bubble' : ''}`}
        >
          {isStreaming && isAI ? (
            // Streaming content with fade animation (no markdown parsing during streaming)
            <div className="relative">
              <span>
                {words.slice(0, -fadeWordsCount).join(' ')}
                {words.length > fadeWordsCount && ' '}
              </span>
              <span className="streaming-text">
                {words.slice(-fadeWordsCount).map((word, index) => {
                  const targetOpacity = getWordOpacity(index, fadeWordsCount);
                  return (
                    <span
                      key={index}
                      className="streaming-word"
                      style={{
                        animationDelay: `${index * 40}ms`, // Faster stagger - reduced from 60ms to 40ms
                        '--target-opacity': targetOpacity.toString(),
                      } as React.CSSProperties}
                    >
                      {word}
                      {index < fadeWordsCount - 1 ? ' ' : ''}
                    </span>
                  );
                })}
              </span>
            </div>
          ) : (
            // Static content with markdown parsing
            <div className="message-markdown">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  // Custom components to ensure proper styling
                  p: ({ children }) => <p>{children}</p>,
                  // Prevent unwanted margins on single paragraphs
                  div: ({ children }) => <>{children}</>,
                }}
              >
                {displayContent}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
      
      {/* Metadata row under the message - only show after streaming is complete */}
      {!isStreaming && (
        <div className="flex items-center gap-2 mt-[6px] relative">
          {/* Metadata for AI and human senders */}
          {!isUser && (
            <>
              <div
                style={{
                  color: "var(--Text-Text-muted-extra, #A3A3A3)",
                  fontFamily: 'SF Pro Text',
                  fontSize: 13,
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: 'normal',
                  letterSpacing: '0.072px',
                }}
                className="flex gap-1"
              >
                <span 
                  className="animate-fade-in opacity-0"
                  style={{
                    animation: 'fadeIn 0.3s ease-in-out 0.1s forwards'
                  }}
                >
                  {senderName}
                </span>
                <span 
                  className="animate-fade-in opacity-0"
                  style={{
                    animation: 'fadeIn 0.3s ease-in-out 0.3s forwards'
                  }}
                >
                  {formattedTime}
                </span>
              </div>
              
              {/* Thumbs up/down reactions - next to metadata */}
              <div 
                className="flex gap-1 opacity-0"
                style={{
                  animation: 'fadeIn 0.3s ease-in-out 0.5s forwards'
                }}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handleReaction('up')}
                        className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-messenger-ai-bg ${
                          reaction === 'up' 
                            ? 'text-green-600' 
                            : 'text-[#A3A3A3]'
                        } ${showReactionAnimation && reaction === 'up' ? 'animate-pulse scale-110' : ''}`}
                      >
                        <ThumbsUp size={14} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Helpful</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handleReaction('down')}
                        className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-messenger-ai-bg ${
                          reaction === 'down' 
                            ? 'text-red-600' 
                            : 'text-[#A3A3A3]'
                        } ${showReactionAnimation && reaction === 'down' ? 'animate-pulse scale-110' : ''}`}
                      >
                        <ThumbsDown size={14} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Not helpful</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MessageBubbleMinimal;
