export const getAllTasks = (req, res) => {
    res.status(200).json({ message: 'Todas as tarefas' });
};

export const createTask = (req, res) => {
    const { title, description } = req.body;
    res.status(201).json({ message: 'Tarefa criada', task: { title, description } });
};
  
export const updateTask = (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Tarefa ${id} atualizada` });
};
  
export const deleteTask = (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Tarefa ${id} deletada` });
};
  