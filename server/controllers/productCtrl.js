const asyncHandler = require('express-async-handler');
const Product = require("../models/productModels");
const slugify = require("slugify")
const createProduct = asyncHandler(async (req, res)=>{
	try {
		if(req.body.title){
			req.body.slug = slugify(req.body.title)
		}
		const createProduct = await Product.create(req.body)
		res.json(createProduct);
	} catch (error) {
		throw new Error(error);
	}
});

const getProduct = asyncHandler(async (req, res)=>{
	const {id} = req.params;
	try {
		const findProduct = await Product.findById(id)
		res.json(findProduct);
	} catch (error) {
		throw new Error(error);
	}
});

const getAllProduct = asyncHandler(async (req, res)=>{
	try {
		const findProduct = await Product.find();
		res.json(findProduct);
	} catch (error) {
		throw new Error(error);
	}
});

const updateProduct = asyncHandler(async (req, res)=>{
	const {id} = req.params;
	try {
		if(req.body.title){
			req.body.slug = slugify(req.body.title)
		}
		const updateProduct = await Product.findOneAndUpdate(id, req.body, {new:true})
		res.json(updateProduct);
	} catch (error) {
		throw new Error(error);
	}
});

const deleteProduct = asyncHandler(async (req, res)=>{
	const {id} = req.params;
	try {
		const deleteProduct = await Product.findOneAndDelete(id, {new:true})
		res.json(deleteProduct);
	} catch (error) {
		throw new Error(error);
	}
});

module.exports = {createProduct, getProduct, getAllProduct, updateProduct, deleteProduct};