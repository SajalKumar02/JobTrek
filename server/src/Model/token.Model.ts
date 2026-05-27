import { model, Schema, HydratedDocument } from "mongoose";

import { IToken } from "../Types/index";

const tokenSchema = new Schema<IToken>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        refreshToken: { type: String, required: true, unique: true },
        expiresAt: { type: Date, required: true },
    }
);

const TokenModel = model("Token", tokenSchema);

export type TokenDocument = HydratedDocument<IToken>
export default TokenModel;
