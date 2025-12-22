import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "@/features/home/pages/HomePage";
import { Order } from "@/features/home/pages/Order";
import { CreateOrderForm } from "@/features/home/pages/CreateOrder";
import { Shipper } from "./features/home/pages/Shipper";
import { CreateShipper } from "./features/home/pages/CreateShipper";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Order" element={<Order />} />
            <Route path="/Order/CreateOrder" element={<CreateOrderForm />}/>
            <Route path="/Shipper" element={<Shipper/>}/>
            <Route path="/Shipper/CreateShipper" element={<CreateShipper/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
