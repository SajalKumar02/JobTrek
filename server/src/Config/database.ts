// Database connection string
import mongoose from 'mongoose';

import { MONGO_URI } from '../constants';

export const connectDb = async () => {
  if (!MONGO_URI) throw new Error("MONGO_URI not defined");
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};
