import express from "express";
import products from "./data/products.js";
import dotenv from "dotenv";
import colors from "colors";
import connectDb from "./config/db.js";

const app = express();
dotenv.config();
connectDb();
app.get("/", (req, res) => {
  res.send("API running ....");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

const port = process.env.PORT || 5000;

app.listen(
  port,
  console.log(
    `server running in ${process.env.NODE_ENV} on port ${port}...`.yellow
      .underline.bold
  )
);
