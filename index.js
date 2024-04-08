const express = require('express');
const path = require('path');
const friendsRouter = require('./routers/friends.router');
const messagesRouter = require('./routers/messages.router');
const usersRouter = require('./routers/users.router');
const authRouter = require('./routers/auth.router');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const PORT = 4000;

app.use((req, res, next) => {
    const start = Date.now();
    next();
    const delta = Date.now() - start;
    console.log(`${req.method} ${req.url} ${delta}ms`);
})

app.use(express.json());
app.use('/friends', friendsRouter);
app.use('/users', usersRouter);
app.use('/messages', messagesRouter);
// app.use('/signup', authRouter.signup);
// app.use('/login', authRouter.login);
app.use('/auth', authRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Friends App',
        caption: 'Mountains are awesome!'
    });
});

app.get('/photo', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'img.jpg'));
        // __dirname = D:/dev/express
        // WINDOWS     D:\dev\express\public\img.jpg
        // LINUX, MAC        /var/www/public/img.jpg
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})