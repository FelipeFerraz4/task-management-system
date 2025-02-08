import CarouselSection from "./components/CarouselSection";
import Header from "../../components/HeaderAfterLogin";
import Footer from "../../components/Footer";
import About from "./components/About";
import Features from "./components/Features";

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

function Home() {
  return (
    <>
        <Header navLinks={navLinks} onLogout={handleLogout} />
        <CarouselSection />
        <About />
        <Features />
        <Footer />
    </>
  );
}

export default Home;