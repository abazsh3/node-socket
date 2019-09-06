const express = require('express'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    io = require('socket.io').listen(server);
let rooms=[];
app.get('/', (req, res) => {
});
io.on('connection', (socket) => {


    socket.on('join', function(userName,roomName) {
        console.log(userName+" "+roomName+" joined1");
        socket.join(roomName);
        rooms.push({roomId:roomName,playAgain:0});
        io.to(roomName).emit('foundOpp',{"userName":userName});
    });
    socket.on('dropIn',function (tapped,player,viewId,roomName) {
        console.log(`${tapped} ${player} ${viewId}`);
        socket.broadcast.to(roomName).emit('dropIn',{"tapped":tapped,"player":player,"viewId":viewId});
    });
    socket.on('playAgain',function (roomId) {
        let room;
        for (let i=0;i<rooms.length;i++){
            if (rooms[i].roomId===roomId){
                room=rooms[i];
            }
        }
        room.playAgain++;
        if (room.playAgain===2){
            io.to(roomId).emit("playAgain");
        }
    });

    socket.on('oppDc', function(roomId) {

        io.to(roomId).emit( 'oppDc' ,{dc:true});
        console.log("user left the game");




    })




});

server.listen(process.env.PORT ||8080,()=>{

    console.log('Node app is running on port 8080')

});

