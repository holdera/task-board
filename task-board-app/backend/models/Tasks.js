const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
	task_name: {
		type: String,
		required: true,
	},
	task_description: {
		type: String,
	},
	task_priority: {
		type: String,
	},
	task_date: {
		type: Date,
	},
	task_updated_date: {
		type: Date,
		default: Date.now,
	},
	task_assignee: {
		type: String,
		required: true,
	},
	task_parent: {
		type: String,
		required: true,
	},
});

module.exports = Task = mongoose.model('task', TaskSchema);
