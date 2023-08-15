import React from "react";
import ChatBar from "../components/ChatBar";
import ChatBody from "../components/ChatBody";
import ChatFooter from "../components/ChatFooter";
import ChatHeader from "../components/ChatHeader";
import "../styles/Lobby.css";
type Props = {};

function Lobby({}: Props) {
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