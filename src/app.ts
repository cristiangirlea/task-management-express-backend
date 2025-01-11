import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';
import { connectRedis } from './config/RedisClient';
import projectRoutes from "./routes/projectRoutes";

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/tasks', taskRoutes); // Mount task routes
app.use('/api/projects', projectRoutes); // Mount task routes

export const initApp = async () => {
    await connectRedis(); // Connect Redis when app initializes
    return app;
};
