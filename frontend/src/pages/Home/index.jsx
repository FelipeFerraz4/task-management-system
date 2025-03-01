import CarouselSection from "./components/CarouselSection";
import Header from "../../components/HeaderAfterLogin";
import Footer from "../../components/Footer";
import About from "./components/About";
import Features from "./components/Features";
import "./styles.css";

const navLinks = [
  { label: "Início", href: "/" },
  // { label: "Sobre", href: "#about" },
  // { label: "Funcionalidades", href: "#features" },
];

const handleLogout = () => {
  console.log("Usuário deslogado");
};

function Home() {
  return (
    <>
      <Header className="fixed-top" navLinks={navLinks} onLogout={handleLogout} />

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
