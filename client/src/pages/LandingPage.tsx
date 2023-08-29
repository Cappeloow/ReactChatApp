import "../styles/LandingPage.css";
import { useNavigate } from "react-router-dom";
import { useChatContext } from "../context/ChatContext";

function LandingPage() {
  const { username, setUsername, connectToServer } = useChatContext();
  const navigate = useNavigate();

  const handleClick = () => {
    if (username) {
      connectToServer(username);
      navigate("/lobby");
    } else {
      console.log("Enter a username");
    }
  };

  return (
    <div className="mainContainer">
      <div className="loginForm">
        <h1 className="sign-in">Sign in</h1>
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
