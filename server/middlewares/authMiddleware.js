const userModels = require("../models/userModels");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) =>{
	let token;
	if(req?.headers?.authorization?.startsWith("Bearer")){
		token = req.headers.authorization.split(" ")[1];
		try {
			if(token){
				const decoded = jwt.verify(token, process.env.JWT_TOKEN);
				const user = await userModels.findById(decoded?.id);
				req.user = user;
				next();
			}
		} catch (error) {
			throw new Error("Not Authorized token expired, Pls Login again");
		}
	}else{
		throw new Error("There is no token attached to header");
	}
});

const isAdmin = asyncHandler(async (req, res, next) =>{
	const {email} = req.user;
	const roleUser = await userModels.findOne({email});
	if(roleUser.role !== "admin"){
		throw new Error("You are not Admin");
	}else{
		next();
	}
});

module.exports = {authMiddleware, isAdmin};