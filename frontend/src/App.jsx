import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* <h1>Bem-vindo ao Sistema</h1> */}
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
