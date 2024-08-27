const mongoose = require('mongoose');
const db =
	'mongodb+srv://holdera09:Go6t26ZAgiNNscfD@cluster0.vyahrlq.mongodb.net/taskboard?retryWrites=true&w=majority&appName=Cluster0';

mongoose.set('strictQuery', true, 'useNewUrlParser', true);

const connectDb = async () => {
	try {
		await mongoose.connect(db);
		console.log('connected');
	} catch (error) {
		console.log(error?.message ?? 'error, failed to connect');
		ProcessingInstruction.exit(1);
	}
};

module.exports = connectDb;
