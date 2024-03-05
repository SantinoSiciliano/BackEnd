import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";
const schema = new Schema(
  {
    title: { type: String, required: true, index: true },
    photo: {
      type: String,
      required: true,
      default:
        "https://th.bing.com/th/id/OIP.IkVGd2K48LGoJJ7qo4vXeAHaEt?rs=1&pid=ImgDetMain",
    },
    price: { type: Number, default: 10, index: true },
    stock: { type: Number, default: 50 },
    data: { type: Date, default: new Date(), index: true },
  },
  { timestamps: true }
);

const Product = model(collection, schema);
export default Product;