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
      <p>
        Rum:
        {roomList.map((room, i) => (
          <ul key={i}>
            <li onClick={() => setRoom(room.name)}>{room.name}</li>
          </ul>
        ))}
      </p>
      <p>medlemmar</p>
      <div>
        {roomList.map((room, i) => (
          <ul key={i}>
            <li>{room.participants}</li>
          </ul>
        ))}
      </div>
    </aside>
  );
}

export default ChatBar;
