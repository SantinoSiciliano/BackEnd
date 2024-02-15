import { model, Schema } from "mongoose";

const collection = "usuarios";
const schema = new Schema(
  {
    name: { type: String, required: true },
    last_name: { type: String },
    email: { type: String, required: true, unique: true },
    photo: {
      type: String,
      default:
        "https://th.bing.com/th/id/OIP.IkVGd2K48LGoJJ7qo4vXeAHaEt?rs=1&pid=ImgDetMain",
    },
    age: { type: Number, default: 18 },
  },
  { timestamps: true }
);

const User = model(collection, schema);
export default User;