import {getConnection} from '../database/database.js';
import {Encrypt, Decrypt as de} from '../utils/encrypt.js';

// Users CRUD 
const getUsers = async (req, res) => {
  try {
    const response = await getConnection.query('select*from users;');
    if (response === undefined) {
      res.status(404).json({
        error: null,
        users: "Users not found!"
      })
    }
    else {
      res.status(200).json(response.rows)
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      users: null
    })
  }
}

const createUser = async (req, res) => {
  try {
    const {first_name, last_name, email, username, password, repeat_password, state, phone} = req.body
    if (!first_name) {
      throw Error("Send User in request body!")
    }
    if (password === repeat_password) {
      let password_encrypt = Encrypt(password)
      getConnection.query("insert into users(first_name,last_name,email,username,password,state,register_date,phone) values($1, $2, $3, $4, $5, $6, $7, $8);", [first_name, last_name, email, username, password_encrypt, state, new Date(), phone], (err, data) => {
        res.status(201).json({
          error: null,
          message: "Create new User"
        });
      });
    }
    else {
      throw Error("Confirm password error!")
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Failed to create user!"
    });
  }
}

const getUserByIdFromDB = async (emailUsername) => {
  return new Promise((resolve, reject) => {
    getConnection.query("SELECT * FROM users WHERE username = $1 OR email = $1;", [emailUsername], (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data.rows[0]);
      }
    });
  });
};

const getUserById = async (req, res) => {
  try {
    const email_username = req.params.id
    if (!email_username) {
      throw Error("Please, enter the username or email address!")
    }
    getConnection.query("select*from users where username = $1 or email = $1;", [email_username], (error, data) => {
      if (data.rows[0] === undefined) {
        res.status(404).json({
          error: null,
          user: null
        });
      }
      else {
        res.status(200).json({
          error: null,
          user: data.rows[0]
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      user: null
    })
  }
}

const updateUser = async (req, res) => {
  try {
    const {id} = req.params
    const {first_name, last_name, email, username, state, phone} = req.body
    getConnection.query("update users set first_name = $1, last_name = $2, email = $3, username = $4, state = $5, phone = $6 where username = $7 or email = $7;", [first_name, last_name, email, username, state, phone, id], (error, data) => {
      if (error) {
        throw Error("Error to uodate user!")
      }
      else {
        res.status(201).json({
          error: null,
          message: "Updated User successfully!"
        })
      }
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Failed to update user!"
    })
  }
}

const deleteUser = (req, res) => {
  try {
    const {id} = req.params.id
    getConnection.query("delete from users where username = $1 or email = $1", [id], (error, data) => {
      if (error) {
        throw Error("Error to delete user!")
      }
      else {
        if (data.rowCount > 0) {
          res.status(200).json({
            error: null,
            message: "User deleted successfully!"
          })
        }
        else {
          res.status(200).json({
            error: null,
            message: "User deleted failed!"
          })
        }
      }
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Failed to delete user!"
    })
  }
}

export {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
}


