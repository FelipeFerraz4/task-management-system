import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"; 
import "./styles.css";
import Image from "../../../../assets/office_room.png";

const features = [
    { "title": "Equipe & Colaboradores", "subtitle": "Controle funcionários e permissões", "link": "/employee-management" },
    { "title": "Tarefas e Designações", "subtitle": "Gerencie e atribua tarefas para funcionários.", "link": "/pagina2" },
    { "title": "Acompanhamento de Tarefas", "subtitle": "Consulte o histórico de tarefas", "link": "/pagina3" },
    { "title": "Análise e Relatórios", "subtitle": "Gere relatórios e Obtenha insights valiosos", "link": "/pagina4" },
];

function PageData() {
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center">
        <h2>Funcionalidades do Sistema</h2>
      </div>
      <Row className="justify-content-center g-1">
        {features.map((feature, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} className="d-flex mb-4 justify-content-center">
            <Link to={feature.link} style={{ textDecoration: 'none' }}>
              <Card className="custom-card">
                <Card.Img variant="top" src={Image} className="card-image" />
                <Card.Body>
                  <Card.Title>{feature.title}</Card.Title>
                  <Card.Text>{feature.subtitle}</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default PageData;
