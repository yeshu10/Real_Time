// socketManager.ts

import io from 'socket.io-client';

const socket = io('http://localhost:5000');

export const initializeSocket = () => {
  return socket;
};

export const emitDrawing = (data: any) => {
  socket.emit('drawing', data);
};

export const emitCursor = (data: any) => {
  socket.emit('cursor', data);
};

export const onDrawingEvent = (callback: (data: any) => void) => {
  socket.on('drawing', callback);
};

export const onCursorEvent = (callback: (data: any) => void) => {
  socket.on('cursor', callback);
};
