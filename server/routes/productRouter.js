const express = require('express')
const router = express.Router();
const {createProduct, getProduct, getAllProduct, updateProduct, deleteProduct} = require('../controllers/productCtrl')
const {isAdmin, authMiddleware} = require("../middlewares/authMiddleware")
router.get('/:id',authMiddleware,isAdmin, getProduct);
router.get('/', getAllProduct);
router.post('/', createProduct);
router.put('/:id',authMiddleware,isAdmin, updateProduct);
router.delete('/:id',authMiddleware,isAdmin, deleteProduct);

module.exports = router