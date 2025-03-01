import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Card } from "react-bootstrap";

// Register required Chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart() {

  // Data for the Pie chart
  const data = {
    labels: ["Concluídas", "Pendentes", "Atrasadas"],
    datasets: [
      {
        label: "Distribuição de Tarefas",
        backgroundColor: ["#36a2eb", "#ffce56", "#ff6384"],
        data: [60, 25, 15],
      },
    ],
  };

  return (

    // Bootstrap Card component for layout
    <Card>
      <Card.Body>

        {/* Title for the card */}
        <Card.Title>Status das Tarefas</Card.Title>

        {/* Render the Pie chart with the defined data */}
        <Pie data={data} />
      </Card.Body>
    </Card>
  );
};

export default PieChart;
