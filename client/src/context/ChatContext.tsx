import { io } from "socket.io-client";
import {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
  useEffect,
} from "react";

// export interface User {
//   username: string;
// }

export interface Chat {
  //***/
}

interface ChatContext {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  connectToServer: (username: string) => void;
  clientMessage: (message: string) => void;
  messages: string[];
}

const ChatContext = createContext<ChatContext>({
  username: "",
  setUsername: () => Promise.resolve(),
  connectToServer: () => Promise.resolve(),
  clientMessage: (message: string) => {},
  messages: [],
});
const socket = io("http://localhost:3000/", { autoConnect: false });
export const useChatContext = () => useContext(ChatContext);
const ChatProvider = ({ children }: PropsWithChildren) => {
  const [username, setUsername] = useState("");
  const [roomList, setRoomList] = useState([]);
  const [messages, setMessages] = useState([]);
  //   const [user, setUser] = useState("");
  const connectToServer = (username: string) => {
    socket.connect();
    socket.emit("set_username", username);
  };

  const clientMessage = (message: string) => {
    console.log(message);
    socket.emit("client_message", { message });
  };

  useEffect(() => {
    socket.on("retrieve_message", (message) => {
      setMessages([...messages, message]);
      console.log("USEFFECT", message);
      console.log(messages);
    });
  }, [socket, messages]);

  useEffect(() => {
    socket.on("display_username", (username) => {
      setUsername(username);
      console.log("retrieve  the username:", username);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("room_list", (userList) => {
      console.log(userList);
      setRoomList(userList);
    });
  }, [socket]);
  console.log(roomList);

  return (
    <div>
      <ChatContext.Provider
        value={{
          setUsername,
          username,
          connectToServer,
          clientMessage,
          messages,
        }}
      >
        {children}
      </ChatContext.Provider>
    </div>
  );
};

export default ChatProvider;
