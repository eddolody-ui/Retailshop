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

// ✅ မှန်တဲ့ usage
app.use(express.static(path.resolve(__dirname, "../client/dist")));
 // ✅ API routes (example) 
 
app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on PORT : ${PORT}`);
});


