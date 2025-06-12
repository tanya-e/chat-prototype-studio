import React, { useState, useRef, useEffect } from "react";
import { MessageType } from "../messenger/Message";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import "./streaming-animations.css";
import "./markdown-styles.css";

interface MessageBubbleMinimalProps {
  message: MessageType;
  isStreaming?: boolean;
  streamedContent?: string;
  isLastMessage?: boolean; // New prop to determine if this is the last message in the conversation
}

const MessageBubbleMinimal: React.FC<MessageBubbleMinimalProps> = ({
  message,
  isStreaming = false,
  streamedContent = "",
  isLastMessage = false
}) => {
  const [showMetadata, setShowMetadata] = useState(false);
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



  const handleBubbleClick = () => {
    // Only allow click-to-reveal for non-last messages and non-user messages
    if (!isLastMessage && !isUser) {
      setShowMetadata(!showMetadata);
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
      {/* Message container with bubble and metadata */}
      <div className={`flex flex-col gap-0.5 ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          onClick={handleBubbleClick}
          className={`max-w-[320px] ${
            isUser
              ? 'p-4 bg-messenger-customer-bg'
              : 'bg-messenger-ai-bg p-4'
          } flex flex-col items-start gap-2 rounded-[20px] relative ${
            isUser ? 'text-messenger-customer-text message-user' : 'text-messenger-ai-text'
          } ${isStreaming && isAI ? 'streaming-bubble' : ''} ${
            !isLastMessage && !isUser ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''
          }`}
        >
          {isStreaming && isAI ? (
            // Streaming content with fade animation (no markdown parsing during streaming)
            // Apply same typography as final message to prevent size jump
            <div
              className="relative message-markdown"
              style={{
                fontFamily: 'SF Pro Text',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '1.5em'
              }}
            >
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
      
      {/* Metadata row under the message - show for last message or when clicked */}
      {!isStreaming && !isUser && (isLastMessage || showMetadata) && (
        <div
          className={`flex items-center gap-2 mt-[3px] px-4 relative overflow-hidden transition-all duration-300 ease-out ${
            showMetadata ? 'animate-slide-down' : ''
          }`}
          style={{
            maxHeight: (isLastMessage || showMetadata) ? '40px' : '0px',
            opacity: (isLastMessage || showMetadata) ? 1 : 0,
          }}
        >
          {/* Metadata for AI and human senders */}
          <>
            <div
              style={{
                color: "var(--messenger-text-muted-extra)",
                fontFamily: 'SF Pro Text',
                fontSize: 12,
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '1.193359375em', // Exact from Figma
                letterSpacing: '0.6000000238418579%', // Exact from Figma
              }}
              className="flex gap-1"
            >
              <span
                className={`${isLastMessage ? 'animate-fade-in opacity-0' : ''}`}
                style={isLastMessage ? {
                  animation: 'fadeIn 0.3s ease-in-out 0.1s forwards'
                } : {}}
              >
                {senderName}
              </span>
              <span
                className={`${isLastMessage ? 'animate-fade-in opacity-0' : ''}`}
                style={isLastMessage ? {
                  animation: 'fadeIn 0.3s ease-in-out 0.3s forwards'
                } : {}}
              >
                • {formattedTime}
              </span>
            </div>
              

            </>
        </div>
      )}
    </div>
  );
};

export default MessageBubbleMinimal;
