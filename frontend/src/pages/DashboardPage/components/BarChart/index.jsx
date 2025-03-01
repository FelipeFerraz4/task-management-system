import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card } from "react-bootstrap";

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart() {

  // Data for the bar chart
  const data = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio"],
    datasets: [
      {
        label: "Tarefas Concluídas",
        backgroundColor: "rgba(75,192,192,0.6)",
        data: [35, 50, 40, 60, 75],
      },
    ],
  };

  return (
    <Card>
      <Card.Body>

        {/* Chart title */}
        <Card.Title>Desempenho Mensal</Card.Title>

        {/* Render Bar chart using the defined data */}
        <Bar data={data} />
      </Card.Body>
    </Card>
  );
};

export default BarChart;
