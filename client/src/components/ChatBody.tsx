import React from "react";
import ChatBubble from "./ChatBubble";
type Props = {};
import "../styles/ChatBody.css";
function ChatBody({}: Props) {
  return (
    <div className="ChatBodyBorder">
      <ChatBubble />
    </div>
  );
}

export default ChatBody;
