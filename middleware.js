var jwt = require("jsonwebtoken");

async function AcheckAuth(req, res, next) {
  let token = req.headers.token;
  jwt.verify(token, "admin", function (err, decoded) {
    if (decoded) {
      next();
    } else res.status(401).send({ success: false, msg: "Unauthorized!" });
  });
}

async function UcheckAuth(req, res, next) {
  let token = req.headers.token;
  jwt.verify(token, "user", function (err, decoded) {
    if (decoded) {
      next();
    } else res.status(401).send({ success: false, msg: "Unauthorized!" });
  });
}

module.exports={
    AcheckAuth,
    UcheckAuth
};