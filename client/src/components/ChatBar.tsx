import React from "react";
import "../styles/ChatBar.css";

type Props = {};
import { useChatContext } from "../context/ChatContext";
function ChatBar({}: Props) {
  const {} = useChatContext();
  return (
    <aside>
      <h1>Chatt App</h1>
      <h2>Rum:</h2>
      <h3>Rumnamn</h3>
    </aside>
  );
}

export default ChatBar;
