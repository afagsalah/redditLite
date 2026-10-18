import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Sidebar from "./components/LeftSidebar/Sidebar";
import RightSidebar from "./components/RightSidebar/RightSidebar";

import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";

import "./App.css";

function App() {
  return (
    <>
      <Header />

      <div className="app-layout">
        <Sidebar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<PostPage />} />
        </Routes>

        <RightSidebar />
      </div>
    </>
  );
}

export default App;
