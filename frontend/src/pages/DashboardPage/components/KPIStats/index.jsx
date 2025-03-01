import { Card, Row, Col } from "react-bootstrap";

function KPIStats() {
  
  // Array containing KPI statistics
  const stats = [
    { title: "Total de Funcionários", value: "120", color: "#007bff" },
    { title: "Tarefas Pendentes", value: "15", color: "#ffc107" },
    { title: "Tarefas Concluídas", value: "285", color: "#28a745" },
  ];

  return (
    <Row>

      {/* Iterate over stats array to create KPI cards */}
      {stats.map((stat, index) => (
        <Col md={4} key={index}>

          {/* Card component with a left border color based on stat.color */}
          <Card style={{ borderLeft: `5px solid ${stat.color}` }}>
            <Card.Body className="text-center">

              {/* KPI Title */}
              <Card.Title>{stat.title}</Card.Title>

              {/* KPI Value with a larger font size and matching color */}
              <Card.Text style={{ fontSize: "24px", color: stat.color }}>{stat.value}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default KPIStats;
