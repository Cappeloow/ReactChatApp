import React from "react";
import ChatBar from "../components/ChatBar";
import ChatBody from "../components/ChatBody";
import ChatFooter from "../components/ChatFooter";
import ChatHeader from "../components/ChatHeader";
import "../styles/Lobby.css";
import { useChatContext } from "../context/ChatContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
function Lobby() {
  const { username } = useChatContext();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Username from Lobby:", username);
  }, []);

  return (
    <div className="lobbyContainer">
      {username ? (
        <div className="lobby">
          <ChatBar />
          <main>
            <ChatHeader />
            <ChatBody />
            <ChatFooter />
          </main>
        </div>
      ) : (
        <div className="tryAgainDiv">
          <p>Username is already in use, please try a different one!</p>
          <button onClick={() => navigate("/")} className="backBtn">
            GO BACK
          </button>
        </div>
      )}
    </div>
  );
}

export default Lobby;
