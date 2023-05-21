const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

exports.create = async (params) => {
  if(!params.name || !params.api_key){
    console.log("missing content");
    return;
  }

  params.api_key_base64 = Buffer.from(params.api_key).toString('base64');

  try{
    const data = await User.create(params, {raw: true});
    return data;
  } catch (error) {
    console.log(error);
  }
};

exports.delete = async (id) => {
  try {
    User.destroy({where: {user_id: id}});
    console.log("deleted row: " + id);
    return;
  } catch(error) {
    console.log(error);
  }
}

exports.update = async (params) => {

  params.api_key_base64 = Buffer.from(params.api_key).toString('base64');
  try {
    User.update({name: params.name, api_key: params.api_key, api_key_base64: params.api_key_base64},{where: {user_id: params.user_id}})
    console.log("successfully updated");
    return;
  } catch(error) {
    console.log(error);
  }
}