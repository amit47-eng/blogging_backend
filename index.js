var express = require("express");
var app = express();
var dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { dbConfig } = require("./Configurations/db.config");
const { userRouter } = require("./Routers/user.routes");
const articleRouter = require("./Routers/article.routes");


dotenv.config();

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(cookieParser());
let PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userRouter);
app.use("/uploads", express.static("uploads")); // Serve uploaded images
app.use("/api", articleRouter);
app.get("/api/hello", (req, res) => {
  res.json({ message: "Backend running on Vercel!" });
});


app.listen(PORT, () => {
  dbConfig();
  console.log(`Listening to the port ${PORT}`);
});
