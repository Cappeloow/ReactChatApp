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
});

export const useChatContext = () => useContext(ChatContext);

const ChatProvider = ({ children }: PropsWithChildren) => {
  const [username, setUsername] = useState("");

  return (
    <div>
      <ChatContext.Provider value={{ setUsername, username }}>
        {children}
      </ChatContext.Provider>
    </div>
  );
};

export default ChatProvider;
