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
  clientMessage: (message: Message) => void;
  messages: Message[];
  setRoom: React.Dispatch<React.SetStateAction<string>>;
  room: string;
}

const ChatContext = createContext<ChatContext>({
  username: "",
  setUsername: () => Promise.resolve(),
  connectToServer: () => Promise.resolve(),
  clientMessage: (message: Message) => {},
  messages: [],
  setRoom: () => {},
  room: "",
});

interface Message {
  author: string;
  message: string;
  timestamp: string;
}

interface Room {
  participants: string[];
  messages: Message[];
}

const socket = io("http://localhost:3000/", { autoConnect: false });
export const useChatContext = () => useContext(ChatContext);
const ChatProvider = ({ children }: PropsWithChildren) => {
  const [username, setUsername] = useState("");
  // const [roomList, setRoomList] = useState([]);
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  //   const [user, setUser] = useState("");
  const connectToServer = (username: string) => {
    socket.connect();
    setRoom("lobby");
    setUsername(username);
  };

  const clientMessage = (messageData: Message) => {
    console.log(messageData);
    socket.emit("client_message", { messageData, room });
  };

  useEffect(() => {
    if (room) {
      socket.emit("join_room", room);
    }
  }, [room]);

  useEffect(() => {
    socket.on("retrieve_message", (data) => {
      console.log("Check if it works here:", data);
      setMessages([...messages, data]);
      console.log("USEFFECT", data);
      console.log(messages);
    });
  }, [socket, messages]);

  // useEffect(() => {
  //   socket.on("room_list", (userList) => {
  //     console.log(userList);
  //     setRoomList(userList);
  //   });
  // }, [socket]);
  // console.log(roomList);

  return (
    <div>
      <ChatContext.Provider
        value={{
          setUsername,
          username,
          connectToServer,
          clientMessage,
          messages,
          setRoom,
          room,
        }}
      >
        {children}
      </ChatContext.Provider>
    </div>
  );
};

export default ChatProvider;
