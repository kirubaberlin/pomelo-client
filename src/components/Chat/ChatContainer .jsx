import React from "react";
import UserAvatars from "./UserAvatars ";
import MessageDisplay from "./MessageDisplay ";
import MessageInput from "./MessageInput";

const ChatContainer = ({ participants, chatMessages, sendMessage }) => {
  return (
    <div className="chat-container">
      <UserAvatars users={participants} />
      <MessageDisplay messages={chatMessages} />
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
};

export default ChatContainer;
