const bcrypt = require("bcrypt");

exports.verifyToken = (req, res, next) => {
  // bcrypt.genSalt(10, (err, salt) => {
  //   bcrypt.hash(process.env.AUTH_TOKEN, salt, (err, hash) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     console.log("hash");

  //     console.log(hash);
  //   });
  // });
  
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    bcrypt.compare(process.env.AUTH_TOKEN, bearerToken, (err, result) => {
      if (err) {
        console.error(err);

        res.sendStatus(403);
      } else {
        result ? next() : res.sendStatus(403);
      }
    });
  } else {
    res.sendStatus(403);
  }
};
