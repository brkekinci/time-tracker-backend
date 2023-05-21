module.exports = (sequelize, Sequelize) => {
	const USER = sequelize.define('user', {
		user_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: Sequelize.STRING,
		},
		api_key: {
			type: Sequelize.STRING,
		},
		api_key_base64: {
			type: Sequelize.STRING,
		},
	});

	return USER;
};