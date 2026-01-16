import chalk from "chalk";
import path from "path";
import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import passport from "passport";
import mongoSanitize from "express-mongo-sanitize";
import dotenv from "dotenv";

import connectionToDB from "./config/connectDB.js";
import { morganMiddleware, systemLogs } from "./utils/Logger.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { apiLimiter } from "./middleware/apiLimiter.js";
import googleAuth from "./config/passportSetup.js";

/* =======================
   LOAD ENV (ROOT .env)
======================= */
dotenv.config({
  path: path.resolve(".env"),
});

/* =======================
   START SERVER
======================= */
const startServer = async () => {
  try {
    // 🔹 Connect DB
    await connectionToDB();

    const app = express();
    const __dirname = path.resolve();

    /* =======================
       STATIC FILES
    ======================= */
    app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
    app.use("/docs", express.static(path.join(__dirname, "/docs")));

    /* =======================
       MIDDLEWARE
    ======================= */
  
  
  if (process.env.GOOGLE_CLIENT_ID) {
  app.use(passport.initialize());
  googleAuth();
}


    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(mongoSanitize());

    app.use(passport.initialize());
    googleAuth();

    app.use(morganMiddleware);

    /* =======================
       ROUTES
    ======================= */
    app.get("/api/v1/test", (req, res) => {
      res.json({ HI: "welcome to the invoice app" });
    });

    app.use("/api/v1/auth", authRoutes);
    app.use("/api/v1/user", apiLimiter, userRoutes);
    app.use("/api/v1/customer", apiLimiter, customerRoutes);
    app.use("/api/v1/document", apiLimiter, documentRoutes);
    app.use("/api/v1/upload", apiLimiter, uploadRoutes);

    /* =======================
       FRONTEND (PROD)
    ======================= */
    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "client/build")));

      app.get("*", (req, res) =>
        res.sendFile(
          path.resolve(__dirname, "client", "build", "index.html")
        )
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

    app.listen(PORT, () => {
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
