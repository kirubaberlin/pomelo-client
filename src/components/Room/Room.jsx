import React, { useState } from "react";
import { useParams } from "react-router-dom";
import VideoChatComponent from "../../components/Booking/VideoChatComponent";

function JoinRoom() {
  const { roomID } = useParams(); // Extract room ID from URL parameter.

  // Handle joining the room using the roomID.
  // You might want to fetch room details from the server to verify access.

  return (
    <div>
      <h2>Join Room: {roomID}</h2>
      <VideoChatComponent />
    </div>
  );
}

export default JoinRoom;
