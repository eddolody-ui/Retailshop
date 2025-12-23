import { Router } from "express";
import { saveShipper } from "./config/db";
import { Shipper } from "./config/db";

const router = Router();

/**
 * POST / - Create Shipper Route
 *
 * Client form data မှ database တွင် အသစ်စက်စက် shipper ကို create လုပ်သည်။
 *
 * Relationships:
 * - Client serviceApi.ts ၏ createShipper() function မှ data ကို receive လုပ်သည်
 * - Database config မှ saveShipper() function ကို call လုပ်သည်
 * - Frontend မှ ShipperData interface structure ကို အသုံးပြုသည်
 * - Confirmation အတွက် client သို့ created shipper ကို return လုပ်သည်
 * - MongoDB Shipper collection နှင့် connected ဖြစ်သည်
 */
router.post("/", async (req, res) => {
  try {
    const savedShipper = await saveShipper(req.body);
    res.status(201).json(savedShipper);
  } catch (error) {
    res.status(400).json({ message: "Shipper save failed", error });
  }
});

/**
 * GET / - Get All Shippers Route
 *
 * Shippers table တွင် display လုပ်ရန် database မှ shipper အားလုံးကို retrieve လုပ်သည်။
 *
 * Relationships:
 * - Client serviceApi.ts ၏ getShippers() function သို့ respond လုပ်သည်
 * - Shipper.find({}) ဖြင့် MongoDB Shipper collection ကို query လုပ်သည်
 * - Client သို့ ShipperData[] array ကို return လုပ်သည်
 * - Shipper page table တွင် data ကို display လုပ်ရန် အသုံးပြုသည်
 */
router.get("/", async (req, res) => {
  try {
    const shippers = await Shipper.find({});
    res.json(shippers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch shippers", error });
  }
});

export default router;