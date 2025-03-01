import { useState, useEffect } from "react";
import { Carousel, Container } from "react-bootstrap";
import MeetRoom from '../../../../assets/meet_room.png';
import OfficeRoom from '../../../../assets/office_room.png';
import OutsideRoom from '../../../../assets/outside_room.png';
import "./styles.css";

function CarouselSection () {
  const [headerHeight, setHeaderHeight] = useState(70);

  // Calculates the height of the header dynamically on component mount
  useEffect(() => {
    const header = document.querySelector(".navbar");
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }
  }, []);

  return (
    <Container id="start" fluid className="p-0">
      {/* Carousel component with multiple items */}
      <Carousel>
        {/* First Carousel Item */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={MeetRoom}
            alt="Meet Room"
            style={{ height: `calc(100vh - ${headerHeight}px)` }}
          />
          <Carousel.Caption>
            <h3>Bem-vindo ao WorkHub!</h3>
            <p>Aqui você pode gerenciar suas tarefas de forma simples e eficaz.</p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Second Carousel Item */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={OfficeRoom}
            alt="Office Room"
            style={{ height: `calc(100vh - ${headerHeight}px)` }}
          />
          <Carousel.Caption>
            <h3>Visualize o progresso da equipe</h3>
            <p>Monitore as tarefas com um dashboard dinâmico e intuitivo.</p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Third Carousel Item */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={OutsideRoom}
            alt="Outside Room"
            style={{ height: `calc(100vh - ${headerHeight}px)` }}
          />
          <Carousel.Caption>
            <h3>Histórico de Tarefas</h3>
            <p>Mantenha um histórico completo das tarefas concluídas pela sua equipe.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default CarouselSection;
