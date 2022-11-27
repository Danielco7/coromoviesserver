const jwt = require("jsonwebtoken");

exports.genToken = (_userId) => {
  let token = jwt.sign({ _id: _userId }, "MONKEYSSECRET", {
    expiresIn: "60mins",
  });
  return token;
};

exports.authtoken = (req, res, next) => {
  let token = req.header("x-api-key");
  if (!token) {
    res.status(401).json({ msg: "you must send token" });
  }
  try {
    let decoodeToken = jwt.verify(token, "MONKEYSSECRET");
    req.tokenData = decoodeToken;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: "token invalid or expired" });
  }
};
