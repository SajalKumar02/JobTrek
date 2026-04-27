import "dotenv/config";

import { app } from "./app.js";

import { connectDb } from "./config/database.js";

// Connect to Database
connectDb();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
