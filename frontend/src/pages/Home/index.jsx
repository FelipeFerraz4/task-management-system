import CarouselSection from "./components/CarouselSection";
import Header from "../../components/HeaderAfterLogin";
import Footer from "../../components/Footer";
import About from "./components/About";
import Features from "./components/Features";
import "./styles.css"; // Importando os estilos

const navLinks = [
  { label: "Início", href: "#start" },
  { label: "Sobre", href: "#about" },
  { label: "Funcionalidades", href: "#features" },
];

const handleLogout = () => {
  console.log("Usuário deslogado");
  // Adicione a lógica de logout aqui
};

function Home() {
  return (
    <>
      {/* Header fixo no topo */}
      <Header className="fixed-top" navLinks={navLinks} onLogout={handleLogout} />

      {/* Adicionando padding-top para evitar sobreposição */}
      <div className="content">
        <CarouselSection />
        <About />
        <Features />
      </div>

      <Footer />
    </>
  );
}

export default Home;
