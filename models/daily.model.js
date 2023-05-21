module.exports = (sequelize, Sequelize) => {
	const DAILY = sequelize.define('daily', {
		day_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		date: {
			type: Sequelize.STRING,
		},
		date_start: {
			type: Sequelize.DATE,
		},
		date_end: {
			type: Sequelize.DATE,
		},
		total_text: {
			type: Sequelize.STRING,
		},
		total_digital: {
			type: Sequelize.STRING,
		},
		total_seconds: {
			type: Sequelize.DECIMAL(19, 4),
		},
	});

	return DAILY;
};