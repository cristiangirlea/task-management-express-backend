import { Request, Response } from 'express';
import axios from 'axios';

const LARAVEL_API = process.env.LARAVEL_API || 'http://localhost:8000/api';

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const response = await axios.get(`${LARAVEL_API}/users`);
        res.json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching users' });
    }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`${LARAVEL_API}/users/${id}`);
        res.json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching user' });
    }
};
