import { Request, Response } from 'express';
import axios from 'axios';
import {LARAVEL_API} from "../config/config";

console.log('LARAVEL_API user:', process.env.LARAVEL_API)

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
