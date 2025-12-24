import mongoose from "mongoose";
import { ENV_VARS } from "./envVars";

/* =======================
   MongoDB Connection
======================= */
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://luke:minthway@cluster0.cd2htw6.mongodb.net/databases"
      // ENV_VARS.MONGO_URI ကိုသုံးလည်းရ
    );

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB error:", (error as Error).message);
    process.exit(1);
  }
};

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
const OrderSchema = new mongoose.Schema(
  {
    TrackingId: { type: String, required: true },
    CustomerName: { type: String, required: true },
    CustomerContact: { type: Number, required: true },
    CustomerAddress: { type: String, required: true },
    Amount: { type: Number, required: true },
    Type: { type: String, required: true },
    Note: { type: String },
    shipperId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shipper' },
  },
  { timestamps: true }
);

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
const Order =
  mongoose.models.Order || mongoose.model("Order", OrderSchema);

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
const saveOrder = async (orderData: any) => {
  try {
    const order = new Order(orderData);
    return await order.save();
  } catch (error) {
    console.error("❌ Order save error:", error);
    throw error;
  }
};

export { Order, saveOrder };


const ShipperSchema = new mongoose.Schema({
    ShipperId: { type: String, required: true },
    ShipperName: { type: String, required: true },
    ShipperContact: { type: Number, required: true },
    ShipperAddress: { type: String, required: true },
    PickUpAddress: { type: String, required: true },
    BillingType: { type: String, required: true },
    Note: { type: String },
}, { timestamps: true });

const Shipper =
  mongoose.models.Shipper || mongoose.model("Shipper", ShipperSchema);

const saveShipper = async (shipperData: any) => {
  try {
    const shipper = new Shipper(shipperData); 
    return await shipper.save();
  } catch (error) {
    console.error("❌ Shipper save error:", error);
    throw error;
  } 
};

export { Shipper, saveShipper };