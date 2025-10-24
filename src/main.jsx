import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// import "./style.css"; // فعل إذا نقلنا style.css لـ src
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
