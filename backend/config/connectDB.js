import chalk from "chalk";
import mongoose from "mongoose";
import { systemLogs } from "../utils/Logger.js";

const connectionToDB = async () => {
  try {
    console.log("👉 MONGO_URI =", process.env.MONGO_URI);

    const connect = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      chalk.blue.bold(`MongoDB Connected: ${connect.connection.host}`)
    );
    systemLogs.info(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.error(chalk.red.bold(`Error: ${error.message}`));
    process.exit(1);
  }
};

export default connectionToDB;
