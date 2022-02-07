require("dotenv").config();
const app = require("./app");
const connectDB = require("./db/connect");
const DBurl = process.env.DB_CONNECT_LOCAL;

const port = process.env.PORT || 3000;

const start = async (app) => {
  try {
    await app.listen(port);
    console.log(`Server is listening on port ${process.env.PORT}`);
  } catch (err) {
    console.log(err);
  }
};

// connect to server if db is connected
connectDB(DBurl)
  .then(() => {
    console.log("Connected to my_jobs_db");
    start(app);
  })
  .catch((err) => {
    console.log(err);
    // db error
    res.status(500).send("DB connection error");
  });
