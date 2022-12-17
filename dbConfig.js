const mongoose = require("mongoose");
require('dotenv').config()
const dbConnection = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connection Database success");
    })
    .catch((error) => {
      console.log({ message: error.message });
    });
};
module.exports = dbConnection;
