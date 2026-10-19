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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((previousMode) => {
      const newMode = !previousMode;

      localStorage.setItem("darkMode", newMode.toString());

      return newMode;
    });
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((previous) => !previous);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className={darkMode ? "app dark-mode" : "app"}>
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        toggleMobileMenu={toggleMobileMenu}
      />

      <div className="app-layout">
        {mobileMenuOpen && (
          <div
            className="mobile-overlay"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
        )}
        <div
          className={mobileMenuOpen ? "mobile-sidebar open" : "mobile-sidebar"}
        >
          <Sidebar onNavigate={closeMobileMenu} />
        </div>

        <div className="desktop-sidebar">
          <Sidebar />
        </div>

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
