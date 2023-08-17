import { FormEvent, useState } from "react";
import { useChatContext } from "../context/ChatContext";
type Props = {};

function ChatFooter({}: Props) {
  const { clientMessage } = useChatContext();
  const [msg, setMsg] = useState("");

  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    clientMessage(msg);
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
