import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { Card } from "react-bootstrap";

// Register required Chart.js elements for line charts
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function LineChart() {

  // Data for the Line chart
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

  // Chart options for better visualization
  const options = {
    scales: {
      y: {
        suggestedMin: 70,
        suggestedMax: 100, 
      },
    },
  };

  return (

    // Bootstrap Card component for layout
    <Card>
      <Card.Body>

        {/* Title for the card */}
        <Card.Title>Produtividade dos Funcionários</Card.Title>

        {/* Render the Line chart with the defined data and options */}
        <Line data={data} options={options} />
      </Card.Body>
    </Card>
  );
};

export default LineChart;
