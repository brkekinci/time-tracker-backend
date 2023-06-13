const db = require("../models");
const USER = db.user;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  req.body.api_key_base64 = Buffer.from(req.body.api_key).toString("base64");
  USER.create(req.body)
    .then((user) => {
      console.log(user);
      res.send(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message: err.message || "Some error occurred while creating the USER.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  USER.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find USER with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message: "Error retrieving USER with id=" + id,
      });
    });
};

exports.findAll = (req, res) => {
  USER.findAll({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving USERS.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  req.body.api_key_base64 = Buffer.from(req.body.api_key).toString('base64');
  USER.update(req.body, {
    where: { user_id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "USER was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update USER with id=${id}. Maybe USER was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message: "Error updating USER with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
	const id = req.params.id;

	USER.destroy({
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: 'USER was deleted successfully!',
				});
			} else {
				res.send({
					message: `Cannot delete USER with id=${id}. Maybe USER was not found!`,
				});
			}
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send({
				message: 'Could not delete USER with id=' + id,
			});
		});
};

// exports.create = async (params) => {
//   if(!params.name || !params.api_key){
//     console.log("missing content");
//     return;
//   }

//   params.api_key_base64 = Buffer.from(params.api_key).toString('base64');

//   try{
//     const data = await User.create(params, {raw: true});
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// exports.delete = async (id) => {
//   try {
//     User.destroy({where: {user_id: id}});
//     console.log("deleted row: " + id);
//     return;
//   } catch(error) {
//     console.log(error);
//   }
// }

// exports.update = async (params) => {

//   params.api_key_base64 = Buffer.from(params.api_key).toString('base64');
//   try {
//     User.update({name: params.name, api_key: params.api_key, api_key_base64: params.api_key_base64},{where: {user_id: params.user_id}})
//     console.log("successfully updated");
//     return;
//   } catch(error) {
//     console.log(error);
//   }
// }
