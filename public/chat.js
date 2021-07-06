// Socket connection
var socket = io.connect( "http://localhost:4000" );

// Query DOM
var handle = document.getElementById('handle');
var message = document.getElementById('message');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

// Emit Events
btn.addEventListener( 'click', function(){
    socket.emit( 'chat', {
        message: message.value,
        handle: handle.value
    } );
    message.value = "";
} );

message.addEventListener( 'keypress', function(){
    socket.emit( 'typing', handle.value );
} );

// Listen for Events
socket.on( 'chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ':</strong>  ' + data.message + '</p>';
} );

socket.on( 'typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing... </em></p>';
} );
