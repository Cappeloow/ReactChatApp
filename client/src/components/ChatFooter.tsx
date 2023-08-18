import { FormEvent, useState } from "react";
import { useChatContext } from "../context/ChatContext";
type Props = {};

function ChatFooter({}: Props) {
  const { clientMessage, username } = useChatContext();
  const [msg, setMsg] = useState("");

  const handleClick = (e: FormEvent) => {
    console.log("ser vad vi får:", username);
    const messageData = {
      author: username,
      message: msg,
      timestamp: "",
    };

    e.preventDefault();
    clientMessage(messageData);
    setMsg("");
  };

  return (
    <div>
      <form onSubmit={handleClick}>
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
