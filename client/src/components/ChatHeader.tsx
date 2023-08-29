import { useState } from "react";
import "../styles/ChatHeader.css";
import { useChatContext } from "../context/ChatContext";

function ChatHeader() {
  const [showModal, setShowModal] = useState(false);
  const [newRoom, setNewRoom] = useState("");
  const { setRoom, room, username } = useChatContext();
  
  const handelClick = () => {
    setShowModal(false);
    setRoom(newRoom);
  };

  return (
    <header>
      <img style={{width: 50}} src="chat-app.svg" />
      <h1>{`${username} #${room}`}</h1>
      <div className="button-container">
        <button className="header-button" onClick={() => setShowModal(true)}>
          Nytt rum
        </button>
        {showModal ? (
          <dialog open>
            <button onClick={() => setShowModal(false)}>X</button>
            <p className="dialog-title">Skapa ett nytt rum</p>
            <form method="dialog">
              <input
                placeholder="Rumsnamn"
                type="text"
                onChange={(e) => setNewRoom(e.target.value)}
              />
              <button className="dialog-create-button" onClick={handelClick}>
                Skapa
              </button>
            </form>
          </dialog>
        ) : null}
        {room !== "lobby" ? 
        (
          <button className="header-button" onClick={() => setRoom("lobby")}>
            Lämna rum
          </button>
        )
        :
        (
          <button className="header-button header-button-disabled">
            Lämna rum
          </button>
        )
        }
      </div>
    </header>
  );
}

export default ChatHeader;
