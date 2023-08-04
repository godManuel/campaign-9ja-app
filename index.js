import path from path

import express from "express";
const app = express();

// Allowing environment variables
import dotenv from "dotenv";
dotenv.config();

// Running MongoDB connection
import connectDB from "./config/db.js";
connectDB();

// Express fileupload
import fileupload from "express-fileupload";

// Express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

app.use(fileupload());

// Importing routes
import aspirantRoute from "./routes/aspirants.js";
import blueprintRoute from "./routes/blueprints.js";
import previousAchievementRoute from "./routes/previous_achievements.js";
import feedsRoute from "./routes/feeds.js";
import authRoute from "./routes/auth.js";

// Importing middlewares
import errorHandler from "./middlewares/error.js";

// Mount routes
app.use("/api/v1/aspirants", aspirantRoute);
app.use("/api/v1/blueprints", blueprintRoute);
app.use("/api/v1/previous-achievements", previousAchievementRoute);
app.use("/api/v1/feeds", feedsRoute);
app.use("/api/v1/auth", authRoute);

app.use(errorHandler);

const port = process.env.PORT || 2023;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
