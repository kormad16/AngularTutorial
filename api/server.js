const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
 
const app = express();

let students = [
	{firstname: 'Gerhard', lastname: 'Guggerbauer', year: '5DHIF', id: 0},
	{firstname: 'Max', lastname: 'Mustermann', year: '5DHIF', id: 1},
	{firstname: 'Leistung', lastname: 'Menschlichkeit', year: '5DHIF', id: 2},
];

app.use(cors());
app.use(bodyParser.json());

app.get('/students', (req, res) => {
	res.send(students);
});

app.get('/students/:id', (req, res) => {
	if (isNaN(req.params.id)) {
		res.sendStatus(400);
	} else if (!students[req.params.id]) {
		res.sendStatus(404);
	} else {
		res.send(students[req.params.id]);
	}
});

app.post('/students', (req, res) => {
	if (
		req.body.firstname && req.body.lastname && req.body.year
	) {
		req.body.id = students.length;
		students.push(req.body);
		console.log('Added new Student');
		res.send();
	} else {
		res.sendStatus(400);
	}
});

app.put('/students/:id', (req, res) => {
	if (
		!isNaN(req.params.id)
		&& req.body.firstname && req.body.lastname && req.body.year
	) {
		req.body.id = req.params.id;
		students[students.findIndex(s => s.id === req.params.id)] = req.body;
		console.log('Updated Student with id ' + req.params.id);
		res.send();
	} else {
		res.sendStatus(400);
	}
});

app.delete('/students/:id', (req, res) => {
	if (
		!isNaN(req.params.id)
	) {
		students = students.filter(s => s.id !== req.params.id);
		console.log('Deleted Student with id ' + req.params.id);
		res.send();
	} else {
		res.sendStatus(400);
	}
});

app.listen(3000, () =>
  console.log('Tutorial API listening on port 3000!')
);
