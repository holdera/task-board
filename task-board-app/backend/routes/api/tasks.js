const express = require('express');
const router = express.Router();

const Task = require('../../models/Tasks');

router.get('/test', (req, res) => res.send('route testing'));

router.get('/', (req, res) => {
	Task.find()
		.then((tasks) => res.json(tasks))
		.catch((err) => res.status(404).json({ notasksfound: 'No tasks' }));
});

router.get('/:id', (req, res) => {
	Task.findById(req.params.id)
		.then((tasks) => res.json(tasks))
		.catch((err) => res.status(404).json({ notasksfound: 'No tasks' }));
});

router.post('/', (req, res) => {
	console.log(req.body);
	Task.create(req.body)
		.then((task) => res.json(task))
		.catch((err) => res.status(400).json({ error: 'task not listed' }));
});

router.put('/:id', (req, res) => {
	Task.findByIdAndUpdate(req.params.id, req.body)
		.then((task) => {
			res.json({ message: 'Updated Task' });
		})
		.catch((err) =>
			res.status(400).json({ error: 'Unable to update task.' })
		);
});

router.delete('/:id', (req, res) => {
	Task.findByIdAndUpdate(req.params.id)
		.then((task) => res.json({ message: 'Deleted Task' }))
		.catch((err) => res.status(404).json({ error: 'Cannot find task.' }));
});

module.exports = router;
