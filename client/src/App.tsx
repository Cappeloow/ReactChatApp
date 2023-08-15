import { useState } from "react";
import "./App.css";
import { io } from "socket.io-client";

function App() {
  const socket = io("http://localhost:3000/");
  return (
    <div>
      <h1>hej</h1>
    </div>
  );
}

export default App;
