# Chat App
 ** THIS REPO IS CURRENTLY BEING MADE AND HAS NO FINISHED FORM YET **



## SocketIO Information

### Preface
> To make socket.io work ideally on multiple nodes, you would want to setup whats known as a `sticky-session` or else you will experience HTTP 400 errors. This however is only for supporting the HTTP long-polling method. We can disable it and rely on websockets entirely which alieviates this requirement.

More on this from [Socket.io](https://socket.io/docs/v4/using-multiple-nodes/#why-is-sticky-session-required)

```js
const socket = io('https://io.ourhost.com', {
  // WARNING: in this case, there is no fallback to long-polling
  transports: [ 'websocket' ]
})
```

### Multi-Node Adapters
There are two adapter setups I included. One being the [MongoDB Adapter](https://socket.io/docs/v4/mongo-adapter/) and the other being the [Redis Adapter](https://socket.io/docs/v4/redis-adapter/). Defaultly we are using the `Redis` adapter, however if you wish to use the MongoDB adapter, simply comment out the `RedisAdapter require` in the `./src/index.js` and uncomment the `MongoAdapter require`. Do note - The MongoDB Adapter **requires a sharded/replica MongoDB set**. It will not work for solo instances.
