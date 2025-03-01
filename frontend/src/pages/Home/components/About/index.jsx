import { Container, Row, Col, Card } from "react-bootstrap";
import { CheckCircle, BarChart, Users } from "react-feather";
import "./styles.css";

function About () {
  return (
    <section id="about" className="my-5">
      <Container>
        {/* Title and Description Section */}
        <Row className="mb-4">
          <Col md={12} className="text-center">
            <h2 className="fw-bold">Sobre o Sistema</h2>
            <p className="lead text-muted">
              Um sistema inovador para otimizar a gestão de tarefas e aumentar a produtividade da sua equipe.
            </p>
          </Col>
        </Row>

        {/* Objective Section */}
        <Row className="justify-content-center">
          <Col md={10}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <h4 className="fw-bold">Nosso Objetivo</h4>
                <p className="text-muted">
                  Criamos este sistema para oferecer uma maneira intuitiva e eficiente de gerenciar tarefas, 
                  garantindo melhor controle, colaboração e organização das equipes.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Benefits Section */}
        <Row className="mt-4">
          {/* First Benefit */}
          <Col md={4}>
            <Card className="text-center shadow-sm border-0">
              <Card.Body>
                <CheckCircle size={40} className="text-primary mb-3" />
                <h5 className="fw-bold">Gestão Simplificada</h5>
                <p className="text-muted">Organize, acompanhe e otimize tarefas de forma eficiente.</p>
              </Card.Body>
            </Card>
          </Col>

          {/* Second Benefit */}
          <Col md={4}>
            <Card className="text-center shadow-sm border-0">
              <Card.Body>
                <BarChart size={40} className="text-success mb-3" />
                <h5 className="fw-bold">Relatórios Inteligentes</h5>
                <p className="text-muted">Tenha insights detalhados sobre o desempenho da equipe.</p>
              </Card.Body>
            </Card>
          </Col>

          {/* Third Benefit */}
          <Col md={4}>
            <Card className="text-center shadow-sm border-0">
              <Card.Body>
                <Users size={40} className="text-warning mb-3" />
                <h5 className="fw-bold">Colaboração Eficiente</h5>
                <p className="text-muted">Facilite a comunicação e o trabalho em equipe.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
