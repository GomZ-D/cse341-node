const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

//----------------------------------------------
//--ROUTES
//----------------------------------------------


//Get all the collection.
router.get('/', usersController.getAll);
//Get ony document.
router.get('/:id', usersController.getSingle);
//create
router.post('/', usersController.createUser);
//DELETE USER
router.delete('/:id', usersController.deleteUser);
//UPDATE USER
router.put('/:id', usersController.updateUser);

module.exports = router;