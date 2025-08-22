import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import './tailwind.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById("root")); // 创建 root
root.render(
  <CookiesProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </CookiesProvider>
);

reportWebVitals();