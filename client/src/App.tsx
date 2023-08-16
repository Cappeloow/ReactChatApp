import { useState } from "react";
import "./App.css";
import Lobby from "./pages/Lobby";
import LandingPage from "./pages/LandingPage";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/lobby" element={<Lobby />} />
      </Routes>
    </>
  );
}

export default App;
