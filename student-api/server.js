const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
 
const app = express();

let students = [
	{firstname: 'Guhard', lastname: 'Gergerbauer', year: '5DHIF', id: 0},
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
	} else {
		const index = students.findIndex(s => s.id === +req.params.id);
		if (index === -1) {
			res.sendStatus(404);
		} else {
			res.send(students[index]);
		}
	}
});

app.post('/students', (req, res) => {
	if (
		req.body.firstname && req.body.lastname && req.body.year
	) {
		req.body.id = students.length;
		students.push(req.body);
		console.log('Added new Student');
		res.send({ id: req.body.id });
	} else {
		res.sendStatus(400);
	}
});

app.put('/students/:id', (req, res) => {
	if (
		!isNaN(req.params.id)
		&& req.body.firstname && req.body.lastname && req.body.year
	) {
		req.body.id = +req.params.id;
		const index = students.findIndex(s => s.id === req.body.id);
		if (index === -1) {
			console.log('Student with id ' + req.params.id + ' not found');
			res.sendStatus(404);
		} else {
			students[index] = req.body;
			console.log('Updated Student with id ' + req.params.id);
			res.send(req.body);
		}
	} else {
		res.sendStatus(400);
	}
});

app.delete('/students/:id', (req, res) => {
	if (
		!isNaN(req.params.id)
	) {
		const cnt = students.length;
		students = students.filter(s => s.id !== +req.params.id);
		if (students.length === cnt) {
			console.log('Student with id ' + req.params.id + ' not found');
			res.sendStatus(404);
		} else {
			console.log('Deleted Student with id ' + req.params.id);
			res.send();
		}
	} else {
		res.sendStatus(400);
	}
});

app.listen(3000, () =>
  console.log('Tutorial API listening on port 3000!')
);
