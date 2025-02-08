import { Card, Row, Col } from "react-bootstrap";
import "./styles.css";
import Image from "../../../../assets/office_room.png";

function PageData() {
  return (
    <div className="container mt-4">
      <Row className="justify-content-center">
        {[1, 2, 3, 4].map((index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} className="d-flex mb-4 justify-content-center">
            <Card className="custom-card">
              <Card.Img variant="top" src={Image} className="card-image" />
              <Card.Body>
                <Card.Title>Título {index}</Card.Title>
                <Card.Text>
                  Texto descritivo sobre o card {index}.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default PageData;
