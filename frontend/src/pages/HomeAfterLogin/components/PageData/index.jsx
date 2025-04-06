import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"; 
import "./styles.css";
import Image from "../../../../assets/office_room.png";
import getFeatures from "../../../../utils/features";
import PropTypes from "prop-types";

// Define an array of features, each containing a title, subtitle, and link to the respective page
function PageData({ user }) {
  const features = getFeatures(user.role);
  return (
    <div className="container mt-4">
      {/* Centered title */}
      <div className="d-flex justify-content-center">
        <h2>Funcionalidades do Sistema</h2>
      </div>

      <Row className="justify-content-center g-1">

        {/* Iterate over the features array to create a card for each feature */}
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

PageData.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }),
};

export default PageData;
