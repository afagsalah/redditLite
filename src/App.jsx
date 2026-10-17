import "./App.css";

import Header from "./components/Header/Header";
import Sidebar from "./components/LeftSidebar/Sidebar";
import HomePage from "./pages/HomePage";
import RightSidebar from "./components/RightSidebar/RightSidebar";

function App() {
  return (
    <>
      <Header />

      <div className="app-layout">
        <Sidebar />
        <HomePage />
        <RightSidebar />
      </div>
    </>
  );
}

export default App;
