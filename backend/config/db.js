require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', true, 'useNewUrlParser', true);

const connectDb = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log('connected');
	} catch (error) {
		console.log(error?.message ?? 'error, failed to connect');
		ProcessingInstruction.exit(1);
	}
};

module.exports = connectDb;
