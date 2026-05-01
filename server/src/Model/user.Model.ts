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
        email: {
            type: String,
            required: [true, 'Email is required'],
            lowercase: true,
            unique: true,
            trim: true,
            match: [
                /^[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                'Please enter a valid email address',
            ],
        },
        username: {
            type: String,
            required: [true, 'Username is required'],
            lowercase: true,
            unique: true,
            trim: true,
            index: true,
        },
        password: {
            type: String,
            required: false,
            select: false,
        },

    },
    { timestamps: true }
);
const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
