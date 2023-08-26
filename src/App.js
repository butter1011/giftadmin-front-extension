import "./App.css";
import { Route, Routes } from "react-router-dom";
import GiftCardTable from "./components/GiftCardTable/GiftCardTable";
import Navbar from "./components/navbar/Navbar";
import RetailerTable from "./components/RetailerTable/RetailerTable";
import StoredTable from "./components/storedTable/StoredTable";
import StatisticTable from "./components/StatisticTable/StatisticTable";
import Footer from "./components/Footer/footer";
import { useState, useEffect } from "react";
import Login from "./components/Login/Login";
import { useNavigate } from "react-router-dom";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    sessionStorage.setItem("isLoggedIn", "true");
    setLoggedIn(true);
    navigate("/");
  };

  // Log out the user and remove the value from sessionStorage
  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    setLoggedIn(false);
    navigate("/");
  };
  return (
    <div
      className="App"
      style={{
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      {isLoggedIn ? <Navbar handleLogout={handleLogout} /> : <></>}
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <GiftCardTable /> : <Login handleLogin={handleLogin} />
          }
        />
        <Route path="/home/retailerTable" element={<RetailerTable />} />
        <Route path="/home/storedTable" element={<StoredTable />} />
        <Route path="/home/statisticTable" element={<StatisticTable />} />
        <Route
          path="*"
          element={
            <div>
              {" "}
              <img src="/imgs/nodata.png" alt="page not found"></img>{" "}
            </div>
          }
        />
      </Routes>
      {isLoggedIn ? <Footer /> : <></>}
    </div>
  );
}

export default App;
