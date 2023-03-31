const express = require('express')
const router = express.Router();
const {createUser, loginUser,getAllUser, getUser, deleteUser, updateUser} = require('../controllers/userCtrl')

router.get('/all-users', getAllUser);
router.get('/get-user/:id', getUser);
router.post('/register', createUser);
router.post('/login', loginUser);
router.patch('/update-user/:id', updateUser);
router.delete('/delete-user/:id', deleteUser);

module.exports = router;