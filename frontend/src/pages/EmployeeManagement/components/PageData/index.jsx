import { useEffect, useState } from "react";
import { Button, InputGroup, Form } from "react-bootstrap";
import EmployeeTable from "../EmployeeTable";
import DeleteModal from "../DeleteModal";
import FilterModal from "../FilterModal";
import AddEmployeeModal from "../AddEmployeeModal"; // Importe o modal de adicionar/editar
import "./styles.css";

const PageData = () => {
  const [employees, setEmployees] = useState([
    { id: "1", name: "Julia", email: "julia@gmail.com", role: "employee" },
    { id: "2", name: "Carlos", email: "carlos@gmail.com", role: "manager" },
    { id: "3", name: "Ana", email: "ana@gmail.com", role: "admin" },
  ]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false); // Para controlar o modal de adicionar/editar funcionário
  const [formData, setFormData] = useState({ id: "", name: "", email: "", role: "employee" });
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [filter, setFilter] = useState({ name: "", email: "", role: "" });

  const openDeleteModal = (employee) => {
    setFormData(employee);
    setShowDeleteModal(true);
  };

  const openEditModal = (employee) => {
    setFormData(employee);
    setShowAddEmployeeModal(true);
  }

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteConfirmText("");
  };

  const handleDelete = () => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== formData.id));
    closeDeleteModal();
  };

  const handleCheckboxChange = (id) => {
    setSelectedEmployees((prev) => prev.includes(id) ? prev.filter((empId) => empId !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    setSelectedEmployees(selectedEmployees.length === employees.length ? [] : employees.map((e) => e.id));
  };

  const handleApplyFilter = (newFilter) => {
    setFilter(newFilter);
    setShowFilterModal(false);
  };

  const filteredEmployees = employees.filter((employee) => {
    return (
      (filter.name ? employee.name.toLowerCase().includes(filter.name.toLowerCase()) : true) &&
      (filter.email ? employee.email.toLowerCase().includes(filter.email.toLowerCase()) : true) &&
      (filter.role ? employee.role.toLowerCase().includes(filter.role.toLowerCase()) : true)
    );
  });

  const handleAddEmployee = (newEmployee) => {
    if (newEmployee.id) {
      // Editar um funcionário existente
      setEmployees(employees.map((emp) => (emp.id === newEmployee.id ? newEmployee : emp)));
    } else {
      // Adicionar um novo funcionário
      setEmployees((prev) => [...prev, { ...newEmployee, id: Date.now().toString() }]);
    }
  };

  const handleSearch = () => {
      if (!searchTerm.trim()) return;
  
      // Filtra as tarefas com base no termo de pesquisa
      const foundEmployee = employees.filter((employee) => 
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      setSearchResults(foundEmployee);
    };
  
    // Atualizar `filteredTasks` sempre que o termo de busca ou o filtro mudar
    useEffect(() => {
      if (searchTerm.trim()) {
        const foundTasks = employees.filter((employee) => 
          employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.role.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(foundTasks);
      } else {
        setSearchResults([]); // Limpa os resultados de pesquisa se não houver termo de busca
      }
    }, [searchTerm, employees]);
  
    // Combina os resultados da pesquisa com os filtros aplicados
    const EmployeesToDisplay = searchResults.length > 0 ? searchResults : filteredEmployees;

  return (
    <div className="container">
      <h2>Gerenciamento de Funcionários</h2>

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

      <Button variant="primary" onClick={() => setShowAddEmployeeModal(true)} className="mb-3">
        Adicionar Funcionário
      </Button>

      <EmployeeTable
        employees={EmployeesToDisplay}
        selectedEmployees={selectedEmployees}
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

      <AddEmployeeModal
        show={showAddEmployeeModal}
        handleClose={() => setShowAddEmployeeModal(false)}
        handleAddEmployee={handleAddEmployee}
        employee={formData}
      />
    </div>
  );
};

export default PageData;
