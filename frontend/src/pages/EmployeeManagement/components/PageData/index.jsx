import { useEffect, useState } from "react";
import { Button, InputGroup, Form } from "react-bootstrap";
import EmployeeTable from "../EmployeeTable";
import DeleteModal from "../DeleteModal";
import FilterModal from "../FilterModal";
import AddEmployeeModal from "../AddEmployeeModal";
import EditEmployeeModal from "../EditEmployeeModal"; // ✅ Corrigido
import userService from "../../../../services/userService";
import "./styles.css";

function PageData() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await userService.getAllUsers();
        setEmployees(response.data.users);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  // Estados de modal e pesquisa
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // ✅ Novo estado
  const [selectedUser, setSelectedUser] = useState(null); // ✅ Novo estado
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [formData, setFormData] = useState({ _id: "", name: "", email: "", role: "employee" });
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [filter, setFilter] = useState({ name: "", email: "", role: "" });

  const openDeleteModal = (employee) => {
    setFormData(employee);
    setShowDeleteModal(true);
  };

  const openEditModal = (employee) => {
    setSelectedUser(employee);
    setShowEditModal(true);
  };

  const handleCheckboxChange = (id) => {
    setSelectedEmployees((prev) =>
      prev.includes(id) ? prev.filter((empId) => empId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedEmployees(
      selectedEmployees.length === employees.length ? [] : employees.map((e) => e._id)
    );
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

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    const foundEmployee = employees.filter((employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(foundEmployee);
  };

  useEffect(() => {
    if (searchTerm.trim()) {
      const foundTasks = employees.filter((employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(foundTasks);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, employees]);

  const EmployeesToDisplay = searchResults.length > 0 ? searchResults : filteredEmployees;

  return (
    <div className="container">
      <h2>Gerenciamento de Funcionários</h2>

      {/* Pesquisa e Filtro */}
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

      {/* Botão de adicionar funcionário */}
      <Button
        variant="primary"
        onClick={() => setShowAddEmployeeModal(true)}
        className="mb-3"
      >
        Adicionar Funcionário
      </Button>

      {/* Tabela de funcionários */}
      <EmployeeTable
        employees={EmployeesToDisplay}
        selectedEmployees={selectedEmployees}
        handleCheckboxChange={handleCheckboxChange}
        handleSelectAll={handleSelectAll}
        openDeleteModal={openDeleteModal}
        openModal={openEditModal}
      />

      {/* Modal de Exclusão */}
      <DeleteModal
        show={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        formData={formData}
        employees={employees}
        setEmployees={setEmployees}
      />

      {/* Modal de Filtro */}
      <FilterModal
        show={showFilterModal}
        handleClose={() => setShowFilterModal(false)}
        handleApplyFilter={handleApplyFilter}
        filter={filter}
        setFilter={setFilter}
      />

      {selectedUser && (
        <EditEmployeeModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          user={selectedUser}
          setEmployees={setEmployees}
        />
      )}

      {/* Modal de Adição */}
      <AddEmployeeModal
        show={showAddEmployeeModal}
        handleClose={() => setShowAddEmployeeModal(false)}
        setEmployees={setEmployees}
      />
    </div>
  );
}

export default PageData;
