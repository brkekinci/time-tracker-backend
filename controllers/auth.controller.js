const db = require("../models");
const ACCOUNT = db.account;
const Op = db.Sequelize.Op;

exports.signup = async (req, res) => {
  ACCOUNT.create(req.body)
    .then((account) => {
      res.send(account);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ACCOUNT.",
      });
    });
};

exports.signin = (req, res) => {
  ACCOUNT.findOne({
    where: { email: req.body.email, password: req.body.password },
  })
    .then((data) => {
      if (data) {
        res.send(true);
      } else {
        res.send(false);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(false);
    });
};
