import React, { useState, useEffect } from "react";
import Home from "./pages/Home.jsx";
import MyListings from "./pages/MyListings.jsx";
import AddListing from "./pages/AddListing.jsx";
import Account from "./pages/Account.jsx";

export default function App() {
  const [tab, setTab] = useState("home");

  useEffect(() => {
    document.title = "مِسباحي — سوق المسابيح";
  }, []);

  const render = () => {
    if (tab === "home") return <Home />;
    if (tab === "my") return <MyListings />;
    if (tab === "add") return <AddListing />;
    if (tab === "account") return <Account />;
    return <Home />;
  };
// deploy

  return (
    <div className="app-container">
      {render()}
      <nav className="bottom-nav">
        <button onClick={() => setTab("home")} className={tab === "home" ? "active" : ""}>🏠 الرئيسية</button>
        <button onClick={() => setTab("my")} className={tab === "my" ? "active" : ""}>📣 إعلاناتي</button>
        <button onClick={() => setTab("add")} className={tab === "add" ? "add-btn" : "add"}>➕ إضافة</button>
        <button onClick={() => setTab("account")} className={tab === "account" ? "active" : ""}>👤 حسابي</button>
      </nav>
    </div>
  );
}
