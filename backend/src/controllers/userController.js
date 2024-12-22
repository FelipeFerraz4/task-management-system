export const getUserProfile = (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: 'Perfil do usuário', user: { id } });
};
  
export const registerUser = (req, res) => {
    const { name, email, password } = req.body;
    res.status(201).json({ message: 'Usuário registrado', user: { name, email } });
};
  
export const loginUser = (req, res) => {
    const { email, password } = req.body;
    res.status(200).json({ message: 'Login bem-sucedido', token: 'exemplo-de-token' });
};