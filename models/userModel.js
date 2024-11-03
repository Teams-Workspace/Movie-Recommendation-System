// models/userModel.js
const dbConnection = require('./dbConnection');

exports.createUser = (username, email, hashedPassword) => {
  return dbConnection.query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, hashedPassword]
  );
};

exports.findUserByEmail = (email) => {
  return dbConnection.query('SELECT * FROM users WHERE email = ?', [email]);
};
