const express = require('express')
const router = express.Router();
const {createUser, loginUser,getAllUser, getUser, 
	deleteUser, updateUser, blockUser, unBlockUser,
	handleRefreshToken, clearRefreshToken} = require('../controllers/userCtrl')
const {authMiddleware, isAdmin} = require("../middlewares/authMiddleware");

router.get('/all-users',authMiddleware, getAllUser);
router.get('/get-user/:id',authMiddleware,isAdmin, getUser);
router.post('/register', createUser);
router.post('/login', loginUser);
router.put('/block-user/:id',authMiddleware,isAdmin, blockUser);
router.put('/unblock-user/:id',authMiddleware,isAdmin, unBlockUser);
router.put('/refresh-token', handleRefreshToken);
router.get('/clear-token', clearRefreshToken);
router.patch('/update-user',authMiddleware, updateUser);
router.delete('/delete-user/:id', deleteUser);

module.exports = router;