import mongoose from 'mongoose';

const connectDb = async () => {
	try {
		await mongoose.connect(process.env.MONGO_DB_URI);
		console.log('connected');
	} catch (error) {
		console.log(error?.message ?? 'error, failed to connect');
		ProcessingInstruction.exit(1);
	}
};

export default connectDb;
