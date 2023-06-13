module.exports = (app) => {
	const { verifyToken } = require('../middlewares/auth');
	const users = require('../controllers/user.controller.js');

	const router = require('express').Router();

	// Create a new User
	router.post('/', verifyToken, users.create);

	// Retrieve all users
	router.get('/', verifyToken, users.findAll);

	// Retrieve a single User with id
	router.get('/:id', verifyToken, users.findOne);

	// Update a User with id
	router.put('/:id', verifyToken, users.update);

	// Delete a User with id
	router.delete('/:id', verifyToken, users.delete);

	app.use('/api/users', router);
};
