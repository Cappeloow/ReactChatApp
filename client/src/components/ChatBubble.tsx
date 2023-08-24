import { useChatContext } from "../context/ChatContext";
import "../styles/ChatBubble.css";
type Props = {};

function ChatBubble({}: Props) {
  const { messages, isTheyTyping } = useChatContext();

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

      <p>{isTheyTyping.typing? (`${isTheyTyping.username} 💬`) : ""}</p>
      
    </div>
  );
}

export default ChatBubble;
