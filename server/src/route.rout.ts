import { Router } from "express";
import { saveRoute, Route } from "./config/db";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const savedRoute = await saveRoute(req.body);
    res.status(201).json(savedRoute);
  } catch (error: any) {
    const errMsg = error?.message || (typeof error === 'string' ? error : JSON.stringify(error));
    res.status(400).json({ message: "Route save failed", error: errMsg });
  }
});

router.get("/", async (req, res) => {
  try {
    const routes = await Route.find({});
    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch routes", error });
  }
});

router.get("/:routeId", async (req, res) => {
  try {
    const route = await Route.findOne({ _id: req.params.routeId });

    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }

    res.json(route);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
