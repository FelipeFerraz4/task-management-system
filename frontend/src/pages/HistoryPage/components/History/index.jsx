import { useState } from "react";
import "./styles.css";

const tasks = [
  { id: 1, title: "Revisar código", status: "Concluído", description: "Revisão do código para refatoração." },
  { id: 2, title: "Criar testes unitários", status: "Pendente", description: "Criar testes para garantir cobertura do código." },
  { id: 3, title: "Atualizar documentação", status: "Em andamento", description: "Documentação do novo módulo." },
  { id: 3, title: "Atualizar documentação da calang.io", status: "Em andamento", description: "Documentação do novo módulo." },
];

const History = () => {
  const [filterTitle, setFilterTitle] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  const filteredTasks = tasks.filter((task) => 
    task.title.toLowerCase().includes(filterTitle.toLowerCase()) &&
    (filterStatus ? task.status === filterStatus : true)
  );

  return (
    <div className="history-container">
      <h2>Histórico de Tarefas</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Filtrar por título..."
          value={filterTitle}
          onChange={(e) => setFilterTitle(e.target.value)}
        />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">Todos</option>
          <option value="Concluído">Concluído</option>
          <option value="Pendente">Pendente</option>
          <option value="Em andamento">Em andamento</option>
        </select>
      </div>

      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id} onClick={() => setSelectedTask(task)}>
            {task.title} - <span className={`status ${task.status.replace(" ", "-").toLowerCase()}`}>{task.status}</span>
          </li>
        ))}
      </ul>

      {selectedTask && (
        <div className="modal">
          <div className="modal-content">
            <h3>{selectedTask.title}</h3>
            <p><strong>Status:</strong> {selectedTask.status}</p>
            <p>{selectedTask.description}</p>
            <button onClick={() => setSelectedTask(null)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
