import { Namespace, Server } from 'socket.io';
import http from 'http';
import verifyAccessToken from './middlewares/verifyAccessToken';
import Chat from './services/Chat';
import Location from './services/Location';
import Message from './services/Message';
import chatController from './controllers/chat';
import locationController from './controllers/location';

const httpServer = http.createServer();

const io = new Server(httpServer, {
  allowEIO3: true,
  cors: {
    origin: '*'
  },
  maxHttpBufferSize: 10e5,
  path: '/lilac'
});

const chatNsp: Namespace = io.of('/chat');

const locationNsp: Namespace = io.of('/location');

const jobNsp: Namespace = io.of('/job');

const chatService = new Chat(new Message())

const locationService = new Location();



chatNsp.use(
  verifyAccessToken,
);

locationNsp.use(
  verifyAccessToken,
);


chatNsp.on('connection', chatController);

locationNsp.on('connection', locationController);


export {
  httpServer,
  io,
  chatService,
  locationService,
};
