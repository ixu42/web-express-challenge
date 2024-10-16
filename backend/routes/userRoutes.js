const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

// Route for fetching and storing Pokémon data
router.post('/register', userController.registerUser);

module.exports = router;
