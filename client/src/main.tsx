import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {HomePage} from "./features/home/pages/HomePage.tsx";
import "./index.css";
import { SidebarProvider } from "./components/ui/sidebar.tsx";
import { BrowserRouter } from "react-router-dom"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SidebarProvider>
          <HomePage />
      </SidebarProvider>
    </BrowserRouter>
  </StrictMode>,
);
