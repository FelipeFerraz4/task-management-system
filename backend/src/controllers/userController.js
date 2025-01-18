
// Handles operations related to user management, such as registration, authentication, and profile management.
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { addToBlockList } from '../services/tokenService.js';

// Retrieves the profile of the currently authenticated user.
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar perfil', error: error.message });
    }
};

// Registers a new user in the system.
export const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const user = await User.create({ name, email, password, role });
        res.status(201).json({ message: 'Usuário registrado', user: { name, email, role } });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao registrar usuário', error: error.message });
    }
};

// Authenticates a user and provides a JWT for subsequent requests.
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        const isPasswordValid = await user.validatePassword(password); // Compares the provided password with the stored hash.
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
    }
};

export const logoutUser = async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({message: 'Token não fornecido'});
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token malformado' });
    }

    try {
        await addToBlockList(token);
        res.status(200).json({ message: 'Logout realizado com sucesso' });
    } catch (error) {
        res
          .status(500)
          .json({ message: 'Erro ao fazer logout', error: error.message });        
    }
};

// Updates the profile information of the currently authenticated user.
export const updateUserProfile = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const updatedData = {
            name: name || user.name,
            email: email || user.email,
        };

        if (password) {
            updatedData.password = await bcrypt.hash(password, 10);
        }

        await user.update(updatedData);
        res.status(200).json({ message: 'Perfil atualizado com sucesso', user: { name: updatedData.name, email: updatedData.email } });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar perfil', error: error.message });
    }
};
