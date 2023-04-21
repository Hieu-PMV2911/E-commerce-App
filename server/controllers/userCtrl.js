const User = require('../models/userModels');
const asyncHandler = require('express-async-handler');
const {generateToken} = require('../config/jwtToken');
const validateId = require('../utils/validatemongoId');
const { generateRefreshToken } = require('../config/refreshToken');
const jwt = require('jsonwebtoken');

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
		const refreshToken = await generateRefreshToken(find?._id);
		await User.findByIdAndUpdate(find._id,{
			refreshToken: refreshToken,
		},{new: true});
		res.cookie("refreshToken",refreshToken,{
			httpOnly: true,
			maxAge: 72 * 60 * 60 * 1000
		})
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

const handleRefreshToken = asyncHandler(async (req, res, next) => {
	const token = req.cookies;
	if(!token?.refreshToken) throw new Error("No refresh token in cookie !!!");
	const refreshToken = User.findOne({refreshToken: token.refreshToken});
	if(!refreshToken) throw new Error("No refresh token present in db or not match");
	jwt.verify(refreshToken, process.env.JWT_TOKEN, (err, decoded)=>{
		if(err || refreshToken.id !== decoded.id){
			throw new Error("There is something wrong with refresh token");
		}

		const accessToken = generateToken(refreshToken?._id);
		res.json({accessToken});
	}) 
});

const clearRefreshToken = asyncHandler(async (req, res, next) => {
	const token = req.cookies;
	if(!token?.refreshToken) throw new Error("No refresh token in cookie !!!");
	const refreshToken = User.findOne({refreshToken: token.refreshToken});
	if(!refreshToken){
		res.clearCookie("refreshToken",{
			httpOnly: true,
			secure: true
		});
		return res.sendStatus(204);
	}
	await User.findOneAndUpdate(refreshToken, {
		refreshToken: ""
	})
	res.clearCookie("refreshToken",{
		httpOnly: true,
		secure: true
	})
	return res.sendStatus(204);
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
	validateId(id);

	try {
		const getUser = await User.findById(id);
		res.json(getUser);
	} catch (error) {
		throw new Error(error);
	}
});

const updateUser = asyncHandler(async (req, res, next)=>{
	const {_id} = req.user;
	validateId(_id);
	try {
		// const getUser = await User.findById(id);
		const update = await User.findByIdAndUpdate(_id,{
			firstName: req?.body?.firstName,
			lastName: req?.body?.lastName,
			email: req?.body?.email,
			mobile: req?.body?.mobile,
			// role: req?.body?.role
		},{new: true})

		res.json(update);
	} catch (error) {
		throw new Error(error);
	}
});


const deleteUser = asyncHandler(async (req, res, next)=>{
	const {id} = req.params;
	validateId(id);

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
	validateId(id);

	try {
		await User.findByIdAndUpdate(id,{
			isBlocked: true
		},{new: true});
		res.json({message: "User blocked !!!"});
	} catch (error) {
		throw new Error(error);
	}
});

const unBlockUser = asyncHandler(async (req, res, next)=>{
	const {id} = req.params;
	validateId(id);

	try {
		await User.findByIdAndUpdate(id,{
			isBlocked: false
		},{new: true});
		res.json({message: "User unBlocked !!!"});
	} catch (error) {
		throw new Error(error);
	}
});



module.exports = {createUser, loginUser, getAllUser, getUser, deleteUser,updateUser, blockUser, unBlockUser, handleRefreshToken, clearRefreshToken};