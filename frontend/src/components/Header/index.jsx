import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Offcanvas, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../assets/LogoFoxBlue.png";
import MenuIcon from "../../assets/menu.png";
import PropTypes from "prop-types";
import RightArrow from "../../assets/right_arrow.png";
import "./styles.css";

function Header ({ user }) {

   let navLinks = user ? [{ label: "Home", href: "/home" }] : [
        { label: "Início", href: "/#start" },
        { label: "Sobre", href: "/#about" },
        { label: "Funcionalidades", href: "/#features" },
      ];

  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    // console.log("Usuário deslogado");
    navigate("/login");
  };
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
  }, [menuOpen, isDesktop]);

  return (
    <div className="custom-header">
      <Navbar bg="light" expand="md" className="shadow-md" expanded={menuOpen}>
        <Container>
          {/* Logo and Brand Name */}
          <Navbar.Brand href={navLinks[0].href} className="fw-bold d-flex align-items-center">
            <img src={logo} alt="WorkHub Logo" className="header-logo" />
            WorkHub
          </Navbar.Brand>

          {/* Menu Toggle Button for Small Screens */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleMenu}>
            <img src={MenuIcon} alt="Menu Icon" className="custom-menu-icon" />
          </Navbar.Toggle>

          {/* Main Navigation Links */}
          <Navbar.Collapse id="basic-navbar-nav" className="navbar-collapse navbar_link">
            <Nav className="ms-auto">
              {navLinks.map((link, index) => 
              link.href.includes("#") ? (
                <Nav.Link key={index} href={link.href} className="link">
                  {link.label}
                </Nav.Link>
              ) : (
                <Nav.Link key={index} as={Link} to={link.href} className="link">
                  {link.label}
                </Nav.Link>
              )
            )}
            </Nav>

            {/* User Authentication Options */}
            {user ? (
              <Dropdown>
                <Dropdown.Toggle variant="light" className="header-user-dropdown">
                  {user.name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">Perfil</Dropdown.Item>
                  {/* <Dropdown.Item as={Link} to="/settings">Configurações</Dropdown.Item> */}
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>Sair</Dropdown.Item>
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
      
      {/* Offcanvas Menu for Small Screens */}
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

            {/* User Authentication in Offcanvas Menu */}
            {user ? (
              <Dropdown>
                <Dropdown.Toggle variant="light" className="header-user-dropdown">
                  {user.name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">Perfil</Dropdown.Item>
                  {/* <Dropdown.Item as={Link} to="/settings">Configurações</Dropdown.Item> */}
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>Sair</Dropdown.Item>
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
    </div>
  );
};

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};

export default Header;
