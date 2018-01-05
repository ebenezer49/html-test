$(function () {

    var socket = io();
    var messageBox = $('#message-box');
    var messageForm = $('#message-form');
    var messageInput = $('#message-input');

    messageForm.submit(function () {
        let value = messageInput.val();
        if (value) {
            socket.emit('message', value);
            messageInput.val('');
        }
        return false;
    });

    socket.on('entry', function (msg) {
        showMsg('entry', msg);
    });
    socket.on('message', function (msg) {
        console.log('new message.');
        showMsg('message', msg);
    });
    socket.on('leave', function (msg) {
        showMsg('leave', msg);
    });

    function showMsg(type, msg) {
        console.log(`[new msg] type: ${type}, msg: ${JSON.stringify(msg)}`);
        let li = $('<li>');
        let str = '';
        if (type === 'entry') {
            li.css('color', 'green');
            str = msg.from + ' entry.';
        } else if (type === 'message') {
            li.css('color', 'black');
            str = msg.from + ' say: ' + msg.message;
        } else if (type === 'leave') {
            li.css('color', 'red');
            str = msg.from + ' leaved.';
        }
        console.log(str);
        li.text(str);
        messageBox.append(li);
    }
});