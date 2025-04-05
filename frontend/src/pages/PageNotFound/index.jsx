import { Container, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/LogoFoxBlue.png";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import './styles.css';
import { useEffect, useState } from "react";
import getMe from "../../services/userService";

function PageNotFound() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const res = await getMe();
          setUser(res.data.user); // depende de como está estruturado o JSON
        } catch (err) {
          console.error("Erro ao buscar usuário:", err);
          navigate("/login"); // redireciona se não estiver autenticado
        }
      };
  
      fetchUser();
    }, [navigate]);
  
    if (!user) return <div>Carregando...</div>;

  return (
    <div className="page-not-found-container">
      <Header user={{ name: user.name }} />

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
