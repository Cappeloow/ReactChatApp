import React from "react";
import "../styles/LandingPage.css";
import { useNavigate } from "react-router-dom";
type Props = {};

function LandingPage({}: Props) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/lobby");
  };
  return (
    <div className="mainContainer">
      <div className="loginForm">
        <h1>Login</h1>
        <input placeholder="Användarnamn..."></input>
        <button onClick={handleClick}>Anslut</button>
      </div>
    </div>
  );
}

export default LandingPage;
