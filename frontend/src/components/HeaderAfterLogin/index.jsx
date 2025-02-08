import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Offcanvas, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/LogoFoxBlue.png";
import MenuIcon from "../../assets/menu.png";
import RightArrow from "../../assets/right_arrow.png";
import "./styles.css"; // Importa o arquivo de estilos

const Header = ({ navLinks, user, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && menuOpen) {
        setMenuOpen(false);
      }
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  return (
    <>
      <Navbar bg="light" expand="md" className="shadow-md" expanded={menuOpen}>
        <Container>
          <Navbar.Brand href="/" className="fw-bold d-flex align-items-center">
            <img src={logo} alt="WorkHub Logo" className="header-logo" />
            WorkHub
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleMenu}>
            <img src={MenuIcon} alt="Menu Icon" className="custom-menu-icon" />
          </Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav" className="navbar-collapse">
            <Nav className="ms-auto">
              {navLinks.map((link, index) => (
                <Nav.Link key={index} href={link.href}>
                  {link.label}
                </Nav.Link>
              ))}
            </Nav>

            {user ? (
              <Dropdown>
                <Dropdown.Toggle variant="light" className="header-user-dropdown">
                  {user.name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">Perfil</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/settings">Configurações</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={onLogout}>Sair</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Link to="/login" className="header-login-btn" onClick={closeMenu}>
                Login
              </Link>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas show={menuOpen} onHide={closeMenu} placement="end" className="offcanvas">
        <Offcanvas.Header>
          <Offcanvas.Title className="offcanvas-title">Menu</Offcanvas.Title>
          <button className="close-menu-btn" onClick={closeMenu}>
            <img src={RightArrow} alt="Fechar Menu" width={24} height={24} />
          </button>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {navLinks.map((link, index) => (
              <Nav.Link key={index} href={link.href} onClick={closeMenu}>
                {link.label}
              </Nav.Link>
            ))}

            {user ? (
              <Dropdown>
                <Dropdown.Toggle variant="light" className="header-user-dropdown">
                  {user.name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">Perfil</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/settings">Configurações</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={onLogout}>Sair</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Link to="/login" className="header-login-btn" onClick={closeMenu}>
                Login
              </Link>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Header;
