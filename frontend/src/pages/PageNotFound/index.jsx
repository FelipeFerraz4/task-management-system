import { Container, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/LogoFoxBlue.png";
import Header from "../../components/HeaderAfterLogin";
import Footer from "../../components/Footer";
import './styles.css';

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "#about" },
  { label: "Funcionalidades", href: "#features" },
];

const user = { name: "João Silva" };

const handleLogout = () => {
  console.log("Usuário deslogado");
  // Adicione a lógica de logout aqui
};

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="page-not-found-container">
      <Header navLinks={navLinks} user={user} onLogout={handleLogout} />
      <Container className="page-not-found">
        <Image src={Logo} alt="Logo do Lobo" width={150} height={150} className="mb-4" />
        <h1 className="display-1">404</h1>
        <p className="lead">Ops! Página não encontrada.</p>
        <Button variant="primary" onClick={() => navigate("/")}>Voltar para Home</Button>
      </Container>
      <Footer />
    </div>
  );
}

export default PageNotFound;
