import React from "react";
import "../styles/ChatHeader.css";
type Props = {};

function ChatHeader({}: Props) {
  return (
    <header>
      <h1>room name</h1>
      <button>skapa ikon</button>
      <button>Lämna chatt</button>
    </header>
  );
}

export default ChatHeader;
