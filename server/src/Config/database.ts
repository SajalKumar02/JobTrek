// Database connection string
import mongoose from 'mongoose';

import { MONGO_URI } from './constants';

export const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};
