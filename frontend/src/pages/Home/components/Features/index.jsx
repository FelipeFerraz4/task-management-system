import { Container, Row, Col, ListGroup } from "react-bootstrap";
import "./styles.css"; // Importando o arquivo de estilos

const Features = () => {
  return (
    <section id="features" className="bg-light py-5">
      <Container>
        <Row className="text-center">
          <Col md={12}>
            <h2>Funcionalidades do Sistema</h2>
            <p className="lead">Abaixo estão as principais funcionalidades do sistema:</p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Dashboard Dinâmico:</strong> Visualize suas tarefas em um
                painel interativo e intuitivo.
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Monitoramento de Tarefas:</strong> Acompanhe o progresso de
                cada tarefa com facilidade.
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Histórico Completo:</strong> Mantenha um registro detalhado de
                todas as tarefas concluídas pela sua equipe.
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Features;
