import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "@/features/home/pages/HomePage";
import { OrderPage } from "@/features/home/pages/OrderPage";

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/OrderPage" element={<OrderPage />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
