module.exports = (app) => {
	const { verifyToken } = require('../middlewares/auth');
	const accounts = require('../controllers/auth.controller.js');

	const router = require('express').Router();

	// Create a new Account
	router.post('/', verifyToken, accounts.signup);

	// Retrieve all accounts
	router.get('/', verifyToken, accounts.signin);

	app.use('/api/auth', router);
};
