import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/LogoFoxBlue.png";
import MenuIcon from "../../assets/menu.png";
import RightArrow from "../../assets/right_arrow.png";
import "./styles.css"; // Importa o arquivo de estilos

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768); // Verifica se está em desktop

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  // Detecta mudanças no tamanho da tela e fecha o menu se necessário
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && menuOpen) {
        setMenuOpen(false); // Fecha o menu automaticamente se a tela for redimensionada para desktop
      }
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);

    // Limpeza ao desmontar o componente
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  return (
    <>
      <Navbar
        bg="light"
        expand="md"
        className="shadow-md"
        expanded={menuOpen} // Controla o estado do menu
      >
        <Container>
          <Navbar.Brand href="/" className="fw-bold d-flex align-items-center">
            <img src={logo} alt="WorkHub Logo" className="header-logo" />
            WorkHub
          </Navbar.Brand>

          {/* Botão de menu para telas pequenas */}
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={toggleMenu} // Abre/fecha o menu ao clicar
          >
            <img
              src={MenuIcon}
              alt="Menu Icon"
              className="custom-menu-icon"
            />
          </Navbar.Toggle>

          {/* Menu na tela maior */}
          <Navbar.Collapse id="basic-navbar-nav" className="navbar-collapse">
            <Nav className="ms-auto">
              <Nav.Link href="#start">
                Início
              </Nav.Link>
              <Nav.Link href="#about">
                Sobre
              </Nav.Link>
              <Nav.Link href="#features">
                Funcionalidades
              </Nav.Link>
            </Nav>
            <Link to="/login" className="header-login-btn" onClick={closeMenu}>
              Login
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Offcanvas para telas pequenas */}
      <Offcanvas
        show={menuOpen}
        onHide={closeMenu}
        placement="end" // Lado direito da tela
        className="offcanvas"
      >
        <Offcanvas.Header>
          <Offcanvas.Title className="offcanvas-title">Menu</Offcanvas.Title>
          <button className="close-menu-btn" onClick={closeMenu}>
            <img src={RightArrow} alt="Fechar Menu" width={24} height={24} />
          </button>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link href="#start">
              Início
            </Nav.Link>
            <Nav.Link href="#about">
              Sobre
            </Nav.Link>
            <Nav.Link href="#features">
              Funcionalidades
            </Nav.Link>
            <Link to="/login" className="header-login-btn" onClick={closeMenu}>
              Login
            </Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Header;
