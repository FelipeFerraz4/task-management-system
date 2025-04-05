import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import History from "./components/History";
import { useEffect, useState } from "react";
import getMe from "../../services/userService";

function EmployeeManagement() {
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
    <div className="base_page">
      <Header user={{ name: user.name }} />
        <div className="page-content d-flex">
          <History />
        </div>
        <Footer />
    </div>
  );

}

export default EmployeeManagement;
