import { loginService, registerService } from '../services/auth.services.js';

export const loginController = async (req, res) => {
    const token = await loginService(req.body);

    res.status(200).json({ message: 'Login successful', token });
}

export const registerController = async (req, res) => {
    const token = await registerService(req.body);
    
    res.status(201).json({ message: 'User registered successfully', token });
}