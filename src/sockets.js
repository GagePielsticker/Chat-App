module.exports = client => {

    const io = require('socket.io')(client.server)

    //Make stateless
    io.on('connection', socket => {
        console.log('A user connected')

    })
}