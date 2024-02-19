const express = require('express');
const friendsRouter = require('./routers/friends.router');

const app = express();

const PORT = 4000;

app.use((req, res, next) => {
    const start = Date.now();
    next();
    const delta = Date.now() - start;
    console.log(`${req.method} ${req.url} ${delta}ms`);
})

app.use(express.json());

app.use('/friends', friendsRouter);

app.get('/', (req, res) => {
    res.send('It works!')
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})