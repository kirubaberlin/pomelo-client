import React, { useState } from "react";

const TextChatComponent = ({ zegoClient }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {
    zegoClient.sendBarrageMessage("your_room_id", message); // Send a message to the room
    setMessages([...messages, { text: message, sender: "You" }]);
    setMessage("");
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{`${msg.sender}: ${msg.text}`}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default TextChatComponent;
