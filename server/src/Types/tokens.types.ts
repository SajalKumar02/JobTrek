import { Types } from "mongoose";

export interface IToken {
    userId: Types.ObjectId;
    refreshToken: string;
    expiresAt: Date,
}