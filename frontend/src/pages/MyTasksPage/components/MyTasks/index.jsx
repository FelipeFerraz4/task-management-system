import { useEffect, useState } from "react";
import "./styles.css";
import taskService from "../../../../services/taskService";

const statusOptions = [
  { label: "Pendente", value: "pending" },
  { label: "Em andamento", value: "in-progress" },
  { label: "Concluído", value: "completed" },
  { label: "Cancelado", value: "cancelled" },
];

const getStatusLabel = (value) => {
  const found = statusOptions.find((option) => option.value === value);
  return found ? found.label : value;
};

function MyTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchMyTasks = async () => {
      try {
        const res = await taskService.getMyTasks();
        setTasks(res.data.tasks);
      } catch (err) {
        console.error("Erro ao buscar tarefas:", err);
      }
    };
    fetchMyTasks();
  }, []);

  const handleSave = async () => {
    const originalTask = tasks.find(task => task._id === selectedTask._id);
    const updatedFields = {};

    if (selectedTask.title !== originalTask.title) updatedFields.title = selectedTask.title;
    if (selectedTask.status !== originalTask.status) updatedFields.status = selectedTask.status;
    if (selectedTask.description !== originalTask.description) updatedFields.description = selectedTask.description;

    if (Object.keys(updatedFields).length === 0) {
      setIsEditing(false);
      setSelectedTask(null);
      return; // Nada mudou
    }

    try {
      await taskService.updateTask(selectedTask._id, updatedFields);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === selectedTask._id ? selectedTask : task
        )
      );

      setIsEditing(false);
      setSelectedTask(null);
    } catch (error) {
      console.error("Erro ao salvar a tarefa:", error);
      alert("Erro ao salvar a tarefa. Tente novamente.");
    }
  };


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

  const filteredTasks = tasks.filter(
    (task) =>
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
            <option key={status.value} value={status.value}>{status.label}</option>
          ))}
        </select>
      </div>

      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task._id} onClick={() => { setSelectedTask(task); setIsEditing(false); }}>
            {task.title} - <span className={`status ${task.status.replace(" ", "-").toLowerCase()}`}>{getStatusLabel(task.status)}</span>
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
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>

                <label>Descrição:</label>
                <textarea
                  style={{ resize: "none", maxHeight: "200px" }}
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
                <p><strong>Status:</strong> {getStatusLabel(selectedTask.status)}</p>
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
