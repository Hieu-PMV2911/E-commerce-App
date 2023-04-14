const express = require('express')
const router = express.Router();
const {createUser, loginUser,getAllUser, getUser, 
	deleteUser, updateUser, blockUser, unBlockUser,
	handleRefreshToken} = require('../controllers/userCtrl')
const {authMiddleware, isAdmin} = require("../middlewares/authMiddleware");

router.get('/all-users',authMiddleware, getAllUser);
router.get('/get-user/:id',authMiddleware,isAdmin, getUser);
router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/refresh-token', handleRefreshToken);
router.patch('/update-user',authMiddleware, updateUser);
router.delete('/delete-user/:id', deleteUser);
router.put('/block-user/:id',authMiddleware,isAdmin, blockUser);
router.put('/unblock-user/:id',authMiddleware,isAdmin, unBlockUser);

module.exports = router;