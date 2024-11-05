const pool = require('./dbConnection');

exports.createUser = async (username, email, hashedPassword) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    return result;
  } catch (err) {
    console.error('Error creating user:', err);
    throw err;
  } finally {
    if (connection) connection.release();
  }
};

exports.findUserByEmail = async (email) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [result] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    return result;
  } catch (err) {
    console.error('Error finding user by email:', err);
    throw err;
  } finally {
    if (connection) connection.release();
  }
};
