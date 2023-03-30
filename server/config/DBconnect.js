const { mongoose } = require("mongoose")

const DBconnect = () =>{
	try {
		const conn = mongoose.connect(process.env.MONGODB);
		console.log("connect db success");
	}catch(err){
		console.log(err)
	}
}

module.exports = DBconnect;