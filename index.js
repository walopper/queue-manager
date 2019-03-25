'use strict'

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');

const socketController = require('./controllers/sio.controller')(io);

app.set('x-powered-by', false);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./routers'));

const port = process.env.PORT || 3000;

server.listen(port, '127.0.0.1', () => {
    console.log(`Server iniciado en http://localhost:${port}`);
});
