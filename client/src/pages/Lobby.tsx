import React from "react";
import ChatBar from "../components/ChatBar";
import ChatBody from "../components/ChatBody";
import ChatFooter from "../components/ChatFooter";
import ChatHeader from "../components/ChatHeader";
import "../styles/Lobby.css";
import { useChatContext } from "../context/ChatContext";
import { useEffect } from "react";
import { io } from "socket.io-client";
function Lobby() {
  const { username } = useChatContext();

  useEffect(() => {
    console.log("Username from Lobby:", username);
  }, []);

  return (
    <div className="lobbyContainer">
      <ChatBar />
      <main>
        <ChatHeader />
        <ChatBody />
        <ChatFooter />
      </main>
    </div>
  );
}

export default Lobby;
