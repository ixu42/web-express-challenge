//const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const registerUser = async ({ username, email, password }) => {
 // const salt = await bcrypt.genSalt(10);
 // const hashedPassword = await bcrypt.hash(password, salt);
  try {
    console.log('registerUser');
    await userModel.isEmailTaken(email);
    await userModel.isUsernameTaken(username);
    const user = await userModel.createUser(username, email, password);
    console.log('register successfull:', user);
    return user;
  } catch (error) {
    console.log('error registration:', error.message);
    throw error;
  }
};

module.exports = {
  registerUser,
};
