import { Container, Row, Col } from "react-bootstrap";
import BarChart from "../BarChart";
import LineChart from "../LineChart";
import PieChart from "../PieChart";
import TaskTable from "../TaskTable";
import KPIStats from "../KPIStats";

const Dashboard = () => {
  return (
    <Container className="mt-4">
      <KPIStats />

      <Row className="mt-4">
        <Col md={6}>
          <BarChart />
        </Col>
        <Col md={6}>
          <LineChart />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6}>
          <PieChart />
        </Col>
        <Col md={6}>
          <TaskTable />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
