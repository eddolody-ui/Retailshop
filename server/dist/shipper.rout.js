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
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const savedShipper = yield (0, db_1.saveShipper)(req.body);
        res.status(201).json(savedShipper);
    }
    catch (error) {
        res.status(400).json({ message: "Shipper save failed", error });
    }
}));
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
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shippers = yield db_2.Shipper.find({});
        res.json(shippers);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch shippers", error });
    }
}));
exports.default = router;
