var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen( 4000, function(){
    console.log("Server listening on port: 4000...");
} );

// Static files
app.use( express.static('public') );

// Socket setup
var io = socket(server);
io.on( 'connection', function(socket){
    console.log("Socket connection established : ", socket.id);

    // Handling a Chat being sent
    socket.on( 'chat', function(data){
        io.emit( 'chat', data );  // emits to all connected sockets 
    } );

    // Handling a Handle/user typing
    socket.on( 'typing', function(data){
        socket.broadcast.emit( 'typing', data );  // emits to all the other sockets
    } );

} );
