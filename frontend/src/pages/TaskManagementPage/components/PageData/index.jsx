import { useState, useEffect } from "react";
import { Button, InputGroup, Form } from "react-bootstrap";
import TaskTable from "../TaskTable";
import DeleteModal from "../DeleteModal";
import FilterModal from "../FilterModal";
import AddTaskModal from "../AddTaskModal";
import "./styles.css";

function PageData() {

  // State for managing tasks list
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Revisar documentação do projeto",
      description: "Ler e corrigir a documentação técnica do sistema.",
      status: "pending",
      due_date: "2025-03-01",
      responsible: "João Silva"
    },
    {
      id: "2",
      title: "Desenvolver página de login",
      description: "Criar a tela de login com integração ao Keycloak.",
      status: "in-progress",
      due_date: "2025-02-25",
      responsible: "Maria Oliveira"
    },
    {
      id: "3",
      title: "Configurar ambiente de produção",
      description: "Ajustar o Docker e Nginx para o ambiente final.",
      status: "pending",
      due_date: "2025-03-05",
      responsible: "Carlos Souza"
    },
    {
      id: "4",
      title: "Testar integração com API externa",
      description: "Garantir que os endpoints externos estão funcionando corretamente.",
      status: "completed",
      due_date: "2025-02-20",
      responsible: "Ana Lima"
    },
    {
      id: "5",
      title: "Criar relatório de progresso",
      description: "Gerar um relatório com o status das tarefas concluídas.",
      status: "in-progress",
      due_date: "2025-03-10",
      responsible: "Lucas Mendes"
    }
  ]);

  // States for managing modals and task interactions
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    status: "",
    due_date: "",
    responsible: ""
  });
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [filter, setFilter] = useState({
    id: "",
    title: "",
    description: "",
    status: "",
    due_date: "",
    responsible: ""
  });

  // Function to open the delete modal and set the task data to be deleted
  const openDeleteModal = (tasks) => {
    setFormData(tasks);
    setShowDeleteModal(true);
  };

  // Function to open the edit modal with selected task data
  const openEditModal = (tasks) => {
    setFormData(tasks);
    setShowAddTaskModal(true);
  };

  // Close the delete modal
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteConfirmText("");
  };

  // Handle task deletion
  const handleDelete = () => {
    setTasks((prev) => prev.filter((task) => task.id !== formData.id));
    closeDeleteModal();
  };

  // Handle checkbox selection for tasks
  const handleCheckboxChange = (id) => {
    setSelectedTasks((prev) => prev.includes(id) ? prev.filter((taskId) => taskId !== id) : [...prev, id]);
  };

  // Handle selecting/deselecting all tasks
  const handleSelectAll = () => {
    setSelectedTasks(selectedTasks.length === tasks.length ? [] : tasks.map((e) => e.id));
  };

  // Apply filter and close filter modal
  const handleApplyFilter = (newFilter) => {
    setFilter(newFilter);
    setShowFilterModal(false);
  };

  // Filter tasks based on the applied filters
  const filteredTasks = tasks.filter((task) => {
    return (
      (filter.title ? task.title.toLowerCase().includes(filter.title.toLowerCase()) : true) &&
      (filter.description ? task.description.toLowerCase().includes(filter.description.toLowerCase()) : true) &&
      (filter.status ? task.status.toLowerCase().includes(filter.status.toLowerCase()) : true) &&
      (filter.due_date ? task.due_date.toLowerCase().includes(filter.due_date.toLowerCase()) : true) &&
      (filter.responsible ? task.responsible.toLowerCase().includes(filter.responsible.toLowerCase()) : true)
    );
  });

  // Handle adding or updating a task
  const handleAddTask = (newTask) => {
    if (newTask.id) {
      setTasks(tasks.map((task) => (task.id === newTask.id ? newTask : task)));
    } else {
      setTasks((prev) => [...prev, { ...newTask, id: Date.now().toString() }]);
    }
  };

  // Handle task search
  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    // Filter tasks based on the search term
    const foundTasks = tasks.filter((task) => 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.due_date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.responsible.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(foundTasks);
  };

  // Update `searchResults` whenever the search term or tasks change
  useEffect(() => {
    if (searchTerm.trim()) {
      const foundTasks = tasks.filter((task) => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.due_date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.responsible.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(foundTasks);
    } else {
      setSearchResults([]); // Limpa os resultados de pesquisa se não houver termo de busca
    }
  }, [searchTerm, tasks]);

  // Combine search results with applied filters for final task list
  const tasksToDisplay = searchResults.length > 0 ? searchResults : filteredTasks;

  return (
    <div className="container">
      <h2>Gerenciamento de Tarefas</h2>

      <InputGroup className="inputGroup mb-3">
        <Form.Control 
          type="text" 
          placeholder="Pesquisar" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="primary" onClick={handleSearch}>Buscar</Button>
        <Button variant="secondary" onClick={() => setShowFilterModal(true)}>Filtrar</Button>
      </InputGroup>

      <Button variant="primary" onClick={() => setShowAddTaskModal(true)} className="mb-3">
        Adicionar Tarefa
      </Button>

      {/* Task Table displaying filtered or searched tasks */}
      <TaskTable
        tasks={tasksToDisplay}
        selectedTasks={selectedTasks}
        handleCheckboxChange={handleCheckboxChange}
        handleSelectAll={handleSelectAll}
        openDeleteModal={openDeleteModal}
        openModal={openEditModal}
      />

      {/* Delete Modal */}
      <DeleteModal
        show={showDeleteModal}
        closeDeleteModal={closeDeleteModal}
        handleDelete={handleDelete}
        formData={formData}
        deleteConfirmText={deleteConfirmText}
        setDeleteConfirmText={setDeleteConfirmText}
      />

      {/* Filter Modal */}
      <FilterModal
        show={showFilterModal}
        handleClose={() => setShowFilterModal(false)}
        handleApplyFilter={handleApplyFilter}
        filter={filter}
        setFilter={setFilter}
      />

      {/* Add Task Modal */}
      <AddTaskModal
        show={showAddTaskModal}
        handleClose={() => setShowAddTaskModal(false)}
        handleAddTask={handleAddTask}
        task={formData}
      />
    </div>
  );
};

export default PageData;
