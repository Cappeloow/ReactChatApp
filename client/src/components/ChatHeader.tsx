import { useState } from "react";
import "../styles/ChatHeader.css";

import { useChatContext } from "../context/ChatContext";
function ChatHeader() {
  const [showModal, setShowModal] = useState(false);
  const [newRoom, setNewRoom] = useState("");
  const { setRoom, room } = useChatContext();
  const handelClick = () => {
    setShowModal(false);
    setRoom(newRoom);
  };

  return (
    <header>
      <h1>{room}</h1>
      <div className="button-container">
        <button onClick={() => setShowModal(true)}>Skapa Rum</button>
        {showModal ? (
          <dialog open>
            <button onClick={() => setShowModal(false)}>X</button>
            <p>Skapa ett rum</p>
            <form method="dialog">
              <input type="text" onChange={(e) => setNewRoom(e.target.value)} />
              <button onClick={handelClick}>OK</button>
            </form>
          </dialog>
        ) : null}
        <button onClick={() => setRoom("lobby")}>Lämna Rum</button>
      </div>
    </header>
  );
}

export default ChatHeader;
