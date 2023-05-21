const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	operatorsAliases: false,

	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle,
	},
	underscored: true,
	logging: true,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model')(sequelize, Sequelize);

db.daily = require('./daily.model')(sequelize, Sequelize);
db.user.hasMany(db.daily, {
	foreignKey: 'user_id',
});
db.daily.belongsTo(db.user, {
	foreignKey: 'user_id',
});

db.language = require('./language.model')(sequelize, Sequelize);
db.daily.hasMany(db.language, {
	foreignKey: 'day_id',
});
db.language.belongsTo(db.daily, {
	foreignKey: 'day_id',
});

db.project = require('./project.model')(sequelize, Sequelize);
db.daily.hasMany(db.project, {
	foreignKey: 'day_id',
});
db.project.belongsTo(db.daily, {
	foreignKey: 'day_id',
});

module.exports = db;