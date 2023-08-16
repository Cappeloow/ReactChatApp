import React from "react";
import "../styles/LandingPage.css";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { useChatContext } from "../context/ChatContext";
function LandingPage() {
  const { username, setUsername } = useChatContext();
  const socket = io("http://localhost:3000/", { autoConnect: false });
  const navigate = useNavigate();

  const handleClick = () => {
    if (username !== "") {
      socket.connect();
      navigate("/lobby");
    } else {
      console.log("Enter a username");
    }
  };
  return (
    <div className="mainContainer">
      <div className="loginForm">
        <h1>Login</h1>
        <input
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Användarnamn..."
        ></input>
        <button onClick={handleClick}>Anslut</button>
      </div>
    </div>
  );
}

export default LandingPage;
