import { initializeDatabase } from './config/database.js'; // Função para inicializar o banco
import App from './App.js'; // Import the App class

const app = new App().app;

const startServer = async () => {
  try {
    // Inicializa o banco de dados antes de iniciar o servidor
    await initializeDatabase();

    const PORT = process.env.PORT || 2000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
};

startServer();
