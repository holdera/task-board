const express = require('express');
const connectDb = require('./config/db');
const routes = require('./routes/api/tasks');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors({ origin: true, credentials: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/tasks', routes);

connectDb();

const port = 8000;

app.get('/', (req, res) => {
	res.send('Hello');
	// res.setHeader('Access-Control-Allow-Origin', '*');
	// res.setHeader(
	// 	'Access-Control-Allow-Methods',
	// 	'GET, POST, PUT, DELETE, OPTIONS'
	// );
	// res.setHeader(
	// 	'Access-Control-Allow-Headers',
	// 	'X-Requested-With,content-type'
	// );
});

app.listen(port, () => {
	console.log('App is running');
});
