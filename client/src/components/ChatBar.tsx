import "../styles/ChatBar.css";
import { useChatContext } from "../context/ChatContext";

type Props = {};

function ChatBar({}: Props) {
  const { roomList, setRoom } = useChatContext();
  console.log("roomList:", roomList);

  return (
    <aside>
      <h1>Chatt App</h1>
      <h2>Rum:</h2>

      {roomList.map((room, i) => (
        <ul key={i}>
          <li onClick={() => setRoom(room.name)}>{room.name}</li>
          {/* <ul>
            <li>{room.participants.map((participant) => participant)}</li>
          </ul> */}
          {room.participants.map((participant, i) => (
            <ul key={i}>
              <li>{participant}</li>
            </ul>
          ))}
        </ul>
      ))}
    </aside>
  );
}

export default ChatBar;
