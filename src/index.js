import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter basename="/swp391-su26-ai-audit-project-swp391_se20a04_group-02-2">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);