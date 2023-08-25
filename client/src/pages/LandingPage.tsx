import "../styles/LandingPage.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useChatContext } from "../context/ChatContext";

function LandingPage() {
  const { username, setUsername, connectToServer } = useChatContext();

  const navigate = useNavigate();

  const handleClick = (data) => {
    if (data.find((user) => user === username)) {
      alert("the name is already taken");
    } else {
      connectToServer(username);
      navigate("/lobby");
    }
  };

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:3000/getUsers");
    console.log(response);
    const data = await response.json();
    console.log(data);
    handleClick(data);
  };

  return (
    <div className="mainContainer">
      <div className="loginForm">
        <h1>Login</h1>
        <input
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Användarnamn..."
        ></input>
        <button onClick={fetchUsers}>Anslut</button>
      </div>
    </div>
  );
}

export default LandingPage;
