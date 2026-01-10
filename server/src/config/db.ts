import mongoose from "mongoose";
import { ENV_VARS } from "./envVars";
import { create } from "node:domain";

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
const OrderSchema = new mongoose.Schema(
  {
    TrackingId: { type: String, required: true },
    CustomerName: { type: String, required: true },
    CustomerContact: { type: Number, required: true },
    CustomerAddress: { type: String, required: true },
    Amount: { type: Number, required: true },
    Type: { type: String, required: true },
    Note: { type: String },
    shipperId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shipper', required: false },
    Status: { type: String, 
              enum: ["Pending", "Hub Inbound", "Arrive At Softing Hub", "In Route", "Delivered", "Return To Sender", "Cancelled"],
              default: "Pending" },
    log: [
      {
        status: { type: String },
        timestamp: { type: Date, default: Date.now },
        createdAt: { type: Date, default: Date.now },
        createdBy: { type: String },
        message: { type: String }
      }
    ]
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

const saveOrder = async (orderData: any) => {
  try {
    if (!orderData.log) orderData.log = [];
    orderData.log.push({
      status: orderData.Status || "Pending",
      message: "Order created",
      timestamp: new Date(),
      createdBy: orderData.createdBy || "system"
    });
    const order = new Order(orderData);
    return await order.save();
  } catch (error) {
    console.error("❌ Order save error:", error);
    throw error;
  }
};
export { Order, saveOrder };

//section for Shipper schema and model
const ShipperSchema = new mongoose.Schema({
    ShipperId: { type: String, required: true },
    ShipperName: { type: String, required: true },
    ShipperContact: { type: Number, required: true },
    ShipperAddress: { type: String, required: true },
    PickUpAddress: { type: String, required: true },
    BillingType: { type: String, required: true },
    Note: { type: String },
}, { timestamps: true });

const Shipper = mongoose.models.Shipper || mongoose.model("Shipper", ShipperSchema);

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

// Section for Route schema and model
const RouteSchema = new mongoose.Schema({
    routeName: { type: String, required: true },
    driverName: { type: String, required: true },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
}, { timestamps: true });

const Route = mongoose.models.Route || mongoose.model("Route", RouteSchema);

const saveRoute = async (routeData: any) => {
    try {
        const route = new Route(routeData);
        return await route.save();
    } catch (error) {
        console.error("❌ Route save error:", error);
        throw error;
    }
};

export { Route, saveRoute };
