const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.Server(app);
const io = socketio(server);

app.use(express.static('public'));

server.listen(4000, ()=>console.log('server up on port 4000'));

const rooms = [];

//listen for new connections
io.on('connection', (socket)=>{
    console.log('someone tried to connect');

    //create a new game room and notify player
    socket.on('createGame', (room)=>{
        socket.join(room);
        rooms.push(room);
        // socket.emit('newGame', {name: data.name, room: 'room'+rooms});
        console.log('started a new game', room);
        socket.broadcast.emit('newGame', room);
        socket.emit('player1', room);
        console.log(socket.io)
    });

    ///connect the player 2 to the room request
    socket.on('joinGame', (data)=>{
        console.log('trying to join a game');
        var room = io.nsps['/'].adapter.rooms[data.room];
        console.log(room);
        if( room && room.length === 1){
            socket.join(data.room);
            socket.broadcast.to(data.room).emit('player1', {});
            socket.emit('player2', {name: data.name, room: data.room})
        }
        else{
            socket.emit('err', {message: 'room is full'});
        }
    });

    // socket.on('wait', data => {
    //     socket.broadcast.to(data.room).emit('wait', data);
    // })

    //handle the turn played by either player and notify the other
    socket.on('playTurn', (data)=>{
        socket.boardcast.to(data.room).emit('turnPlayed', {
            title: data.title,
            room: data.room
        });
    });

    //notify when there is a winner
    socket.on('gameEnded', (data)=>{
        socket.boardcast.to(data.room).emit('gameEnd', data);
    });


    socket.on('disconnect', ()=>{
        console.log(`Playerdisconnected`);
        // connections[playerIdx] =null;
    });
});

