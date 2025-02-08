import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"; // Importando o Link do React Router
import "./styles.css";
import Image from "../../../../assets/office_room.png";

const features = [
    { "title": "Equipe & Colaboradores", "subtitle": "Controle funcionários e permissões", "link": "/employee-management" },
    { "title": "Título 2", "subtitle": "Texto descritivo sobre o card 2.", "link": "/pagina2" },
    { "title": "Título 3", "subtitle": "Texto descritivo sobre o card 3.", "link": "/pagina3" },
    { "title": "Título 4", "subtitle": "Texto descritivo sobre o card 4.", "link": "/pagina4" },
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
