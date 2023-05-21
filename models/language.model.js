module.exports = (sequelize, Sequelize) => {
	const LANGUAGE = sequelize.define('language', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: Sequelize.STRING,
		},
		date_text: {
			type: Sequelize.STRING,
		},
		percent: {
			type: Sequelize.DECIMAL(19, 4),
		},
		digital: {
			type: Sequelize.STRING,
		},
		total_seconds: {
			type: Sequelize.DECIMAL(19, 4),
		},
	});

	return LANGUAGE;
};