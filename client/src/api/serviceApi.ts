import api from "./axois";

/**
 * OrderData Interface
 * 
 * Application တစ်လျှောက် အသုံးပြုသော order data ၏ structure ကို define လုပ်သည်။
 * ဤ interface သည် frontend forms နှင့် backend API ကြားတွင် type safety ကို ensure လုပ်သည်။
 * 
 * Relationships:
 * - createOrder function မှ input data ကို validate လုပ်ရန် အသုံးပြုသည်
 * - getOrders function မှ backend မှ return လုပ်သော data ဖြစ်သည်
 * - CreateOrderForm component မှ form state management အတွက် အသုံးပြုသည်
 * - Backend ရှိ MongoDB Order schema နှင့် match ဖြစ်သည်
 */
export interface OrderData {
  TrackingId: string;
  CustomerName: string;
  CustomerContact: string;
  CustomerAddress: string;
  Amount: number;
  Type: string;
  Note: string;
}

/**
 * createOrder Function
 * 
 * Order data ကို backend API သို့ send လုပ်ပြီး database တွင် အသစ်စက်စက် order ကို create လုပ်သည်။
 * 
 * Relationships:
 * - CreateOrderForm component ၏ handleSubmit မှ call လုပ်သည်
 * - Type validation အတွက် OrderData interface ကို အသုံးပြုသည်
 * - /api/orders endpoint သို့ POST request လုပ်သည်
 * - Confirmation အတွက် backend မှ created order data ကို return လုပ်သည်
 * - Backend server ၏ saveOrder function နှင့် connected ဖြစ်သည်
 */
export const createOrder = async (orderData: OrderData) => {
  const res = await api.post("/orders", orderData);
  return res.data;
};

/**
 * getOrders Function
 * 
 * Orders table တွင် display လုပ်ရန် backend API မှ order အားလုံးကို fetch လုပ်သည်။
 * 
 * Relationships:
 * - DataTableDemo component မှ mount တွင် call လုပ်သည်
 * - Table rendering အတွက် OrderData[] array ကို return လုပ်သည်
 * - /api/orders endpoint သို့ GET request လုပ်သည်
 * - Backend server ၏ Order.find({}) နှင့် connected ဖြစ်သည်
 * - Order page table တွင် data ကို display လုပ်သည်
 */
export const getOrders = async (): Promise<OrderData[]> => {
  const res = await api.get("/orders");
  return res.data;
};
