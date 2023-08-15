import React from "react";

type Props = {};

function ChatBubble({}: Props) {
  return (
    <>
      <div>
        <span>username</span>
        <div>
          <p>meddelande/text</p>
        </div>
        <span>time</span>
      </div>
    </>
  );
}

export default ChatBubble;
