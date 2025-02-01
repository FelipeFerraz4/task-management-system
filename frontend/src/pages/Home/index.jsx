import CarouselSection from "./components/CarouselSection";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import About from "./components/About";
import Features from "./components/Features";

function Home() {
  return (
    <>
        <Header />
        <CarouselSection />
        <About />
        <Features />
        <Footer />
    </>
  );
}

export default Home;