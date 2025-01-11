import { createServer } from 'http';
import { Server } from 'socket.io';
import { initApp } from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000;

const startServer = async () => {
    const app = await initApp();
    const httpServer = createServer(app);

    const io = new Server(httpServer, {
        cors: { origin: '*' }
    });

    //this will be used for updates
    io.on('connection', (socket) => {
        console.log('New WebSocket connection');
        socket.emit('message', 'Hello from WebSocket server!');

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });

    httpServer.listen(PORT, () => {
        console.log(`Express.js API running at http://localhost:${PORT}`);
    });
};

startServer();
