import React from "react";
import ChatBar from "../components/ChatBar";
import ChatBody from "../components/ChatBody";
import ChatFooter from "../components/ChatFooter";
import ChatHeader from "../components/ChatHeader";
type Props = {};

function Lobby({}: Props) {
  return (
    <>
      <ChatHeader />
      <ChatBar />
    </>
  );
}

export default Lobby;
