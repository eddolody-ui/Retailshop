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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveOrder = exports.Order = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
/* =======================
   MongoDB Connection
======================= */
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield mongoose_1.default.connect("mongodb+srv://luke:minthway@cluster0.cd2htw6.mongodb.net/databases"
        // ENV_VARS.MONGO_URI ကိုသုံးလည်းရ
        );
        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error("❌ MongoDB error:", error.message);
        process.exit(1);
    }
});
exports.connectDB = connectDB;
/* =======================
   Order Schema
======================= */
/**
 * Order Schema Definition
 *
 * Order documents အတွက် MongoDB schema ကို define လုပ်သည်။
 * Structured data model ကို create လုပ်ရန် Mongoose ကို အသုံးပြုသည်။
 *
 * Relationships:
 * - Client serviceApi.ts ၏ OrderData interface နှင့် fields များ match ဖြစ်သည်
 * - Database operations အတွက် Order model မှ အသုံးပြုသည်
 * - Timestamps သည် createdAt နှင့် updatedAt fields များကို automatically ထည့်သည်
 * - MongoDB ၏ Order collection နှင့် connected ဖြစ်သည်
 */
const OrderSchema = new mongoose_1.default.Schema({
    TrackingId: { type: String, required: true },
    CustomerName: { type: String, required: true },
    CustomerContact: { type: Number, required: true },
    CustomerAddress: { type: String, required: true },
    Amount: { type: Number, required: true },
    Type: { type: String, required: true },
    Note: { type: String },
}, { timestamps: true });
/* =======================
   Order Model (Safe)
======================= */
/**
 * Order Model
 *
 * Order collection အတွက် Mongoose model။ Model re-compilation errors ကို prevent လုပ်ရန်
 * singleton pattern ကို အသုံးပြုသည်။
 *
 * Relationships:
 * - OrderSchema definition မှ created ဖြစ်သည်
 * - New documents ကို create လုပ်ရန် saveOrder function မှ အသုံးပြုသည်
 * - Router.get("/") မှ all orders ကို fetch လုပ်ရန် queried ဖြစ်သည်
 * - Router.get("/:trackingId") မှ individual orders ကို fetch လုပ်ရန် queried ဖြစ်သည်
 */
const Order = mongoose_1.default.models.Order || mongoose_1.default.model("Order", OrderSchema);
exports.Order = Order;
/* =======================
   Save Order
======================= */
/**
 * saveOrder Function
 *
 * New order document ကို MongoDB သို့ create လုပ်ပြီး save လုပ်သည်။
 *
 * Relationships:
 * - Router.post("/") route handler မှ call လုပ်သည်
 * - Client createOrder API call မှ orderData ကို receive လုပ်သည်
 * - Order model ကို အသုံးပြု၍ new Order document ကို create လုပ်သည်
 * - Route handler သို့ saved document ကို return လုပ်သည်
 * - Client Order table တွင် display လုပ်ရန် data ကို eventually ပို့သည်
 */
const saveOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = new Order(orderData);
        return yield order.save();
    }
    catch (error) {
        console.error("❌ Order save error:", error);
        throw error;
    }
});
exports.saveOrder = saveOrder;
