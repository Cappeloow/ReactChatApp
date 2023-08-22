import { FormEvent, useState } from "react";
import { useChatContext } from "../context/ChatContext";
import "../styles/ChatFooter.css";
type Props = {};

function ChatFooter({}: Props) {
  const { clientMessage, username } = useChatContext();
  const [msg, setMsg] = useState("");

  const handleClick = (e: FormEvent) => {
    const currentTime = new Date();

    // console.log(currentTime.getHours());
    // console.log(currentTime.getMinutes());

    const time = currentTime.getHours() + ":" + currentTime.getMinutes();
    const messageData = {
      author: username,
      message: msg,
      timestamp: time.toString(),
    };

    e.preventDefault();
    clientMessage(messageData);
    setMsg("");
  };

  return (
    <div className="footer">
      <form onSubmit={handleClick} className="formContainer">
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Write message"
          type="text"
        />
        <button>Send</button>
      </form>
    </div>
  );
}

export default ChatFooter;
