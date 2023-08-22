import { FormEvent, useState } from "react";
import { useChatContext } from "../context/ChatContext";
import "../styles/ChatFooter.css";
type Props = {};

function ChatFooter({}: Props) {
  const { clientMessage, username, setIsTyping, isTyping } = useChatContext();
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

  const handleKeyDown = () => {
    setIsTyping(true);

    const testTimeOut = setTimeout(() => {
      console.log("test timeout");
    }, 1000);

    clearTimeout(testTimeOut);

    // setTimeout(() => {
    //   // if här
    //   if (isTyping) {
    //     setIsTyping(false);
    //   }
    //   // console.log("time is over");
    //   // setIsTyping(false);
    // }, 1000);

    // if (isTyping) {
    //   setTimeout(() => {
    //     setIsTyping(false);
    //   }, 1000);
    // }

    // setInterval(() => {
    //   console.log("interval");
    // }, 1000);
  };

  return (
    <div className="footer">
      <form onSubmit={handleClick} className="formContainer">
        <input
          onKeyDown={handleKeyDown}
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
