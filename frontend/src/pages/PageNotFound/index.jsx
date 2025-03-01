import { Container, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/LogoFoxBlue.png";
import Header from "../../components/HeaderAfterLogin";
import Footer from "../../components/Footer";
import './styles.css';

const navLinks = [
  { label: "Início", href: "/" },
  // { label: "Sobre", href: "#about" },
  // { label: "Funcionalidades", href: "#features" },
];

// const user = { name: "João Silva" };

// Logout function placeholder
const handleLogout = () => {
  console.log("Usuário deslogado");
};

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="page-not-found-container">
      <Header navLinks={navLinks} onLogout={handleLogout} />

      {/* Main content container for the "Page Not Found" message */}
      <Container className="page-not-found">

        {/* Logo image with a set width and height */}
        <Image src={Logo} alt="Logo do Lobo" width={150} height={150} className="mb-4" />

        {/* Display the 404 error code */}
        <h1 className="display-1">404</h1>

        {/* Message for the user indicating that the page was not found */}
        <p className="lead">Ops! Página não encontrada.</p>

        {/* Button that redirects the user to the homepage */}
        <Button variant="primary" onClick={() => navigate("/")}>Voltar para Home</Button>
      </Container>
      <Footer />
    </div>
  );
}

export default PageNotFound;
