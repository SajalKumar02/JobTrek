import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { connectDb } from './Config/database';

import { PORT, FRONTEND_URL } from './constants';

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
  }),
);

app.use('/api/v1', IndexRouter);

// app.all('*', (req, res) => {
//   res.status(404).json({
//     status: 404,
//     success: false,
//     message: '!Oops page not found',
//   });
// });

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
