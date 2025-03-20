var mongoose = require("mongoose");
function dbConfig() {
  mongoose
    .connect(process.env.MONGO_DB_URI + process.env.DB_NAME)
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((error) => {
      console.log("error", error);
    });
}
module.exports = { dbConfig };
