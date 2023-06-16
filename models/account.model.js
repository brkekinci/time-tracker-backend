module.exports = (sequelize, Sequelize) => {
	const ACCOUNT = sequelize.define('account', {
		email: {
			type: Sequelize.STRING,
		},
		password: {
			type: Sequelize.STRING,
		},
	});

	return ACCOUNT;
};