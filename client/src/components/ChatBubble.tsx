import React from "react";

type Props = {};

function ChatBubble({ }: Props) {
  return (
    <div className="chatBubbleContainer">
      <p>Användarnamn</p>
      <p>Tja, hur är läget?</p>
      <p>13:09</p>
    </div>
  );
}

export default ChatBubble;
