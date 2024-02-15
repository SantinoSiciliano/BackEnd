import { model, Schema } from "mongoose";

const collection = "productos";
const schema = new Schema(
  {
    title: { type: String, required: true },
    photo: {
      type: String,
      default:
        "https://th.bing.com/th/id/OIP.IkVGd2K48LGoJJ7qo4vXeAHaEt?rs=1&pid=ImgDetMain",
    },
    price: { type: Number, default: 10 },
    stock: { type: Number, default: 50 },
    data: { type: Date, default: new Date() },
  },
  { timestamps: true }
);

const Product = model(collection, schema);
export default Product;