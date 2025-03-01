import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card } from "react-bootstrap";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
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
        <Card.Title>Desempenho Mensal</Card.Title>
        <Bar data={data} />
      </Card.Body>
    </Card>
  );
};

export default BarChart;
