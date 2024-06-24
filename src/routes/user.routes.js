const express = require('express');

const router = express.Router();

const userController = require('../controllers/user.controller');

//create a new user
router.post('/create',userController.Create)

//get list users
router.get('/list_users',userController.findAll)

//get user by id
router.get('/find_by_id/:id',userController.findById)

//delet user
router.delete('/delete/:id',userController.delete)
 
//update user
router.put('/update/:id', userController.update)

module.exports=router