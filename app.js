require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const productsRouter = require("./routes/products");
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send('<h1>Store API</h1> <a href="api/v1/products">products route</a>');
});

// products route
app.use("/api/v1/products", productsRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

// export app to server.js
module.exports = app;
