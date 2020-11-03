import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDb from "./config/db.js";
import { notFound, errorHandler } from "./middleWare/errorMiddleWare.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
dotenv.config();
connectDb();
app.get("/", (req, res) => {
  res.send("API running ....");
});

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(
  port,
  console.log(
    `server running in ${process.env.NODE_ENV} on port ${port}...`.yellow
      .underline.bold
  )
);
