import { io } from "socket.io-client";
import {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
  useEffect,
} from "react";

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
  roomList: [];
  setIsMeTyping: React.Dispatch<React.SetStateAction<boolean>>;
  isMeTyping: boolean;
  isTheyTyping: {};
  setIsTheyTyping: {};
}

const ChatContext = createContext<ChatContext>({
  username: "",
  setUsername: () => Promise.resolve(),
  connectToServer: () => Promise.resolve(),
  clientMessage: (message: Message) => {},
  messages: [],
  setRoom: () => {},
  room: "",
  roomList: [],
  setIsMeTyping: Boolean,
  isMeTyping: false,
  isTheyTyping: {},
  setIsTheyTyping: {},
});

interface Message {
  author: string;
  message: string;
  timestamp: string;
}

interface Room {
  name: "";
  participants: string[];
}

const socket = io("http://localhost:3000/", { autoConnect: false });
export const useChatContext = () => useContext(ChatContext);

const ChatProvider = ({ children }: PropsWithChildren) => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [roomList, setRoomList] = useState<Room[]>([]);
  const [isMeTyping, setIsMeTyping] = useState(false);
  const [isTheyTyping, setIsTheyTyping] = useState({username: "", typing: false});

  console.log("isMeTyping:", isMeTyping);

  const connectToServer = (username: string) => {
    setRoom("lobby");
    socket.connect();

    socket.emit("username_input", username);
  };

  const clientMessage = (messageData: Message) => {
    socket.emit("client_message", { messageData, room });
  };

  useEffect(() => {
    if (room) {
      socket.emit("join_room", room);
    }
  }, [room]);

  useEffect(() => {
    socket.on("retrieve_message", (data) => {
      setMessages([...messages, data]);
    });
  }, [socket, messages]);

  useEffect(() => {
    socket.on("room_list", (roomList) => {
      console.log(roomList);
      setRoomList(roomList);
    });
  }, [socket]);

  useEffect(() => {
    socket.emit("client_typing", { room, username, isMeTyping });
  }, [isMeTyping]);

  useEffect(() => {
    socket.on("they_typing", (name, typing) => {
      console.log(name, typing);
      setIsTheyTyping({username: name, typing: typing});
    });
  }, [socket]);

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
          roomList,
          setIsMeTyping,
          isMeTyping,
          isTheyTyping,
          setIsTheyTyping,
        }}
      >
        {children}
      </ChatContext.Provider>
    </div>
  );
};

export default ChatProvider;
