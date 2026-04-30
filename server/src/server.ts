import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { connectDb } from './Config/database';

import { PORT, FRONTEND_URL } from './Config/utils';

// Call Routes
import IndexRouter from './Routes/index.Routes';

const app = express();
const port = PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Server can extract req.body
app.use(cookieParser());

// Middleware
app.use(
  cors({
    // added origin
    origin: [FRONTEND_URL as string, 'http://localhost:5173'],
    credentials: true,
  })
);

app.use('/api', IndexRouter);

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server running on port ${port}`);
      console.log(`🔗 Backend URL: http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  });
