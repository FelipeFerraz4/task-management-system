import Header from "../../components/HeaderAfterLogin";
import { useNavigate } from "react-router-dom";

const navLinks = [{ label: "Início", href: "/" }];

const user = { name: "João Silva" };

function HomeAfterLogin() {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    console.log("Usuário deslogado");
    navigate("/login");
  };

  return <Header navLinks={navLinks} user={user} onLogout={handleLogout} />;
}

export default HomeAfterLogin;
