import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import HomePage from "./features/home/pages/HomePage.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HomePage />
  </StrictMode>,
);
