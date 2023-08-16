import React from "react";
import { useChatContext } from "../context/ChatContext";
type Props = {};

function ChatBubble({}: Props) {
  const { user } = useChatContext();
  return (
    <div className="chatBubbleContainer">
      <p>{user}</p>
      <p>Tja, hur är läget?</p>
      <p>13:09</p>
    </div>
  );
}

export default ChatBubble;
