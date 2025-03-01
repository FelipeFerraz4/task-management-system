import { Card, Row, Col } from "react-bootstrap";

const KPIStats = () => {
  const stats = [
    { title: "Total de Funcionários", value: "120", color: "#007bff" },
    { title: "Tarefas Pendentes", value: "15", color: "#ffc107" },
    { title: "Tarefas Concluídas", value: "285", color: "#28a745" },
  ];

  return (
    <Row>
      {stats.map((stat, index) => (
        <Col md={4} key={index}>
          <Card style={{ borderLeft: `5px solid ${stat.color}` }}>
            <Card.Body className="text-center">
              <Card.Title>{stat.title}</Card.Title>
              <Card.Text style={{ fontSize: "24px", color: stat.color }}>{stat.value}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default KPIStats;
