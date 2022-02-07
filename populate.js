require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/product");

const jsonProducts = require("./products.json");

const start2 = async () => {
  try {
    await connectDB(process.env.DB_CONNECT_LOCAL);
    await Product.deleteMany({});
    await Product.create(jsonProducts);
    console.log("Connected to jobs dummy data");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start2();
