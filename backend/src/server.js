import App from './App.js';

const app = new App();
const PORT = process.env.PORT || 2000;

app.app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
