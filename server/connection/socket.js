import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

class Socket {
  #io;

  constructor(server) {
    this.#io = new Server(server, {
      cors: {
        origin: config.cors.allowedOrigin,
      },
    });

    this.#io.use((socket, next) => {
      // https://socket.io/docs/v4/server-socket-instance/#sockethandshake
      const token = socket.handshake.auth.token; // 꼭 auth를 사용하자!
      // const token = socket.handshake.query && socket.handshake.query.token; // query 통해 전달❌
      if (!token) {
        return next(new Error('Authentication error'));
      }
      jwt.verify(token, config.jwt.secretKey, (error, decoded) => {
        if (error) {
          return next(new Error('Authentication error'));
        }
        next();
      });
    });

    this.#io.on('connection', (socket) => {
      console.log('Socket client connected');
    });
  }
}

// TODO: Make it static functions
let socket;
export function initSocket(server) {
  if (!socket) {
    socket = new Socket(server);
  }
}
export function getSocketIO() {
  if (!socket) {
    throw new Error('Please call init first');
  }
  return socket.io;
}
