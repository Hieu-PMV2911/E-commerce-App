const User = require('../models/userModels');
const asyncHandler = require('express-async-handler');

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

module.exports = {createUser};