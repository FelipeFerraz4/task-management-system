import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LoginData from "./components/LoginData";
import "./styles.css";

function Login() {
    return (
        <div className="login-page">
            <Header />
            <div className="login-content">
                <LoginData />
            </div>
            <Footer />
        </div>
    );
}

export default Login;
