'use strict'

  /* Dependencies */
  const { createAdapter } = require('@socket.io/mongo-adapter')
  const { MongoClient } = require('mongodb')
  const { Emitter } = require('@socket.io/mongo-emitter')
  
module.exports = async client => {

  /* Grab our settings */
  const {
    host,
    port,
    db,
    socketCollection,
    username,
    password
  } = client.settings.mongodb

  /* Setup our mongoDB adapter, try and create a collection */
  const mongoClient = new MongoClient(`mongodb://${username ? `${username}:${password}@` : ''}${host}:${port}`)

  await mongoClient.connect()
    .then(console.log('Successfully connected to mongoDB.'))
    .catch(e => console.log(`ERROR ATTEMPTING TO CONNECT TO MONGODB: ${e}`))

  await mongoClient.db(db).createCollection(socketCollection, {
    capped: client.settings.cappedCollection,
    size: client.settings.cappedSize
  })
    .catch(e => console.log(`ERROR ATTEMPTING TO CREATE MONGO COLLECTION: ${e}`))

  // Setup our adapter and emitter
  const mongoCollection = mongoClient.db(db).collection(socketCollection)

  await client.io.adapter(createAdapter(mongoCollection))
  client.emitter = new Emitter(mongoCollection)
}
