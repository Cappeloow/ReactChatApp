import { useChatContext } from "../context/ChatContext";
import ScrollToBottom from "react-scroll-to-bottom";
import "../styles/ChatBubble.css";
type Props = {};

function ChatBubble({}: Props) {
  const { messages, username } = useChatContext();

  return (
    <div className="chatBubbleContainer">
      <ScrollToBottom className="chatBubbleContainer">
        {messages.map((message, i) => (
          <div key={i} id={username === message.author ? "you" : "other"}>
            <div className="info">
              <p>{message.author}</p>
              <p>{message.timestamp}</p>
            </div>
            <div className="bubble">
              {message.message.startsWith("https://") ? (
                <img src={message.message} alt="Image" height={100} />
              ) : (
                <p>{message.message}</p>
              )}
            </div>
          </div>
        ))}
      </ScrollToBottom>
    </div>
  );
}

export default ChatBubble;
