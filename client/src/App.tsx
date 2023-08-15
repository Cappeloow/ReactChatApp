import { useState } from "react";
import "./App.css";
import { io } from "socket.io-client";
import LandingPage from "./pages/LandingPage";
function App() {
  const socket = io("http://localhost:3000/");
  return (
    <>
      <LandingPage />
    </>
  );
}

export default App;
