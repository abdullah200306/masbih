import React, { useState, useEffect } from "react";
import Home from "./pages/Home.jsx";
import MyListings from "./pages/MyListings.jsx";
import AddListing from "./pages/AddListing.jsx";
import Account from "./pages/Account.jsx";

export default function App() {
  const [tab, setTab] = useState("home");

  useEffect(() => {
    document.title = "مِسباحي — سوق المسابيح";
    document.body.style.background = "#0b0b0e";
    document.body.style.color = "#e5e7eb";
  }, []);

  const render = () => {
    if (tab === "home") return <Home />;
    if (tab === "my") return <MyListings />;
    if (tab === "add") return <AddListing />;
    if (tab === "account") return <Account />;
    return <Home />;
  };

  return (
    <div style={{ direction: "rtl", minHeight: "100vh", paddingBottom: 74 }}>
      {render()}

      <nav className="bottom-nav">
        <button onClick={() => setTab("account")} className="nav-item" title="حسابي">👤 حسابي</button>
        <button onClick={() => setTab("my")} className="nav-item" title="إعلاناتي">📣 إعلاناتي</button>
        <button onClick={() => setTab("add")} className="nav-item add" title="إضافة">➕ إضافة</button>
        <button onClick={() => setTab("home")} className="nav-item" title="الرئيسية">🏠 الرئيسية</button>
      </nav>
    </div>
  );
}
