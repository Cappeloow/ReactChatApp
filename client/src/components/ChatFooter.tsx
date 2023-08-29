import { FormEvent, useState } from "react";
import { useChatContext } from "../context/ChatContext";
import "../styles/ChatFooter.css";

let timeout: NodeJS.Timeout;
function ChatFooter() {
  const { clientMessage, username, isMeTyping, setIsMeTyping, room } =
    useChatContext();
  const [msg, setMsg] = useState("");
  const [gif, setGif] = useState();
  const [isGif, setIsGif] = useState(false);

  const handleClick = (e: FormEvent) => {
    e.preventDefault(); // prevents reload on form submit

    if (msg) {
      const currentTime = new Date();

      const time =
        currentTime.getHours().toString().padStart(2, "0") +
        ":" +
        currentTime.getMinutes().toString().padStart(2, "0");
      const messageData = {
        author: username,
        message: msg,
        timestamp: time.toString(),
      };

      console.log(messageData);

      clientMessage(messageData);
      setMsg("");
      setIsGif(false);
    }
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

  async function fetchData() {
    const response = await fetch(
      `https://api.giphy.com/v1/stickers/random?api_key=${
        import.meta.env.VITE_API_KEY
      }&tag=&rating=g`
    );
    const data = await response.json();
    console.log(data);

    setMsg(data.data.images.downsized.url);
  }

  return (
    <div className="footer">
      <form onSubmit={handleClick} className="formContainer">
        {!isGif ? (
          <>
            <textarea
              value={msg}
              onChange={(e) => {
                handleChange(e.target.value);
                if (e.target.value === "/gif") {
                  try {
                    const data = fetchData();
                    setGif(data);
                    setIsGif(true);
                  } catch (error) {
                    console.log(error);
                  }
                }
              }}
              placeholder={`Skriv meddelande till @${room}`}
            />
          </>
        ) : null}
        {isGif ? (
          <>
            <img src={msg} height={100} alt="" />
          </>
        ) : null}
        <button className="send-button">Skicka</button>
      </form>
    </div>
  );
}

export default ChatFooter;
