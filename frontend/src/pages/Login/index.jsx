import Header from "../../components/HeaderAfterLogin";
import Footer from "../../components/Footer";
import LoginData from "./components/LoginData";
import "./styles.css";

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "#about" },
  { label: "Funcionalidades", href: "#features" },
];

const handleLogout = () => {
  console.log("Usuário deslogado");
  // Adicione a lógica de logout aqui
};

function Login() {
    return (
        <div className="login-page">
            <Header navLinks={navLinks} onLogout={handleLogout} />
            <div className="login-content">
                <LoginData />
            </div>
            <Footer />
        </div>
    );
}

export default Login;
