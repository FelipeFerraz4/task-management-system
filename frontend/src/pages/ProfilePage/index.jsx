import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import "./styles.css";
import { useEffect, useState } from "react";
import getMe from "../../services/userService";

const userTest = { id: "1", name: "Julia", email: "julia@gmail.com", role: "employee" };

function ProfilePage() {
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

  const handleUpdateProfile = (formData) => {
    userTest.name = formData.name;
    userTest.email = formData.email;
    userTest.role = formData.role;
  }

  return (
    <div className="base_page">
      <Header user={{ name: user.name }} />
        <div className="page-content d-flex">
          <UserProfile user={userTest} handleUpdateProfile={handleUpdateProfile}/>
        </div>
        <Footer />
    </div>
  );

}

export default ProfilePage;
