const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

let TODOS = [
    {
        userId: 1,
        id: 1,
        title: 'delectus aut autem',
        completed: false,
        editable: false,
    },
    {
        userId: 1,
        id: 2,
        title: 'quis ut nam facilis et officia qui',
        completed: false,
    },
    {
        userId: 1,
        id: 3,
        title: 'fugiat veniam minus',
        completed: false,
    },
    {
        userId: 1,
        id: 4,
        title: 'et porro tempora',
        completed: true,
    },
    {
        userId: 1,
        id: 5,
        title: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
        completed: false,
    },
    {
        userId: 1,
        id: 6,
        title: 'qui ullam ratione quibusdam voluptatem quia omnis',
        completed: false,
    },
    {
        userId: 1,
        id: 7,
        title: 'illo expedita consequatur quia in',
        completed: false,
    },
    {
        userId: 1,
        id: 8,
        title: 'quo adipisci enim quam ut ab',
        completed: true,
    },
    {
        userId: 1,
        id: 9,
        title: 'molestiae perspiciatis ipsa',
        completed: false,
    },
    {
        userId: 1,
        id: 10,
        title: 'illo est ratione doloremque quia maiores aut',
        completed: true,
    },
    {
        userId: 1,
        id: 11,
        title: 'vero rerum temporibus dolor',
        completed: true,
    },
    {
        userId: 1,
        id: 12,
        title: 'ipsa repellendus fugit nisi',
        completed: true,
    },
    {
        userId: 1,
        id: 13,
        title: 'et doloremque nulla',
        completed: false,
    },
    {
        userId: 1,
        id: 14,
        title: 'repellendus sunt dolores architecto voluptatum',
        completed: true,
    },
    {
        userId: 1,
        id: 15,
        title: 'ab voluptatum amet voluptas',
        completed: true,
    },
    {
        userId: 1,
        id: 16,
        title: 'accusamus eos facilis sint et aut voluptatem',
        completed: true,
    },
    {
        userId: 1,
        id: 17,
        title: 'quo laboriosam deleniti aut qui',
        completed: true,
    },
    {
        userId: 1,
        id: 18,
        title: 'dolorum est consequatur ea mollitia in culpa',
        completed: false,
    },
    {
        userId: 1,
        id: 19,
        title: 'molestiae ipsa aut voluptatibus pariatur dolor nihil',
        completed: true,
    },
    {
        userId: 1,
        id: 20,
        title: 'ullam nobis libero sapiente ad optio sint',
        completed: true,
    },
];

//GET
app.get('/api/todos/', (req, res) => {
    res.status(200).json(TODOS);
});
app.get('/api/todos/:id', (req, res) => {
    const idx = TODOS.findIndex((item) => item.id === +req.params.id);
    res.status(200).json(TODOS[idx]);
});
//POST
app.post('/api/todos/', (req, res) => {
    const todo = { ...req.body, id: new Date().getTime(), completed: false, editable: false, userId: 1 };
    TODOS.push(todo);
    res.status(201).json(todo);
});

//DELETE
app.delete('/api/todos/:id', (req, res) => {
    TODOS = TODOS.filter((item) => item.id !== +req.params.id);
    res.status(200).json({ message: 'Todo was daleted' });
});
app.delete('/api/todos/', (req, res) => {
    if (req.headers.clearall === 'true') {
        TODOS = [];
        res.status(200).json({ message: 'delete all todos' });
    } else {
        res.status(401).json({ message: 'Headers not exist' });
    }
});

//PATCH
app.patch('/api/todos/:id', (req, res) => {
    const idx = TODOS.findIndex((item) => item.id === +req.params.id);
    for (let i = 0; i < Object.keys(req.body).length; i++) {
        TODOS[idx][Object.keys(req.body)[i]] = req.body[Object.keys(req.body)[i]];
    }
    res.json(TODOS[idx]);
});

//PUT
app.put('/api/todos/:id', (req, res) => {
    const idx = TODOS.findIndex((item) => item.id === +req.params.id);
    for (let i = 0; i < Object.keys(req.body).length; i++) {
        TODOS[idx][Object.keys(req.body)[i]] = req.body[Object.keys(req.body)[i]];
    }
    res.json(TODOS[idx]);
});

app.use(express.static(path.resolve(__dirname, 'client')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

app.listen(3000, () => console.log('Server had been started'));
