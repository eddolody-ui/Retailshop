import axios from "axios";

const api = axios.create({
  baseURL: "https://retail-shop-backend.onrender.com/api",

  headers: { "Content-Type": "application/json" },
});
export default api;

