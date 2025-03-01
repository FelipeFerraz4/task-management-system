import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Card } from "react-bootstrap";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
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
    <Card>
      <Card.Body>
        <Card.Title>Status das Tarefas</Card.Title>
        <Pie data={data} />
      </Card.Body>
    </Card>
  );
};

export default PieChart;
