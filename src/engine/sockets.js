'use strict'

module.exports = client => {

  // Server/instance specific event


  
  setTimeout(() => {
    client.io.on('hello', a => {
        console.log(a)
    })

    client.io.of('/').adapter.on('hello', a => {
        console.log(a)
    })
  }, 2000)

  // emit an event to all the Socket.IO servers of the cluster
  setTimeout(async () => {
    client.emitter.emit('hello', 'world')
  }, 10000)
}
