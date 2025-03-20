var jwt = require("jsonwebtoken");
async function isLoggedIn(req, res, next) {
    
  try {
    let { myToken } = req.cookies;
    if (!myToken) {
      res.status(401).json({
        message: "Kindly login!",
      });
      return;
    }

    const decoded = await jwt.verify(myToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong", error: err });
  }
}


module.exports = { isLoggedIn }
