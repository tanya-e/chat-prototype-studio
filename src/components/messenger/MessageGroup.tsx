
import React from "react";
import Message, { MessageGroupType } from "./Message";

// Re-export the MessageGroupType for use in other components
export type { MessageGroupType };

interface MessageGroupProps {
  group: MessageGroupType;
}

const MessageGroup: React.FC<MessageGroupProps> = ({ group }) => {
  return (
    <div 
      className={`flex mb-4 ${
        group.sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div className={`flex flex-col ${group.sender === "user" ? "items-end" : "items-start"}`}>
        {group.messages.map((msg, index) => (
          <Message
            key={msg.id}
            message={{
              id: msg.id,
              sender: group.sender,
              content: msg.content,
              timestamp: msg.timestamp,
            }}
            showAvatar={group.showAvatar && index === 0}
            isLastInGroup={index === group.messages.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default MessageGroup;
