const express = require('express')
const router = express.Router();
const {createUser, loginUser,getAllUser, getUser, deleteUser, updateUser, blockUser, unBlockUser} = require('../controllers/userCtrl')
const {authMiddleware, isAdmin} = require("../middlewares/authMiddleware");

router.get('/all-users',authMiddleware, getAllUser);
router.get('/get-user/:id',authMiddleware,isAdmin, getUser);
router.post('/register', createUser);
router.post('/login', loginUser);
router.patch('/update-user',authMiddleware, updateUser);
router.delete('/delete-user/:id', deleteUser);
router.patch('/block-user',authMiddleware,isAdmin, blockUser);
router.patch('/unblock-user',authMiddleware,isAdmin, unBlockUser);

module.exports = router;