// User schema
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: {
      type: String,
      default: function () {
        if (this.email) {
          return this.email.split("@")[0];
        }
        return "user" + Date.now();
      },
      required: true,
      // unique: true,
    },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);
const UserModel = mongoose.model("User", userSchema);

export default UserModel;
