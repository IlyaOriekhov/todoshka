import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "/src/client/src/App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
