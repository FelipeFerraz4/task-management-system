import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CarouselComponent from "../CarouselComponent";
import "./styles.css";

function LoginData() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", email, password);
    navigate("/home");
  };

  return (
    <Container fluid className="login-container">
      <Row className="login-content">
        {/* Carrossel (Esquerda no Desktop, Fundo no Mobile) */}
        <Col md={6} className="carousel-container">
          <CarouselComponent />
        </Col>

        {/* Formulário de Login */}
        <Col md={6} className="login-form-container">
          <div className="login-box">
            <h2>Bem-vindo de volta!</h2>
            <p>Faça login para acessar sua conta.</p>
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
