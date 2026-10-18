import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Sidebar from "./components/LeftSidebar/Sidebar";
import RightSidebar from "./components/RightSidebar/RightSidebar";

import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";

import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");

    return savedMode === "true";
  });

  const toggleDarkMode = () => {
    setDarkMode((previousMode) => {
      const newMode = !previousMode;

      localStorage.setItem("darkMode", newMode.toString());

      return newMode;
    });
  };

  return (
    <div className={darkMode ? "app dark-mode" : "app"}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className="app-layout">
        <Sidebar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<PostPage />} />
        </Routes>

        <RightSidebar />
      </div>
    </div>
  );
}

export default App;
