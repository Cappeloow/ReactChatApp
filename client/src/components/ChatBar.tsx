import "../styles/ChatBar.css";
import { useChatContext } from "../context/ChatContext";

function ChatBar() {
  const { roomList, setRoom } = useChatContext();

  return (
    <aside>
      <h2>Rum:</h2>

      {roomList.map((room, i) => (
        <div className="room-bubble" key={i}>
          <h3
            className="room-title"
            onClick={() => setRoom(room.name)}
            style={{ cursor: "pointer" }}
          >
            {room.name}
          </h3>
          <div className="user-list">
            {room.participants.map((participant, i) => (
              <ul key={i}>
                <li>{participant}</li>
              </ul>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}

export default ChatBar;
