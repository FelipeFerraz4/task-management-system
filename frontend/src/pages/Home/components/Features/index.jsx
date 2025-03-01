import { Container, Row, Col, Card } from "react-bootstrap";
import { BarChart, CheckCircle, Clock, FileText, Users, Shield } from "react-feather"; // Ícones modernos
import "./styles.css";

const Features = () => {
  return (
    <section id="features" className="bg-light py-5">
      <Container>
        {/* Título e Descrição */}
        <Row className="mb-4 text-center">
          <Col md={12}>
            <h2 className="fw-bold">Funcionalidades do Sistema</h2>
            <p className="lead text-muted">
              Descubra as principais funcionalidades que tornam nosso sistema eficiente e intuitivo.
            </p>
          </Col>
        </Row>

        {/* Cards com funcionalidades */}
        <Row>
          <Col md={4}>
            <Card className="text-center shadow-sm border-0">
              <Card.Body>
                <BarChart size={40} className="text-primary mb-3" />
                <h5 className="fw-bold">Dashboard Dinâmico</h5>
                <p className="text-muted">Visualize métricas e tarefas em um painel interativo e intuitivo.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow-sm border-0">
              <Card.Body>
                <CheckCircle size={40} className="text-success mb-3" />
                <h5 className="fw-bold">Monitoramento de Tarefas</h5>
                <p className="text-muted">Acompanhe o progresso de cada tarefa e visualize status em tempo real.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow-sm border-0">
              <Card.Body>
                <FileText size={40} className="text-warning mb-3" />
                <h5 className="fw-bold">Histórico Completo</h5>
                <p className="text-muted">Mantenha um registro detalhado de todas as tarefas concluídas pela equipe.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={4}>
            <Card className="text-center shadow-sm border-0">
              <Card.Body>
                <Users size={40} className="text-info mb-3" />
                <h5 className="fw-bold">Gerenciamento de Equipes</h5>
                <p className="text-muted">Crie equipes, atribua tarefas e facilite a colaboração entre membros.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow-sm border-0">
              <Card.Body>
                <Clock size={40} className="text-danger mb-3" />
                <h5 className="fw-bold">Notificações e Prazos</h5>
                <p className="text-muted">Receba alertas sobre prazos e mantenha as entregas dentro do cronograma.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow-sm border-0">
              <Card.Body>
                <Shield size={40} className="text-secondary mb-3" />
                <h5 className="fw-bold">Segurança e Controle de Acesso</h5>
                <p className="text-muted">Defina permissões e proteja dados sensíveis com autenticação segura.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Features;
