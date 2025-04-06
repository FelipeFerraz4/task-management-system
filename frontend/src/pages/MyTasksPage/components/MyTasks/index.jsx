import { useState } from "react";
import "./styles.css";

const statusOptions = ["Concluído", "Pendente", "Em andamento"];

const initialTasks = [
  { id: 1, title: "Revisar código", status: "Concluído", description: "Revisão do código para refatoração." },
  { id: 2, title: "Criar testes unitários", status: "Pendente", description: "Criar testes para garantir cobertura do código." },
  { id: 3, title: "Atualizar documentação", status: "Em andamento", description: "Documentação do novo módulo." },
  { id: 4, title: "Atualizar documentação da WorkHub", status: "Em andamento", description: "Documentação do novo módulo." },
];

function MyTasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filterTitle, setFilterTitle] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleTaskChange = (field, value) => {
    setSelectedTask((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === selectedTask.id ? selectedTask : task
      )
    );
    setIsEditing(false);
    setSelectedTask(null);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(filterTitle.toLowerCase()) &&
    (filterStatus ? task.status === filterStatus : true)
  );

  return (
    <div className="my-tasks-container">
      <h2>Minhas Tarefas</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Filtrar por título..."
          value={filterTitle}
          onChange={(e) => setFilterTitle(e.target.value)}
        />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">Todos</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id} onClick={() => { setSelectedTask(task); setIsEditing(false); }}>
            {task.title} - <span className={`status ${task.status.replace(" ", "-").toLowerCase()}`}>{task.status}</span>
          </li>
        ))}
      </ul>

      {selectedTask && (
        <div className="modal">
          <div className="modal-content">
            <h3>{isEditing ? "Editar Tarefa" : "Detalhes da Tarefa"}</h3>

            {isEditing ? (
              <>
                <label>Título:</label>
                <input
                  type="text"
                  value={selectedTask.title}
                  onChange={(e) => handleTaskChange("title", e.target.value)}
                />

                <label>Status:</label>
                <select
                  value={selectedTask.status}
                  onChange={(e) => handleTaskChange("status", e.target.value)}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>

                <label>Descrição:</label>
                <textarea
                  value={selectedTask.description}
                  onChange={(e) => handleTaskChange("description", e.target.value)}
                />

                <div className="modal-buttons">
                  <button onClick={handleSave}>Salvar</button>
                  <button onClick={() => setIsEditing(false)}>Cancelar</button>
                </div>
              </>
            ) : (
              <>
                <p><strong>Título:</strong> {selectedTask.title}</p>
                <p><strong>Status:</strong> {selectedTask.status}</p>
                <p><strong>Descrição:</strong> {selectedTask.description}</p>

                <div className="modal-buttons">
                  <button onClick={() => setIsEditing(true)}>Editar</button>
                  <button onClick={() => setSelectedTask(null)}>Fechar</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyTasks;
