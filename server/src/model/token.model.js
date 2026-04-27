// Refresh token schema
// token storage/retrieval
// token cleanup
import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    refreshToken: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

const TokenModel = mongoose.model("Token", tokenSchema);

export default TokenModel;
