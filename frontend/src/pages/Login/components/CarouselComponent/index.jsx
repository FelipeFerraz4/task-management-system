import { Carousel } from "react-bootstrap";
import Image1 from '../../../../assets/office_room.png';
import Image2 from '../../../../assets/outside_room.png';
import Image3 from '../../../../assets/meet_room.png';
import "./styles.css";

function CarouselComponent () {
  return (
    // Carousel component with multiple items
    <Carousel className="custom-carousel">
      {/* First carousel item */}
      <Carousel.Item>
        <img className="d-block w-100" src={Image1} alt="Slide 1" />
        <Carousel.Caption>
          <h3>Gerencie tudo em um só lugar</h3>
          <p>Facilidade e praticidade na palma da sua mão.</p>
        </Carousel.Caption>
      </Carousel.Item>

      {/* Second carousel item */}
      <Carousel.Item>
        <img className="d-block w-100" src={Image2} alt="Slide 2" />
        <Carousel.Caption>
          <h3>Segurança em primeiro lugar</h3>
          <p>Protegemos seus dados com a melhor tecnologia.</p>
        </Carousel.Caption>
      </Carousel.Item>

      {/* Third carousel item */}
      <Carousel.Item>
        <img className="d-block w-100" src={Image3} alt="Slide 3" />
        <Carousel.Caption>
          <h3>Seu sucesso é nossa prioridade</h3>
          <p>A melhor experiência para você.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselComponent;
