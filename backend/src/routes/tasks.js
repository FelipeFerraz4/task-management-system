import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Lista de todas as tarefas' });
});

router.post('/', (req, res) => {
    const { title, description } = req.body;
    res.json({ message: 'Tarefa criada com sucesso', task: { title, description } });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    res.json({ message: `Tarefa com ID ${id} atualizada com sucesso`, task: { title, description } });
});
  
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Tarefa com ID ${id} deletada com sucesso` });
});

export default router;