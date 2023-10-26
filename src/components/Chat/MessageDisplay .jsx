import React from "react";

const MessageDisplay = ({ messages }) => {
  return (
    <div className="message-display">
      {messages.map((message) => (
        <div key={message.id} className="message">
          <div className="avatar">{message.senderName}</div>
          <div className="message-content">
            <div className="sender-name">{message.senderName}</div>
            <div className="message-text">{message.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageDisplay;
