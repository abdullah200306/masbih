// App.jsx ✅ (Arabic / Bottom Navigation / Guest Mode)

import React, { useState } from "react";
import Home from "./pages/Home.jsx";
import MyListings from "./pages/MyListings.jsx";
import AddListing from "./pages/AddListing.jsx";
import Account from "./pages/Account.jsx";

export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null); // Guest mode: null = ضيف

  const renderPage = () => {
    if (!user) {
      // ضيف يشوف فقط الرئيسية
      return <Home user={user} />;
    }

    switch (page) {
      case "home":
        return <Home user={user} />;
      case "add":
        return <AddListing user={user} />;
      case "my":
        return <MyListings user={user} />;
      case "account":
        return <Account user={user} setUser={setUser} />;
      default:
        return <Home user={user} />;
    }
  };

  return (
    <div style={{ direction: "rtl", fontFamily: "Tahoma" }}>
      <div style={{ minHeight: "90vh" }}>{renderPage()}</div>

      {/* ✅ Bottom Navigation Bar */}
      <div
        style={{
          height: "60px",
          backgroundColor: "#FF7A00",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          color: "white",
          fontSize: "14px",
        }}
      >
        <button
          style={btnStyle}
          onClick={() => setPage("account")}
        >
          حسابي
        </button>

        <button
          style={btnStyle}
          onClick={() => setPage("my")}
          disabled={!user}
        >
          إعلاناتي
        </button>

        <button
          style={btnStyle}
          onClick={() => setPage("add")}
          disabled={!user}
        >
          أعلن
        </button>

        <button
          style={btnStyle}
          onClick={() => setPage("home")}
        >
          الرئيسية
        </button>
      </div>
    </div>
  );
}

const btnStyle = {
  background: "transparent",
  border: "none",
  color: "white",
  fontSize: "15px",
  cursor: "pointer",
};
