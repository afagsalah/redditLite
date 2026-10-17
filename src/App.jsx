import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
function App() {
  return (
    <>
      <Header />
      <div className="app-layout">
        <Sidebar />

        <main className="main-content">
          <h1>Home</h1>
          <p>Discover what's happening today</p>
        </main>
      </div>
    </>
  );
}

export default App;
