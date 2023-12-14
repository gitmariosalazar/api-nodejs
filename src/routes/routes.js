import {Router} from 'express';
const router = Router();
import passport from 'passport';

import {getUsers, createUser, getUserById, updateUser, deleteUser, updateUserPassword} from '../controllers/users.controllers.js'
import {getModules, createModule, getModuleById, updateModule, deleteModule} from '../controllers/modules.controllers.js';
import {getRoles, createRol, getRolById, updateRol, deleteRol} from '../controllers/rol.controllers.js';
import {getAssigments, createAssigment, getAssigmentById, updateAssigment, deleteAssigment} from '../controllers/assigment.controllers.js';
import {getFunctions, createFunctions, getFunctionById, updateFunctions, deleteFunction} from '../controllers/functions.controllers.js';
import {getAssigmentsFunctions, createAssigmentFunctions, getAssigmentFunctionsById, updateAssigmentFunctions, deleteAssigmentFunctions} from '../controllers/assigfunctions.controllers.js';
import {Login} from '../controllers/login.controllers.js';

router.get('/users', getUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.put('/users_psw/:id', updateUserPassword);
router.get('/users/:id', getUserById);
router.delete('/users/:id', deleteUser);

router.get('/modules', getModules);
router.post('/modules', createModule);
router.put('/modules/:id', updateModule);
router.get('/modules/:id', getModuleById);
router.delete('/modules/:id', deleteModule);

router.get('/roles', getRoles);
router.post('/roles', createRol);
router.put('/roles/:id', updateRol);
router.get('/roles/:id', getRolById);
router.delete('/roles/:id', deleteRol);

router.get('/assigments', getAssigments);
router.post('/assigments', createAssigment);
router.put('/assigments/:id', updateAssigment);
router.get('/assigments/:id', getAssigmentById);
router.delete('/assigments/:id', deleteAssigment);

router.get('/functions', getFunctions);
router.post('/functions', createFunctions);
router.put('/functions/:id', updateFunctions);
router.get('/functions/:id', getFunctionById);
router.delete('/functions/:id', deleteFunction);

router.get('/assigfunctions', getAssigmentsFunctions);
router.post('/assigfunctions', createAssigmentFunctions);
router.put('/assigfunctions/:id', updateAssigmentFunctions);
router.get('/assigfunctions/:id', getAssigmentFunctionsById);
router.delete('/assigfunctions/:id', deleteAssigmentFunctions);

router.get('/login', Login);

router.get('/microsoft', passport.authenticate("auth-microsoft", {
  prompt: "select_account",
  session: false
}))

router.get('/microsoft/callback', passport.authenticate("auth-microsoft", {
  failureRedirect: '/auth/microsoft',
  session: false
}), (req, res) => {
  //res.status(200).json({user: req.user, accessToken: "Token"})
  try {
    res.status(200).json(req.user)
  } catch (error) {
    res.json({error: error})
  }
});

export {
  router
}   