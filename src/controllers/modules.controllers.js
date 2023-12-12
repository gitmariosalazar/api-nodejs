import {getConnection} from '../database/database.js';

// Users CRUD 
const getModules = async (req, res) => {
  try {
    const response = await getConnection.query('select*from modules;');
    if (response === undefined) {
      res.status(404).json({
        error: null,
        modules: "Modules not found!"
      })
    }
    else {
      res.status(200).json(response.rows)
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      modules: null
    })
  }
}

const createModule = async (req, res) => {
  try {
    const {modules_name, module_code} = req.body
    if (!modules_name) {
      throw Error("Send Module in request body!")
    }
    getConnection.query("insert into modules(modules_name, module_code, register_date) values($1, $2, $3);", [modules_name, module_code, new Date()], (err, data) => {
      if (err) {
        res.status(201).json({
          error: err.message,
          message: "Create new Module failed!"
        });
      }
      else {
        res.status(201).json({
          error: null,
          message: "Create new Module successfully!"
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Failed to create module!"
    });
  }
}

const getModuleById = async (req, res) => {
  try {
    const module_id = req.params.id
    if (!module_id) {
      throw Error("Please, enter the module_id!")
    }
    getConnection.query("select*from modules where modules_id = $1;", [module_id], (error, data) => {
      if (data.rows[0] === undefined) {
        res.status(404).json({
          error: null,
          module: null
        });
      }
      else {
        res.status(200).json({
          error: null,
          module: data.rows[0]
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      module: null
    })
  }
}

const updateModule = async (req, res) => {
  try {
    const {id} = req.params
    const {modules_name, module_code} = req.body
    getConnection.query("update modules set modules_name = $1, module_code = $2 where modules_id = $3;", [modules_name, module_code, id], (error, data) => {
      if (error) {
        throw Error("Error to update module!")
      }
      else {
        if (data.rowCount > 0) {
          res.status(201).json({
            error: null,
            message: "Updated module successfully!"
          })
        } else {
          res.status(201).json({
            error: null,
            message: "User not foud to update!"
          })
        }

      }
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Failed to update module!"
    })
  }
}

const deleteModule = (req, res) => {
  try {
    const {id} = req.params
    getConnection.query("delete from modules where modules_id = $1", [id], (error, data) => {
      if (error) {
        throw Error("Error to delete user!")
      }
      else {
        if (data.rowCount > 0) {
          res.status(200).json({
            error: null,
            message: "Module deleted successfully!"
          })
        }
        else {
          res.status(200).json({
            error: null,
            message: "Module not found to delete!!"
          })
        }
      }
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Failed to delete Module!"
    })
  }
}

export {
  getModules,
  createModule,
  getModuleById,
  updateModule,
  deleteModule
}


