var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var Chat = function(){
    this.users = [];

    this.addUser = function(_user){
        this.users.push(_user);
    }
}


var Message = function(_user, _content){
    this.user = _user;
    this.content = _content;
}

var User = function(_name){
    this.name = _name;
}



app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

var chat = new Chat();

io.on('connection', function(socket){
  io.emit('user connected', 'user connected');

  socket.on('new user', function(nickname){
    chat.addUser(nickname);

    io.emit('users list', chat.users);
  });

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function(){
    io.emit('user disconnected', 'user disconnected');
  })
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});




