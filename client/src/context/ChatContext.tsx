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

const defaultValueIsTheyTyping = {
  username: "",
  typing: false,
};

interface ChatContext {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  connectToServer: (username: string) => void;
  clientMessage: (message: Message) => void;
  messages: Message[];
  setRoom: React.Dispatch<React.SetStateAction<string>>;
  room: string;
  roomList: Room[];
  setIsMeTyping: React.Dispatch<React.SetStateAction<boolean>>;
  isMeTyping: boolean;
  isTheyTyping: TypingInfo;
  setIsTheyTyping: React.Dispatch<React.SetStateAction<TypingInfo>>;
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
  isTheyTyping: defaultValueIsTheyTyping,
  setIsTheyTyping: () => {},
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

export interface TypingInfo {
  username: string;
  typing: boolean;
}

const socket = io("http://localhost:3000/", { autoConnect: false });
export const useChatContext = () => useContext(ChatContext);

const ChatProvider = ({ children }: PropsWithChildren) => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [roomList, setRoomList] = useState<Room[]>([]);
  const [usernameList, setUsernameList] = useState<string[]>([]);
  const [isMeTyping, setIsMeTyping] = useState(false);
  const [isTheyTyping, setIsTheyTyping] = useState<TypingInfo>({
    username: "",
    typing: false,
  });

  console.log("isMeTyping:", isMeTyping);

  const connectToServer = (username: string) => {
    socket.connect();
    console.log(usernameList);
    console.log("this is the username:", username);
    socket.emit("username_input", username);
    setRoom("lobby");
  };

  useEffect(() => {
    socket.on("list_of_users", (userList) => {
      setUsernameList(userList);
      console.log("Updated user list:", userList);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("username_taken", () => {
      console.log("Username is taken. Please choose a different username.");
      setUsername("");
    });
  }, [socket]);

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
    socket.on("they_typing", (name: string, typing: boolean) => {
      console.log(name, typing);
      setIsTheyTyping({ username: name, typing: typing });
    });
  }, [socket]);
  
  useEffect(() => {
    socket.on("updated_room_list", (data) => {
      console.log(data);
      setRoomList(data);
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
