var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const PORT = 3000;

app.get('/', function (req, res) {
    // res.send('hello!');
    res.sendFile(__dirname + '/index.html');
});

app.get('/style.css', function (req, res) {
    res.sendFile(__dirname + '/style.css');
});

app.get('/main.js', function (req, res) {
    res.sendFile(__dirname + '/main.js');
});

io.on('connection', function (socket) {
    console.log(`a user connnected`);
    io.emit('entry', { from: socket.conn.remoteAddress });
    socket.on('message', function (msg) {
        console.log(`message: ${msg}`)
        io.emit('message', {
            from: socket.conn.remoteAddress,
            message: msg
        });
    });
    socket.on('disconnect', function () {
        console.log('user disconnected');
        io.emit('leave', { from: socket.conn.remoteAddress });
    });
});

http.listen(PORT, function () {
    console.log(`listening on *:${PORT}`);
})