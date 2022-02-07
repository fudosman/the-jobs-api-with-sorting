const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Model = mongoose.model;


module.exports = Model(
  "Product",
  new Schema({
    name: {
      type: String,
      required: [true, "product must be provided"],
    },
    price: {
      type: Number,
      required: [true, "price must be provided"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    rating: { type: Number, default: 4.5 },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    company: {
      type: String,
      enum: {
        values: ["ikea", "liddy", "caressa", "marcos"],
        message: "{ VALUE} is not a valid company",
      },
    },
  })
);
