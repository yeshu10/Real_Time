import * as express from 'express';
import * as http from 'http';
import { Server, Socket } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 5000;

// Define a basic route handler for the root endpoint
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

io.on('connection', (socket: Socket) => {
  console.log('A user connected');

  socket.on('drawing', (data: any) => {
    // Handle drawing event
    socket.broadcast.emit('drawing', data); // Broadcast drawing data to other clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
