import mongoose, { Mongoose, Schema } from "mongoose";
import { User } from "./user.types";


const userSchema: Schema<User> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String, 
      required: true
    },
  },
  { timestamps: true }
);
const UserModel: mongoose.Model<User> = mongoose.model("User", userSchema);

export default UserModel;