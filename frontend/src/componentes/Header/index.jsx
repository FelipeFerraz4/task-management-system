// src/components/Header.js
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../../assets/LogoFoxBlue.png"; // Substitua pelo caminho correto da sua logo
import "./styles.css"; // Importa o arquivo de estilos

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/" className="fw-bold d-flex align-items-center">
          <img src={logo} alt="TaskFlow Logo" className="header-logo" />
          WorkHub
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#features">Sobre</Nav.Link>
            <Nav.Link href="#features">Funcionalidades</Nav.Link>
            <Nav.Link href="#contact">Contato</Nav.Link>
          </Nav>
          <a href="/login" className="header-login-btn">
            Login
          </a>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
