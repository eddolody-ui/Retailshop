import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { json, urlencoded } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { ENV_VARS } from "./config/envVars";
// import { errorHandler } from "./middlewares/errorHandler";
// import routes from "./routes/v1";
import orderRoutes from "./order.rout";
import shipperRoutes from "./shipper.rout";
import routeRoutes from "./route.rout";
import * as path from "path"

export const app = express();
console.log(ENV_VARS.CLIENT_URL);

const whiteList = [ENV_VARS.CLIENT_URL, "http://localhost:5173", "http://localhost:5174", "http://localhost:5175"];
const corsOptions = {
  origin: function (
    origin: any,
    callback: (err: Error | null, origin?: any) => void
  ) {
    // allow requests with no origin (eg. mobile app and curl request(s) like postman third party software)
    if (!origin) return callback(null, true);
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      console.log("CORS blocked origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies or authorization header
};

app
  .use(morgan("dev"))
  .use(urlencoded({ extended: true }))
  .use(json({ verify: (req: any, _res, buf: Buffer) => { req.rawBody = buf.toString(); } }))
  .use(cookieParser())
  .use(cors(corsOptions))
  .use(helmet())
  .use(compression());

// app.use(routes);
app.use("/api/orders", orderRoutes);
app.use("/api/shippers", shipperRoutes);
app.use("/api/routes", routeRoutes);

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Global error handler:", err, "rawBody:", (req as any).rawBody);
  res.status(500).json({ message: "Internal server error", error: err.message });
});

// ===== Serve React build (SPA) =====
const clientDistPath = path.join(__dirname, "../../client/dist");

// 404 handler - must be last
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(express.static(path.resolve(__dirname, "../client/dist")));

app.use("/api/orders", orderRoutes);
app.use("/api/shippers", shipperRoutes);
app.use("/api/routes", routeRoutes);


app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});


app.use(express.static(path.resolve(__dirname, "../client/dist")));

app.use("/api/orders", orderRoutes);
app.use("/api/shippers", shipperRoutes);
app.use("/api/routes", routeRoutes);

app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});

// app.use(errorHandler);







