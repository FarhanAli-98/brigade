import { Namespace, Server } from 'socket.io';
import http from 'http';
import verifyAccessToken from './middlewares/verifyAccessToken';
import Chat from './services/Chat';
import Location from './services/Location';
import Message from './services/Message';
import chatController from './controllers/chat';
import locationController from './controllers/location';
import groupController from './controllers/groups';
import Group from './services/Groups';

import Redis from 'ioredis';


import {REDIS_HOST, REDIS_PORT} from './config/redis'


const httpServer = http.createServer();

const io = new Server(httpServer, {
  allowEIO3: true,
  cors: {
    origin: '*'
  },
  maxHttpBufferSize: 10e9,
  path: '/lilac'
});


// var redis: Redis.Redis;

// redis = new Redis({
//   port: REDIS_PORT,
//   host: 'redis',
//   family: REDIS_IP_FAMILY, // 4 (IPv4) or 6 (IPv6)
//   db: REDIS_DB,
// })

// import redis  from 'redis';
// const client = redis.createClient({
//   port: REDIS_PORT,
//   host:REDIS_HOST ,
// });
// client = redis.createClient(6380, "localhost");
// client.on('error', (err: string) => {
//   console.log('Error ' + err);
// });

const chatNsp: Namespace = io.of('/chat');

const locationNsp: Namespace = io.of('/location');

const groupNsp: Namespace = io.of('/groups');

const chatService = new Chat(new Message())

const locationService = new Location();

const groupService = new Group();



chatNsp.use(
  verifyAccessToken,
);

locationNsp.use(
  verifyAccessToken,
);

groupNsp.use(
  verifyAccessToken,
);


chatNsp.on('connection', chatController);

locationNsp.on('connection', locationController);

groupNsp.on('connection',groupController);


export {
  httpServer,
  io,
  chatService,
  locationService,
  groupService,
  
};
