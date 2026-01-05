import "dotenv/config";
import { app } from "./app";
import { connectDB } from "./config/db";
import { ENV_VARS } from "./config/envVars";
import path from "path";
import express from "express";
 
const PORT = ENV_VARS.PORT || 5000;

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" })
})

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on PORT : ${PORT}`);
});


