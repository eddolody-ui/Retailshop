import { Router } from "express";
import { saveOrder } from "./config/db";
import { Order } from "./config/db";

const router = Router();

/**
 * POST / - Create Order Route
 * 
 * Client form data မှ database တွင် အသစ်စက်စက် order ကို create လုပ်သည်။
 * 
 * Relationships:
 * - Client serviceApi.ts ၏ createOrder() function မှ data ကို receive လုပ်သည်
 * - Database config မှ saveOrder() function ကို call လုပ်သည်
 * - Frontend မှ OrderData interface structure ကို အသုံးပြုသည်
 * - Confirmation အတွက် client သို့ created order ကို return လုပ်သည်
 * - MongoDB Order collection နှင့် connected ဖြစ်သည်
 */
router.post("/", async (req, res) => {
  try {
    const savedOrder = await saveOrder(req.body);
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: "Order save failed", error });
  }
});

/**
 * GET / - Get All Orders Route
 * 
 * Orders table တွင် display လုပ်ရန် database မှ order အားလုံးကို retrieve လုပ်သည်။
 * 
 * Relationships:
 * - Client serviceApi.ts ၏ getOrders() function သို့ respond လုပ်သည်
 * - Order.find({}) ဖြင့် MongoDB Order collection ကို query လုပ်သည်
 * - Client သို့ OrderData[] array ကို return လုပ်သည်
 * - DataTableDemo component တွင် data ကို render လုပ်သည်
 * - Order page က order list ကို display လုပ်ရန် အသုံးပြုသည်
 */
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find({}).populate('shipperId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
});

/**
 * GET /:trackingId - Get Order by Tracking ID Route
 * 
 * ၎င်း၏ tracking ID ဖြင့် specific order ကို retrieve လုပ်သည်။
 * 
 * Relationships:
 * - Individual order details ကို fetch လုပ်ရန် client မှ အသုံးပြုနိုင်သည်
 * - TrackingId filter ဖြင့် Order.findOne() ကို အသုံးပြုသည်
 * - Single order object ကို return လုပ်သည် သို့မဟုတ် မရှိပါက 404 ကို return လုပ်သည်
 * - Order details page နှင့် connect လုပ်နိုင်သည် (လက်ရှိတွင် မရှိသေးပါ)
 */
router.get("/:trackingId", async (req, res) => {
  try {
    const order = await Order.findOne({
      TrackingId: req.params.trackingId,
    }).populate('shipperId');

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
