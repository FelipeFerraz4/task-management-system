import Task from '../models/Task.js';

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({ where: { userId: req.user.id } });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar tarefas', error: error.message });
    }
};

export const getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findByPk(id);
        if (!task || task.userId !== req.user.id) {
            return res.status(404).json({ message: 'Tarefa não encontrada' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar tarefa', error: error.message });
    }
};

export const createTask = async (req, res) => {
    const { title, description, dueDate } = req.body;
    try {
        const task = await Task.create({ title, description, dueDate, userId: req.user.id });
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar tarefa', error: error.message });
    }
};

export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;
    try {
        const task = await Task.findByPk(id);
        if (!task || task.userId !== req.user.id) {
            return res.status(404).json({ message: 'Tarefa não encontrada' });
        }
        await task.update({ title, description, status, dueDate });
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar tarefa', error: error.message });
    }
};

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findByPk(id);
        if (!task || task.userId !== req.user.id) {
            return res.status(404).json({ message: 'Tarefa não encontrada' });
        }
        await task.destroy();
        res.status(200).json({ message: 'Tarefa deletada' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar tarefa', error: error.message });
    }
};
