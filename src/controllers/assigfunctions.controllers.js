import {getConnection} from '../database/database.js';

// Users CRUD 
const getAssigmentsFunctions = async (req, res) => {
    try {
        const response = await getConnection.query('select*from assignments_functions;');
        if (response === undefined) {
            res.status(404).json({
                error: null,
                assignments: "Assignments Functions not found!"
            })
        }
        else {
            res.status(200).json(response.rows)
        }
    } catch (error) {
        res.status(500).json({
            error: error.message,
            assignments: null
        })
    }
}

const createAssigmentFunctions = async (req, res) => {
    try {
        const {user_id, mod_id, functusers_id} = req.body
        if (!user_id) {
            throw Error("Send assignments Functions in request body!")
        }
        getConnection.query("insert into assignments_functions(user_id, mod_id, functusers_id, register_date, assigfunct_state) values($1, $2, $3, $4, $5);", [user_id, mod_id, functusers_id, new Date(), true], (err, data) => {
            if (err) {
                res.status(201).json({
                    error: err.message,
                    message: "Create new assignment Functions failed!"
                });
            } else {
                res.status(201).json({
                    error: null,
                    message: "Create new assignment Functions successfully!"
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Failed to create assignment Functions!"
        });
    }
}

const getAssigmentFunctionsById = async (req, res) => {
    try {
        const asigfunc_id = req.params.id
        if (!asigfunc_id) {
            throw Error("Please, enter the assignment Functions id!")
        }
        getConnection.query("select*from assignments_functions where asigfunc_id = $1;", [asigfunc_id], (error, data) => {
            if (data.rows[0] === undefined) {
                res.status(404).json({
                    error: null,
                    assignments_functions: null
                });
            }
            else {
                res.status(200).json({
                    error: null,
                    assignments_functions: data.rows[0]
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            assignments_functions: null
        })
    }
}

const updateAssigmentFunctions = async (req, res) => {
    try {
        const {id} = req.params
        const {user_id, mod_id, functusers_id} = req.body
        getConnection.query("update assignments_functions set user_id = $1, mod_id = $2, functusers_id = $3 where asigfunc_id = $4;", [user_id, mod_id, functusers_id, id], (err, data) => {
            if (err) {
                throw Error("Error to update assignment Functions!")
            }
            else {
                if (data.rowCount > 0) {
                    res.status(201).json({
                        error: null,
                        message: "Updated assignment Functions successfully!"
                    })
                } else {
                    res.status(201).json({
                        error: null,
                        message: "Assignment Functions not foud to update!"
                    })
                }
            }
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Failed to update assignment Functions!"
        })
    }
}

const deleteAssigmentFunctions = (req, res) => {
    try {
        const {id} = req.params
        getConnection.query("delete from assignments_functions where asigfunc_id = $1", [id], (error, data) => {
            if (error) {
                throw Error("Error to delete assignment Functions!")
            }
            else {
                if (data.rowCount > 0) {
                    res.status(200).json({
                        error: null,
                        message: "Assignment Functions deleted successfully!"
                    })
                }
                else {
                    res.status(200).json({
                        error: null,
                        message: "Assignment Functions not found to delete!!"
                    })
                }
            }
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Failed to delete Assignment Functions!"
        })
    }
}

export {
    getAssigmentsFunctions,
    createAssigmentFunctions,
    getAssigmentFunctionsById,
    updateAssigmentFunctions,
    deleteAssigmentFunctions
}


