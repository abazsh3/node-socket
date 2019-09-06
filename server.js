const express = require('express'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    io = require('socket.io').listen(server);
app.get('/', (req, res) => {
});
io.on('connection', (socket) => {


    socket.on('join', function(userName,roomName) {
        console.log(userName+" "+roomName+" joined1");
        socket.join(roomName);
        io.to(roomName).emit('foundOpp',{"userName":userName});
    });
    socket.on('dropIn',function (tapped,player,viewId,roomName) {
        console.log(`${tapped} ${player} ${viewId}`);
        socket.broadcast.to(roomName).emit('dropIn',{"tapped":tapped,"player":player,"viewId":viewId});
    });

    // socket.on('disconnect', function() {
    //
    //     console.log(userNickname +' has left ');
    //
    //     socket.broadcast.emit( "userdisconnect" ,' user has left')
    //
    //
    //
    //
    // })




});

server.listen(8080,()=>{

    console.log('Node app is running on port 8080')

});

