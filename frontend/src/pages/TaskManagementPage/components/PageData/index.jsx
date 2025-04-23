import { useState, useEffect } from "react";
import { Button, InputGroup, Form } from "react-bootstrap";
import TaskTable from "../TaskTable";
import DeleteModal from "../DeleteModal";
import FilterModal from "../FilterModal";
import AddTaskModal from "../AddTaskModal";
import taskService from "../../../../services/taskService";
import "./styles.css";

function PageData() {

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await taskService.getTasks();
        setTasks(data.data.tasks);
        // console.log(data.data.tasks);
      } catch (error) {
        console.error("Erro ao carregar as tarefas:", error);
      }
    };

    fetchTasks();
  }, []);

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
    responsibles: []
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

  const openDeleteModal = (tasks) => {
    setFormData(tasks);
    setShowDeleteModal(true);
  };

  const openEditModal = (tasks) => {
    setFormData(tasks);
    setShowAddTaskModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteConfirmText("");
  };

  const handleDelete = () => {
    setTasks((prev) => prev.filter((task) => task.id !== formData.id));
    closeDeleteModal();
  };

  const handleCheckboxChange = (id) => {
    setSelectedTasks((prev) =>
      prev.includes(id) ? prev.filter((taskId) => taskId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedTasks(
      selectedTasks.length === tasks.length ? [] : tasks.map((e) => e.id)
    );
  };

  const handleApplyFilter = (newFilter) => {
    setFilter(newFilter);
    setShowFilterModal(false);
  };

  const filteredTasks = tasks.filter((task) => {
    const responsibleNames = task.responsibles.map(r => r.name.toLowerCase()).join(", ");
    return (
      (filter.title ? task.title.toLowerCase().includes(filter.title.toLowerCase()) : true) &&
      (filter.description ? task.description.toLowerCase().includes(filter.description.toLowerCase()) : true) &&
      (filter.status ? task.status.toLowerCase().includes(filter.status.toLowerCase()) : true) &&
      (filter.due_date ? task.due_date.toLowerCase().includes(filter.due_date.toLowerCase()) : true) &&
      (filter.responsible ? responsibleNames.includes(filter.responsible.toLowerCase()) : true)
    );
  });

  const handleAddTask = (newTask) => {
    if (newTask.id) {
      setTasks(tasks.map((task) => (task.id === newTask.id ? newTask : task)));
    } else {
      setTasks((prev) => [...prev, { ...newTask, id: Date.now().toString() }]);
    }
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    const foundTasks = tasks.filter((task) => {
      const responsibleNames = task.responsibles.map(r => r.name.toLowerCase()).join(", ");
      return (
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.due_date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        responsibleNames.includes(searchTerm.toLowerCase())
      );
    });

    setSearchResults(foundTasks);
  };

  useEffect(() => {
    if (searchTerm.trim()) {
      const foundTasks = tasks.filter((task) => {
        const responsibleNames = task.responsibles.map(r => r.name.toLowerCase()).join(", ");
        return (
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.due_date.toLowerCase().includes(searchTerm.toLowerCase()) ||
          responsibleNames.includes(searchTerm.toLowerCase())
        );
      });
      setSearchResults(foundTasks);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, tasks]);

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

      <TaskTable
        tasks={tasksToDisplay}
        selectedTasks={selectedTasks}
        handleCheckboxChange={handleCheckboxChange}
        handleSelectAll={handleSelectAll}
        openDeleteModal={openDeleteModal}
        openModal={openEditModal}
      />

      <DeleteModal
        show={showDeleteModal}
        closeDeleteModal={closeDeleteModal}
        handleDelete={handleDelete}
        formData={formData}
        deleteConfirmText={deleteConfirmText}
        setDeleteConfirmText={setDeleteConfirmText}
      />

      <FilterModal
        show={showFilterModal}
        handleClose={() => setShowFilterModal(false)}
        handleApplyFilter={handleApplyFilter}
        filter={filter}
        setFilter={setFilter}
      />

      <AddTaskModal
        show={showAddTaskModal}
        handleClose={() => setShowAddTaskModal(false)}
        handleAddTask={handleAddTask}
        task={formData}
      />
    </div>
  );
}

export default PageData;
