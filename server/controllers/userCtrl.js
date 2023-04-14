const User = require('../models/userModels');
const asyncHandler = require('express-async-handler');
const {generateToken} = require('../config/jwtToken')

const createUser = asyncHandler(async (req, res, next)=>{
	const email = req.body.email;
	const find = await User.findOne({email});
	if(!find){
		const createUser = await User.create(req.body);
		res.json(createUser);
	}else{
		throw new Error("User already exists !!!");
	};
});

const loginUser = asyncHandler(async (req, res, next)=>{
	const {email, password} = req.body;
	const find = await User.findOne({email});
	if(find && (await find.isPasswordMatched(password))){
		res.json({
			_id : find?._id,
			firstName : find?.firstName,
			lastName : find?.lastName,
			email : find?.email,
			mobile : find?.mobile,
			token : generateToken(find?._id)
		})
	}else{
		throw new Error("User is not match !!!");
	};
});

const getAllUser = asyncHandler(async (req, res, next)=>{
	try {
		const getUser = await User.find();
		res.json(getUser);
	} catch (error) {
		throw new Error(error);
	}
});

const getUser = asyncHandler(async (req, res, next)=>{
	const {id} = req.params;
	try {
		const getUser = await User.findById(id);
		res.json(getUser);
	} catch (error) {
		throw new Error(error);
	}
});

const updateUser = asyncHandler(async (req, res, next)=>{
	const {_id} = req.user;
	try {
		// const getUser = await User.findById(id);
		const update = await User.findByIdAndUpdate(_id,{
			firstName: req?.body?.firstName,
			lastName: req?.body?.lastName,
			email: req?.body?.email,
			mobile: req?.body?.mobile,
		},{new: true})

		res.json(update);
	} catch (error) {
		throw new Error(error);
	}
});


const deleteUser = asyncHandler(async (req, res, next)=>{
	const {id} = req.params;
	try {
		const findId = User.findById(id);
		await User.deleteOne(findId);
		res.json("Delete success !!!");
	} catch (error) {
		throw new Error(error);
	}
});

const blockUser = asyncHandler(async (req, res, next)=>{
	const {id} = req.params;
	try {
		const findId = User.findById(id);
		await User.deleteOne(findId);
		res.json("Delete success !!!");
	} catch (error) {
		throw new Error(error);
	}
});

const unBlockUser = asyncHandler(async (req, res, next)=>{
	const {id} = req.params;
	try {
		const findId = User.findById(id);
		await User.deleteOne(findId);
		res.json("Delete success !!!");
	} catch (error) {
		throw new Error(error);
	}
});

module.exports = {createUser, loginUser, getAllUser, getUser, deleteUser,updateUser, blockUser, unBlockUser};