import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import cors from "cors";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import path from "path";
import { fileURLToPath } from "url";

//esmodulefix:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//dotenv config
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/dist")));
//routes
app.use("/api/v1/auth", authRoute);
//category route
app.use("/api/v1/category", categoryRoute);
//product route
app.use("/api/v1/product", productRoute);

//rest api
app.use("*", (req, res) => {
  // res.sendFile(path.join(__dirname, "./client/dist/index.html"));
  res.send({ message: "Hello server" });
});

//port
const PORT = process.env.PORT || 8080;
//hostname
const hostName = "127.0.0.1";

//run listen
app.listen(PORT, () => {
  console.log(
    `server is running on ${process.env.DEV_MODE} at http://${hostName}:${PORT}`
      .bgYellow.blue
  );
});
