'use strict'

/* Dependencies */
const { createAdapter } = require('@socket.io/redis-adapter')
const { createClient } = require('redis')
const { Emitter } = require('@socket.io/redis-emitter')

module.exports = async client => {
  /* Setup our redis pubsub client */
  const {
    host,
    port,
    db,
    username,
    password
  } = client.settings.redis

  const pubClient = createClient({ url: `redis://${username ? `${username}:${password}@` : ''}${host}:${port}` })
  const subClient = pubClient.duplicate()

  /* Connect our pub client */
  await pubClient.connect()
  .then(console.log('Successfully connected to redis pub client'))
  .catch(e => console.log(`ERROR CONNECTING TO REDIS PUB CLIENT ${e}`))

  await subClient.connect()
  .then(console.log('Successfully connected to redis sub client'))
  .catch(e => console.log(`ERROR CONNECTING TO REDIS sub CLIENT ${e}`))

  /* Setup adapter + emitter */
  await client.io.adapter(createAdapter(pubClient, subClient))
  client.emitter = new Emitter(pubClient)
  
}
