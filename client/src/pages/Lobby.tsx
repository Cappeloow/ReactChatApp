import React from "react";
import ChatBar from "../components/ChatBar";
import ChatBody from "../components/ChatBody";
import ChatFooter from "../components/ChatFooter";
import ChatHeader from "../components/ChatHeader";
import "../styles/Lobby.css";
import { useChatContext } from "../context/ChatContext";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
function Lobby() {
  const { username } = useChatContext();

  useEffect(() => {
    console.log("Username from Lobby:", username);
  }, []);

  return (
    <div className="lobbyContainer">
      <div className="lobby">
        <ChatHeader />
        <main>
          <div>
            <ChatBar />
          </div>
          <div>
            <ChatBody />
            <ChatFooter />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Lobby;
