import React from "react";
import "../styles/ChatBar.css";

type Props = {};
import { useChatContext } from "../context/ChatContext";
function ChatBar({}: Props) {
  const { roomList } = useChatContext();
  console.log(roomList);
  return (
    <aside>
      <h1>Chatt App</h1>
      <h2>
        Rum:
        {roomList.map((room, i) => (
          <div key={i}>{room}</div>
        ))}
      </h2>
      <h3>Rumnamn</h3>
    </aside>
  );
}

export default ChatBar;
