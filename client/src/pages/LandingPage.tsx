import React from "react";
import "../styles/LandingPage.css";
// import { useNavigation } from "react";
type Props = {};

function LandingPage({}: Props) {
  // const navigate = useNavigation();
  const handleClick = () => {
    // navigate("/lobby");
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
