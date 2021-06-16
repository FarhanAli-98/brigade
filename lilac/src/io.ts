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
  groupService
};
