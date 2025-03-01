import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { Card } from "react-bootstrap";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
  const data = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai"],
    datasets: [
      {
        label: "Produtividade Média",
        borderColor: "#ff6384",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        data: [80, 85, 78, 90, 95],
      },
    ],
  };

  const options = {
    scales: {
      y: {
        suggestedMin: 70,
        suggestedMax: 100, 
      },
    },
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Produtividade dos Funcionários</Card.Title>
        <Line data={data} options={options} />
      </Card.Body>
    </Card>
  );
};

export default LineChart;
