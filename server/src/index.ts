import "dotenv/config";
import { app } from "./app";
import { connectDB } from "./config/db";
import { ENV_VARS } from "./config/envVars";
import path from "path";
import express from "express";
 
const PORT = ENV_VARS.PORT || 5000;
// ✅ Serve static files from client/dist 
app.use(express.static(path.join(__dirname, "../client/dist"))); 
// ✅ Catch-all route for React Router 
// ❌ မမှန်တဲ့ usage
// app.get("/*", ...)
// app.get("*", ...)

// ✅ မှန်တဲ့ usage
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on PORT : ${PORT}`);
});

