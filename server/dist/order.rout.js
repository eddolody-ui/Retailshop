"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("./config/db");
const db_2 = require("./config/db");
const router = (0, express_1.Router)();
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
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const savedOrder = yield (0, db_1.saveOrder)(req.body);
        res.status(201).json(savedOrder);
    }
    catch (error) {
        res.status(400).json({ message: "Order save failed", error });
    }
}));
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
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield db_2.Order.find({}).populate('shipperId');
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch orders", error });
    }
}));
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
router.get("/:trackingId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield db_2.Order.findOne({
            TrackingId: req.params.trackingId,
        }).populate('shipperId');
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(order);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
exports.default = router;
