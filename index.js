var app = require('express')();
var http = require('http').Server(app);
var socketIO = require('socket.io')(http);
const path = require('path')
const ex = require('express')

app.use(ex.urlencoded({ extended: true }));
app.use(ex.json());

app.use(ex.static('public'))

app.get('/' , (req , res) => {
    res.sendFile('index.html')
})

app.post('/register' , (req , res) => {
    res.send({msg : 'ok' , data : req.body})
})

app.get('/game',  (req , res) => {
    res.sendFile(path.join(__dirname , 'public/game.html'))
})

socketIO.on('connection' , (socket) => {
    console.log('connected ' + socket.id)
    socket.on('send_data' , data => {
        socketIO.emit('send_data' , data)
    })
})

http.listen(3000 , () => console.log("Server is running..."))