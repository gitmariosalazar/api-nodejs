import {getConnection} from '../database/database.js';

// Users CRUD 
const getAssigments = async (req, res) => {
  try {
    const response = await getConnection.query('select*from assignments_modules;');
    if (response === undefined) {
      res.status(404).json({
        error: null,
        assignments: "Assignments modules not found!"
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

const createAssigment = async (req, res) => {
  try {
    const {user_id, rol_id, module_user} = req.body
    if (!user_id) {
      throw Error("Send assignments modules in request body!")
    }
    getConnection.query("insert into assignments_modules(user_id, rol_id, module_user, date_assigment, assignments_state) values($1, $2, $3, $4, $5);", [user_id, rol_id, module_user, new Date(), true], (err, data) => {
      if (err) {
        res.status(201).json({
          error: err.message,
          message: "Create new assignment module failed!"
        });
      } else {
        res.status(201).json({
          error: null,
          message: "Create new assignment module successfully!"
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Failed to create assignment module!"
    });
  }
}

const getAssigmentById = async (req, res) => {
  try {
    const assignment_id = req.params.id
    if (!assignment_id) {
      throw Error("Please, enter the assignment module id!")
    }
    getConnection.query("select*from assignments_modules where assignments_id = $1;", [assignment_id], (error, data) => {
      if (data.rows[0] === undefined) {
        res.status(404).json({
          error: null,
          assignments: null
        });
      }
      else {
        res.status(200).json({
          error: null,
          assignments: data.rows[0]
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      assignments: null
    })
  }
}

const updateAssigment = async (req, res) => {
  try {
    const {id} = req.params
    const {user_id, rol_id, module_user} = req.body
    getConnection.query("update assignments_modules set user_id = $1, rol_id = $2, module_user = $3 where assignments_id = $4;", [user_id, rol_id, module_user, id], (error, data) => {
      if (error) {
        throw Error("Error to update assignment module!")
      }
      else {
        if (data.rowCount > 0) {
          res.status(201).json({
            error: null,
            message: "Updated assignment module successfully!"
          })
        } else {
          res.status(201).json({
            error: null,
            message: "Assignment module not foud to update!"
          })
        }

      }
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Failed to update assignment module!"
    })
  }
}

const deleteAssigment = (req, res) => {
  try {
    const {id} = req.params
    getConnection.query("delete from assignments_modules where assignments_id = $1", [id], (error, data) => {
      if (error) {
        throw Error("Error to delete assignment module!")
      }
      else {
        if (data.rowCount > 0) {
          res.status(200).json({
            error: null,
            message: "Assignment module deleted successfully!"
          })
        }
        else {
          res.status(200).json({
            error: null,
            message: "Assignment module not found to delete!!"
          })
        }
      }
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Failed to delete Assignment module!"
    })
  }
}

export {
  getAssigments,
  createAssigment,
  getAssigmentById,
  updateAssigment,
  deleteAssigment
}


