import React from "react";
import "../styles/ChatBar.css";

type Props = {};
import { useChatContext } from "../context/ChatContext";
function ChatBar({}: Props) {
  const { roomList, setRoom } = useChatContext();
  console.log(roomList);
  return (
    <aside>
      <h1>Chatt App</h1>
      <h2>
        Rum:
        {roomList.map((room, i) => (
          <ul key={i}>
            <li onClick={() => setRoom(room)}>{room}</li>
          </ul>
        ))}
      </h2>
      <h3>Rumnamn</h3>
    </aside>
  );
}

export default ChatBar;
