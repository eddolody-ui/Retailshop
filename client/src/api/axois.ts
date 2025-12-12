import axios from "axios";

const api = axios.create({
  baseURL: "https://example-api-url.com/api",
  headers: { "Content-Type": "application/json" },
});

export default api;
