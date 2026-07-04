import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { connectDb } from './Config/database';

import { PORT, NODE_ENV, FRONTEND_URL, BACKEND_URL } from './Constants/constants';

// Call Routes
import IndexRouter from './Routes/index.Routes';

const app = express();
const port = PORT;

app.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: FRONTEND_URL as string,
    credentials: true,
  })
);

app.use('/api/v1', IndexRouter);

connectDb()
  .then(() => {
    app.listen(port, () => {
      if (NODE_ENV === 'production') {
        console.log(`🔗 Frontend URL: ${FRONTEND_URL}`);
        console.log(`🔗 Backend URL: ${BACKEND_URL}`);
      } else {
        console.log(`✅ Server running on port ${port}`);
      }
    });
  })
  .catch((error) => {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  });
