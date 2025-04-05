import CarouselSection from "./components/CarouselSection";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import About from "./components/About";
import Features from "./components/Features";
import "./styles.css";

function Home() {
  return (
    <>
      <Header className="fixed-top" />

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
