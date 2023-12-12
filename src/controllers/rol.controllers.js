import {getConnection} from '../database/database.js';

// Users CRUD 
const getRoles = async (req, res) => {
  try {
    const response = await getConnection.query('select*from rol;');
    if (response === undefined) {
      res.status(404).json({
        error: null,
        roles: "Roles not found!"
      })
    }
    else {
      res.status(200).json(response.rows)
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      roles: null
    })
  }
}

const createRol = async (req, res) => {
  try {
    const {rol_name} = req.body
    if (!rol_name) {
      throw Error("Send Module in request body!")
    }
    getConnection.query("insert into rol(rol_name, register_date) values($1, $2);", [rol_name, new Date()], (err, data) => {
      if (err) {
        res.status(201).json({
          error: err.message,
          message: "Create new rol failed!"
        });
      } else {
        res.status(201).json({
          error: null,
          message: "Create new rol successfully!"
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Failed to create rol!"
    });
  }
}

const getRolById = async (req, res) => {
  try {
    const rol_id = req.params.id
    if (!rol_id) {
      throw Error("Please, enter the rol id!")
    }
    getConnection.query("select*from rol where rol_id = $1;", [rol_id], (error, data) => {
      if (data.rows[0] === undefined) {
        res.status(404).json({
          error: null,
          rol: null
        });
      }
      else {
        res.status(200).json({
          error: null,
          rol: data.rows[0]
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      rol: null
    })
  }
}

const updateRol = async (req, res) => {
  try {
    const {id} = req.params
    const {rol_name} = req.body
    getConnection.query("update rol set rol_name = $1 where rol_id = $2;", [rol_name, id], (error, data) => {
      if (error) {
        throw Error("Error to update rol!")
      }
      else {
        if (data.rowCount > 0) {
          res.status(201).json({
            error: null,
            message: "Updated rol successfully!"
          })
        } else {
          res.status(201).json({
            error: null,
            message: "Rol not foud to update!"
          })
        }

      }
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Failed to update rol!"
    })
  }
}

const deleteRol = (req, res) => {
  try {
    const {id} = req.params
    getConnection.query("delete from rol where rol_id = $1", [id], (error, data) => {
      if (error) {
        throw Error("Error to delete rol!")
      }
      else {
        if (data.rowCount > 0) {
          res.status(200).json({
            error: null,
            message: "Rol deleted successfully!"
          })
        }
        else {
          res.status(200).json({
            error: null,
            message: "Rol not found to delete!!"
          })
        }
      }
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Failed to delete Rol!"
    })
  }
}

export {
  getRoles,
  createRol,
  getRolById,
  updateRol,
  deleteRol
}


