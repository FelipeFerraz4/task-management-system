import CarouselSection from "./components/CarouselSection";
import Header from "../../components/Header";
import About from "./components/About";
import Features from "./components/Features";
import Footer from "../../components/Footer";

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