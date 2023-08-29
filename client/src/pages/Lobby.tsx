import React from "react";
import ChatBar from "../components/ChatBar";
import ChatBody from "../components/ChatBody";
import ChatFooter from "../components/ChatFooter";
import ChatHeader from "../components/ChatHeader";
import "../styles/Lobby.css";
import { useChatContext } from "../context/ChatContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Lobby() {
  const { username } = useChatContext();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Username from Lobby:", username);
  }, []);

  return (
    <>
      {username ? (
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
      ) : (
        useEffect(() => {
          navigate("/")
        }, [])
      )}
    </>
  );
}

export default Lobby;
