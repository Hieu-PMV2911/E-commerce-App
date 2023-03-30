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

module.exports = {createUser, loginUser};