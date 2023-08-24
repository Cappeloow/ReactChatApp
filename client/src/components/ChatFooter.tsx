import { FormEvent, useState } from "react";
import { useChatContext } from "../context/ChatContext";
import "../styles/ChatFooter.css";
type Props = {};

let timeout; // NodeJS.Timeout as its type?
function ChatFooter({}: Props) {
  const { clientMessage, username, isMeTyping, setIsMeTyping } = useChatContext();
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
  
  const handleChange = (inputValue: string) => {
    setMsg(inputValue);

    if (!isMeTyping) {
      setIsMeTyping(true);
    }

    clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      setIsMeTyping(false);
    }, 500);
  };

  return (
    <div className="footer">
      <form onSubmit={handleClick} className="formContainer">
        <input
          value={msg}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Write message"
          type="text"
        />
        <button>Send</button>
      </form>
    </div>
  );
}

export default ChatFooter;
