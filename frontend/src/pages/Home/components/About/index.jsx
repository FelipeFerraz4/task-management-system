import { Container, Row, Col, Card } from "react-bootstrap";
import "./styles.css"; // Importando o arquivo de estilos

const About = () => {
  return (
    <section id="about" className="my-5">
      <Container>
        <Row>
          <Col md={12} className="text-center">
            <h2>Sobre o Sistema</h2>
            <p className="lead">
              O sistema foi desenvolvido para ajudar empresas a gerenciar suas
              tarefas de maneira simples e eficiente.
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Card className="shadow-sm">
              <Card.Body>
                <h4>Objetivo Principal</h4>
                <p>
                  Nosso objetivo é fornecer uma plataforma simples e eficaz
                  para monitorar tarefas, garantindo o controle completo e a
                  organização de equipes.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
