const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find().sort("name price"); // sort by name and price;
  res.status(200).json({
    products: products,
    msg: "fetched products",
    nbHits: products.length,
  });
};

const getAllProducts = async (req, res) => {
  const {
    name,
    featured,
    company,
    price,
    rating,
    sort,
    fields,
    numericFilters,
  } = req.query;
  const queryObj = {};
  // search by featured
  if (featured) {
    queryObj.featured = featured === "true" ? true : false;
  }
  // search by name
  if (name) {
    queryObj.name = { $regex: req.query.name, $options: "i" };
  }
  // search by company
  if (company) {
    queryObj.company = company;
  }

  // search by price
  if (price) {
    queryObj.price = price;
  }
  // search by rating
  if (rating) {
    queryObj.rating = rating;
  }

  // numeric filters
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObj[field] = { [operator]: Number(value) };
      }
    });
  }
  console.log(queryObj); 
  let result = Product.find(queryObj);

  // sort dynamically
  if (sort) {
    const sortBy = sort.split(",").join(" ");
    result.sort(sortBy);
  } else {
    result.sort("createdAt");
  }

  // select only the fields we want
  if (fields) {
    const fieldsArr = fields.split(",").join(" ");
    result.select(fieldsArr);
  }

  // pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;

  result = result.skip(startIndex).limit(limit);

  const products = await result;

  res.status(200).json({
    msg: "fetching products",
    products: products,
    nbHits: products.length,
  });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
