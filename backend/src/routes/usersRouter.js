import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Lista de todos os usuários' });
});
  
router.post('/', (req, res) => {
    const { name, email, role } = req.body;
    res.json({ message: 'Usuário criado com sucesso', user: { name, email, role } });
});
  
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Detalhes do usuário com ID ${id}` });
});
  
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;
    res.json({ message: `Usuário com ID ${id} atualizado com sucesso`, user: { name, email, role } });
});
  
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Usuário com ID ${id} deletado com sucesso` });
});
  
export default router;