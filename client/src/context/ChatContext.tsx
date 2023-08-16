import { io } from "socket.io-client";
import {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
  useEffect,
} from "react";

interface ChatContext {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  connectToServer: (username: string) => Promise<void>;
}

// export interface User {
//   username: string;
// }

export interface Chat {
  //***/
}

const ChatContext = createContext<ChatContext>({
  username: "",
  setUsername: () => Promise.resolve(),
  connectToServer: () => Promise.resolve(),
});

export const useChatContext = () => useContext(ChatContext);
const ChatProvider = ({ children }: PropsWithChildren) => {
  const socket = io("http://localhost:3000/", { autoConnect: false });
  const [username, setUsername] = useState("");
  const [roomList, setRoomList] = useState([]);
  //   const [user, setUser] = useState("");
  const connectToServer = (username: string) => {
    socket.connect();
    socket.emit("set_username", username);
  };

  useEffect(() => {
    socket.on("display_username", (username) => {
      setUsername(username);
      console.log("retrieve  the username:", username);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("room_list", (userList) => {
      console.log(userList);
      setRoomList((prev) => [...prev, userList]);
      console.log(roomList);
    });
  }, [socket]);

  return (
    <div>
      <ChatContext.Provider value={{ setUsername, username, connectToServer }}>
        {children}
      </ChatContext.Provider>
    </div>
  );
};

export default ChatProvider;
