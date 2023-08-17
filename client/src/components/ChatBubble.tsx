import React, { useEffect } from "react";
import { useChatContext } from "../context/ChatContext";
type Props = {};

function ChatBubble({}: Props) {
  const { messages } = useChatContext();
  console.log("TEST!!!", messages);

  return (
    <div className="chatBubbleContainer">
      {messages.map((message, i) => (
        <div key={i}>
          <p>Användarnamn</p>
          <p>{message}</p>
          <p>13:09</p>
        </div>
      ))}
    </div>
  );
}

export default ChatBubble;
