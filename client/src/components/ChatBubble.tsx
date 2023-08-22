import { useChatContext } from "../context/ChatContext";
import "../styles/ChatBubble.css";
type Props = {};

function ChatBubble({}: Props) {
  const { messages } = useChatContext();

  return (
    <div className="chatBubbleContainer">
      {messages.map((message, i) => (
        <div key={i}>
          <div className="info">
            <p>{message.author}</p>
            <p>{message.timestamp}</p>
          </div>
          <div className="bubble">
            <p>{message.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatBubble;
