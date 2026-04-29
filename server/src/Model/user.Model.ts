// User schema
import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
    email: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

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
    },
    { timestamps: true }
);
const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
