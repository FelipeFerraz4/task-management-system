import { Table, Card } from "react-bootstrap";

const TaskTable = () => {
  const tasks = [
    { funcionario: "João", tarefas: 10, status: "✅" },
    { funcionario: "Maria", tarefas: 8, status: "⚠️" },
    { funcionario: "Carlos", tarefas: 12, status: "✅" },
  ];

  return (
    <Card>
      <Card.Body>
        <Card.Title>Relatório de Tarefas</Card.Title>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Funcionário</th>
              <th>Tarefas</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{task.funcionario}</td>
                <td>{task.tarefas}</td>
                <td>{task.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default TaskTable;
