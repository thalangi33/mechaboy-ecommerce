import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import ToastProvider from "./context/ToastContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <>
    <AuthContextProvider>
      <ToastProvider />
      <App />
    </AuthContextProvider>
  </>,
);
