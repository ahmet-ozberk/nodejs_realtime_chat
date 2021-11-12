var http = require('http'); 
var express = require('express'); 
var app = express(); 
var server = http.createServer(app); 
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile('./index.html', {root: __dirname});
});

io.on('connection', function (socket) { 
    console.log('a user connected');
    socket.on('send_message', function (msg) { 
        io.emit('receive_message', msg); 
    });
    socket.on('disconnect', function () { 
        console.log('user disconnected'); 
    });
});

const port = 8000; 
server.listen(port, () => { 
    console.log('Server is listening on:' + port + ' now...'); 
});