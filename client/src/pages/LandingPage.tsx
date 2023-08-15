import React from "react";
import "../styles/LandingPage.css";
type Props = {};

function LandingPage({}: Props) {
  return (
    <div className="mainContainer">
      <div className="loginForm">
        <h1>Login</h1>
        <input placeholder="Användarnamn..."></input>
        <button>Anslut</button>
      </div>
    </div>
  );
}

export default LandingPage;
