import {getConnection} from '../database/database.js';
import {Encrypt, ComparePasswords, Decrypt} from '../utils/encrypt.js';


const Login = async (req, res) => {
    try {
        const {email_username, password} = req.body
        if (!email_username || !password) {
            throw Error("Please, enter the username or email address!")
        } else {

            getConnection.query("select*from users where username = $1 or email = $1;", [email_username], (error, data) => {
                if (data.rows[0] === undefined) {
                    res.status(404).json({
                        error: null,
                        user: null
                    });
                }
                else {
                    console.log(data.rows[0].password)
                    console.log(data.rows[0].password.encryptedData)
                    console.log(data.rows[0].password.iv)
                    console.log(Encrypt(password))
                    console.log(Encrypt(password))
                    console.log(Encrypt(password))
                    console.log(ComparePasswords(password, data.rows[0].password.encryptedData, data.rows[0].password.iv))
                    if (ComparePasswords(password, data.rows[0].password.encryptedData, data.rows[0].password.iv)) {
                        res.status(200).json({
                            error: null,
                            user: data.rows[0]
                        });
                    }
                    else {
                        res.status(200).json({
                            error: null,
                            message: "Login failed"
                        });
                    }
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message,
            user: null
        })
    }
}

export {
    Login
}