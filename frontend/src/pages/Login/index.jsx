import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LoginData from "./components/LoginData";
import "./styles.css";

const navLinks = [
  { label: "Início", href: "/" },
];

const handleLogout = () => {
  console.log("Usuário deslogado");
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
