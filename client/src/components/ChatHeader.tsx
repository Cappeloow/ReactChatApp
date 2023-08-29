import { useState } from "react";
import "../styles/ChatHeader.css";
type Props = {};
import { useChatContext } from "../context/ChatContext";
function ChatHeader({}: Props) {
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
        <button className="header-button" onClick={() => setShowModal(true)}>
          New Room
        </button>
        {showModal ? (
          <dialog open>
            <button onClick={() => setShowModal(false)}>X</button>
            <p className="dialog-title">New room</p>
            <form method="dialog">
              <input
                placeholder="Room name"
                type="text"
                onChange={(e) => setNewRoom(e.target.value)}
              />
              <button className="dialog-create-button" onClick={handelClick}>
                Create
              </button>
            </form>
          </dialog>
        ) : null}
        <button className="header-button" onClick={() => setRoom("lobby")}>
          Leave Room
        </button>
      </div>
    </header>
  );
}

export default ChatHeader;
