import {getConnection} from '../database/database.js';

// Users CRUD 
const getFunctions = async (req, res) => {
    try {
        const response = await getConnection.query('select*from functions_users;');
        if (response === undefined) {
            res.status(404).json({
                error: null,
                functions_users: "Functions users not found!"
            })
        }
        else {
            res.status(200).json(response.rows)
        }
    } catch (error) {
        res.status(500).json({
            error: error.message,
            functions_users: null
        })
    }
}

const createFunctions = async (req, res) => {
    try {
        const {function_name} = req.body
        if (!function_name) {
            throw Error("Send functions users in request body!")
        }
        getConnection.query("insert into functions_users(function_name, register_date) values($1, $2);", [function_name, new Date()], (err, data) => {
            if (err) {
                res.status(201).json({
                    error: err.message,
                    message: "Create new functions users failed!"
                });
            } else {
                res.status(201).json({
                    error: null,
                    message: "Create new functions users successfully!"
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Failed to create functions users!"
        });
    }
}

const getFunctionById = async (req, res) => {
    try {
        const function_id = req.params.id
        if (!function_id) {
            throw Error("Please, enter the functions users id!")
        }
        getConnection.query("select*from functions_users where function_id = $1;", [function_id], (error, data) => {
            if (data.rows[0] === undefined) {
                res.status(404).json({
                    error: null,
                    functions_users: null
                });
            }
            else {
                res.status(200).json({
                    error: null,
                    functions_users: data.rows[0]
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            functions_users: null
        })
    }
}

const updateFunctions = async (req, res) => {
    try {
        const {id} = req.params
        const {function_name} = req.body
        getConnection.query("update functions_users set function_name = $1 where function_id = $2;", [function_name, id], (error, data) => {
            if (error) {
                throw Error("Error to update function users!")
            }
            else {
                if (data.rowCount > 0) {
                    res.status(201).json({
                        error: null,
                        message: "Updated functions users successfully!"
                    })
                } else {
                    res.status(201).json({
                        error: null,
                        message: "Functions users not foud to update!"
                    })
                }

            }
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Failed to update functions users!"
        })
    }
}

const deleteFunction = (req, res) => {
    try {
        const {id} = req.params
        getConnection.query("delete from functions_users where function_id = $1", [id], (error, data) => {
            if (error) {
                throw Error("Error to delete functions users!")
            }
            else {
                if (data.rowCount > 0) {
                    res.status(200).json({
                        error: null,
                        message: "Functions users deleted successfully!"
                    })
                }
                else {
                    res.status(200).json({
                        error: null,
                        message: "Functions users not found to delete!!"
                    })
                }
            }
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Failed to delete functions users!"
        })
    }
}

export {
    getFunctions,
    createFunctions,
    getFunctionById,
    updateFunctions,
    deleteFunction
}


