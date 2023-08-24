import { FormEvent, useState, useEffect } from "react";
import { useChatContext } from "../context/ChatContext";
import "../styles/ChatFooter.css";
type Props = {};

function ChatFooter({}: Props) {
  const { clientMessage, username } = useChatContext();
  const [msg, setMsg] = useState("");
  const [gif, setGif] = useState();
  const handleClick = (e: FormEvent) => {
    const currentTime = new Date();

    const time = currentTime.getHours() + ":" + currentTime.getMinutes();
    const messageData = {
      author: username,
      message: msg,
      timestamp: time.toString(),
    };

    console.log(messageData);

    e.preventDefault();
    clientMessage(messageData);
    setMsg("");
  };

  async function fetchData() {
    const response = await fetch(
      "https://api.giphy.com/v1/stickers/random?api_key=LLpks0CtHAogXzGUi9w2gUh3f92qUP1w&tag=&rating=g"
    );
    const data = await response.json();
    console.log(data);

    setMsg(data.data.images.downsized.url);
  }

  return (
    <div className="footer">
      <form onSubmit={handleClick} className="formContainer">
        <input
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
            if (e.target.value === "/gif") {
              const data = fetchData();
              setGif(data);
            }
          }}
          placeholder="Write message"
          type="text"
        />
        <button>Send</button>
      </form>
    </div>
  );
}

export default ChatFooter;
