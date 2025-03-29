var mongoose = require("mongoose");

function dbConfig() {
  mongoose
    .connect(process.env.MONGO_DB_URI1, {
      writeConcern: { w: "majority" }, 
    })
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((error) => {
      console.error("Database connection error:", error);
    });
}

module.exports = { dbConfig };
