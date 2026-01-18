import chalk from "chalk";
import path from "path";
import cookieParser from "cookie-parser";
import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import cors from "cors";

import connectionToDB from "./config/connectDB.js";
import { morganMiddleware, systemLogs } from "./utils/Logger.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { apiLimiter } from "./middleware/apiLimiter.js";
// import Customer from "./models/customerModel.js";
// import customerRoutes from "./routes/customerRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
/* =======================
   LOAD ENV
======================= */
dotenv.config({ path: path.resolve("backend/.env") });

/* =======================
   FIX __dirname (ESM)
======================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =======================
   START SERVER
======================= */
const startServer = async () => {
  try {
    // 🔹 Connect MongoDB
    await connectionToDB();

    const app = express();

    /* =======================
       CORS (VERY IMPORTANT)
    ======================= */
    app.use(
      cors({
        origin: "http://localhost:3000", // frontend
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );

    /* =======================
       MIDDLEWARE
    ======================= */
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(mongoSanitize());

    app.use(morganMiddleware);

    /* =======================
       STATIC FILES
    ======================= */
    app.use("/uploads", express.static(path.join(__dirname, "uploads")));
    app.use("/docs", express.static(path.join(__dirname, "docs")));

    /* =======================
       ROUTES
    ======================= */
    app.use("/api/v1/auth", authRoutes);
    app.use("/api/v1/user", apiLimiter, userRoutes);
    app.use("/api/v1/customer", apiLimiter,customerRoutes);
   
    app.use("/api/v1/document", apiLimiter, documentRoutes);
    app.use("/api/v1/upload", apiLimiter, uploadRoutes);

    /* =======================
       FRONTEND (PROD)
    ======================= */
    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "client/build")));
      app.get("*", (req, res) =>
        res.sendFile(path.join(__dirname, "client", "build", "index.html"))
      );
    } else {
      app.get("/", (req, res) => res.send("API running"));
    }

    /* =======================
       ERROR HANDLERS
    ======================= */
    app.use(notFound);
    app.use(errorHandler);

    /* =======================
       LISTEN
    ======================= */
    const PORT = process.env.PORT || 1997;

    app.listen(PORT, "0.0.0.0", () => {
      console.log(
        `${chalk.green.bold("✔")} Server running in ${chalk.yellow.bold(
          process.env.NODE_ENV
        )} mode on port ${chalk.blue.bold(PORT)}`
      );
      systemLogs.info(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      );
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
