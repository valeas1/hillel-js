const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.json());

//GET
app.get('/api/todos/', (req, res) => {
    let todos;

    let api_token = req.headers['api_token'];

    try {
        if (api_token === 'null') {
            api_token = new Date().getTime();

            const todosFile = fs.writeFileSync(`${api_token}.txt`, '[]', 'utf-8');

            const data = fs.readFileSync(`${api_token}.txt`, 'utf-8');

            todos = JSON.parse(data);
        } else {
            const dataFile = fs.readFileSync(`${api_token}.txt`, 'utf8');

            todos = JSON.parse(dataFile);
        }
    } catch (err) {
        console.error(err);
    }

    res.status(200).json({ todos, api_token });
});

app.get('/api/todos/:id', (req, res) => {
    let todos;

    try {
        const data = fs.readFileSync('TODOS.txt', 'utf8');

        todos = JSON.parse(data);

        let idx = todos.findIndex((item) => item.id === +req.params.id);

        if (idx === -1) {
            res.status(204).json({ message: 'Item doesnt exist' });
        }

        res.status(200).json(todos[idx]);
    } catch (err) {
        console.error(err);
    }
});

//POST

app.post('/api/todos/', (req, res) => {
    if (!req.body.title) {
        res.status(204).json({ message: 'Request doesnt have title' });
    }

    const todo = { ...req.body, id: new Date().getTime(), completed: false, editable: false, userId: 1 };

    let todos;

    try {
        let data = fs.readFileSync('TODOS.txt', 'utf8');
        todos = JSON.parse(data);
        todos.push(todo);
        try {
            fs.writeFileSync('TODOS.txt', JSON.stringify(todos), 'utf8');
        } catch {
            console.error(err);
        }
    } catch (err) {
        console.error(err);
    }

    res.status(201).json(todo);
});

//DELETE

app.delete('/api/todos/:id', (req, res) => {
    let todos;

    try {
        const data = fs.readFileSync('TODOS.txt', 'utf8');

        todos = JSON.parse(data);

        todos = todos.filter((item) => item.id !== +req.params.id);

        if (todos.length === 0) {
            res.status(204).json({ message: 'Item doesnt exist' });
        }

        try {
            fs.writeFileSync('TODOS.txt', JSON.stringify(todos), 'utf8');
        } catch {
            console.error(err);
        }
    } catch (err) {
        console.error(err);
    }

    res.status(200).json({ message: 'Todo was daleted' });
});

app.delete('/api/todos/', (req, res) => {
    if (req.headers.clearall === 'true') {
        try {
            fs.writeFileSync('TODOS.txt', '[]', 'utf8');
        } catch {
            console.error(err);
        }

        res.status(200).json({ message: 'delete all todos' });
    } else {
        res.status(401).json({ message: 'Headers not exist' });
    }
});

//PATCH

app.patch('/api/todos/:id', (req, res) => {
    let todos;

    try {
        let data = fs.readFileSync('TODOS.txt', 'utf8');

        todos = JSON.parse(data);

        let idx = todos.findIndex((item) => item.id === +req.params.id);

        if (idx === -1) {
            res.status(204).json({ message: 'Item doesnt exist' });
        }

        for (let i = 0; i < Object.keys(req.body).length; i++) {
            todos[idx][Object.keys(req.body)[i]] = req.body[Object.keys(req.body)[i]];
        }

        try {
            fs.writeFileSync('TODOS.txt', JSON.stringify(todos), 'utf8');
        } catch {
            console.error(err);
        }

        res.json(todos[idx]);
    } catch (err) {
        console.error(err);
    }
});

app.use(express.static(path.resolve(__dirname, 'client')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

// app.listen(3000, '192.168.0.101', () => console.log('Server had been started'));
app.listen(3000, () => console.log('Server had been started'));
