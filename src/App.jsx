import "./App.css";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Header />

      <div className="app-layout">
        <Sidebar />
        <HomePage />
      </div>
    </>
  );
}

export default App;
