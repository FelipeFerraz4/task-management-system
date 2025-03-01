import { Container, Row, Col } from "react-bootstrap";
import BarChart from "../BarChart";
import LineChart from "../LineChart";
import PieChart from "../PieChart";
import TaskTable from "../TaskTable";
import KPIStats from "../KPIStats";

// Dashboard Component - Displays key performance metrics, charts, and task reports
const Dashboard = () => {
  return (
    <Container className="mt-4">

      {/* KPI Statistics Section */}
      <KPIStats />

      {/* First Row: Bar Chart and Line Chart */}
      <Row className="mt-4">
        <Col md={6}>
          <BarChart />
        </Col>
        <Col md={6}>
          <LineChart />
        </Col>
      </Row>

      {/* Second Row: Pie Chart and Task Table */}
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
