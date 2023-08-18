import { useState } from "react";
import "../styles/ChatHeader.css";
type Props = {};

function ChatHeader({}: Props) {
  const [showModal, setShowModal] = useState(false);

  const handelClick = () => {
    setShowModal(true);
  };

  return (
    <header>
      <h1>room name</h1>
      <button onClick={() => setShowModal(true)}>Skapa Rum</button>
      {showModal ? (
        <dialog open>
          <button onClick={() => setShowModal(false)}>X</button>
          <p>Skapa ett rum</p>
          <form method="dialog">
            <input type="text" />
            <button onClick={handelClick}>OK</button>
          </form>
        </dialog>
      ) : null}
      <button>Lämna Rum</button>
    </header>
  );
}

export default ChatHeader;
