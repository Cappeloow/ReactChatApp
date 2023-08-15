import React from "react";

type Props = {};

function ChatFooter({}: Props) {
  return (
    <div>
      <input placeholder="Write message" type="text" />
      <button>Send</button>
    </div>
  );
}

export default ChatFooter;
