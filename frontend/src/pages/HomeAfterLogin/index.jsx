import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/HeaderAfterLogin";
import Footer from "../../components/Footer";
import PageData from "./components/PageData";
import getMe from "../../services/userService";
import "./styles.css";

const navLinks = [{ label: "Home", href: "/home" }];

function HomeAfterLogin() {
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

  const handleLogout = (e) => {
    e.preventDefault();
    console.log("Usuário deslogado");
    navigate("/login");
  };

  // Evita renderizar enquanto o usuário não foi carregado
  if (!user) return <div>Carregando...</div>;

  return (
    <div className="base_page">
      <Header navLinks={navLinks} user={user} onLogout={handleLogout} />
      <div className="page-content d-flex">
        <PageData />
      </div>
      <Footer />
    </div>
  );
}

export default HomeAfterLogin;
