import { Table, Card } from "react-bootstrap";

function TaskTable() {

  // Mocked task data representing employees, number of tasks, and their status
  const tasks = [
    { funcionario: "João", tarefas: 10, status: "✅" },
    { funcionario: "Maria", tarefas: 8, status: "⚠️" },
    { funcionario: "Carlos", tarefas: 12, status: "✅" },
  ];

  return (
    // Bootstrap Card component to encapsulate the task report
    <Card>
      <Card.Body>

        {/* Card title */}
        <Card.Title>Relatório de Tarefas</Card.Title>

        {/* Bootstrap Table with striped rows, borders, and hover effects */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Funcionário</th>
              <th>Tarefas</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            
            {/* Mapping through the tasks array to dynamically render table rows */}
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
