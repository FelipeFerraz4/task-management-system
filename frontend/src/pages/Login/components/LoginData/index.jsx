import { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CarouselComponent from '../CarouselComponent';
import login from '../../../../services/authService';
import './styles.css';

function LoginData() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = await login(email, password);
      console.log('Login bem-sucedido:', data);
      
      // Redireciona após login bem-sucedido
      navigate('/home');
    } catch (err) {
      console.error('Erro ao fazer login:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Erro ao fazer login');
    }
  };

  return (
    <Container fluid className="login-container">
      <Row className="login-content">
        <Col md={6} className="carousel-container">
          <CarouselComponent />
        </Col>

        <Col md={6} className="login-form-container">
          <div className="login-box">
            <h2>Bem-vindo de volta!</h2>
            <p>Faça login para acessar sua conta.</p>
            {error && <p className="text-danger">{error}</p>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="login-btn">
                Entrar
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginData;
