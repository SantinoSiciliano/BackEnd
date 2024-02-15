import { model, Schema, Types } from "mongoose";

const collection = "orders";
const schema = new Schema(
  {
    u_id: { type: Types.ObjectId, required: true, ref: "usuarios" },
    p_id: { type: Types.ObjectId, required: true, ref: "productos" },
    quantity: { type: Number, default: 1 },
    state: {
      type: String,
      default: "reservado",
      enum: ["reservado", "pagado", "entregado"],
    },
  },
  { timestamps: true }
);

const Order = model(collection, schema);
export default Order;