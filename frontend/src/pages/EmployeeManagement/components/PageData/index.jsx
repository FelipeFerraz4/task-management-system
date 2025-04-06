import { useEffect, useState } from "react";
import { Button, InputGroup, Form } from "react-bootstrap";
import EmployeeTable from "../EmployeeTable";
import DeleteModal from "../DeleteModal";
import FilterModal from "../FilterModal";
import AddEmployeeModal from "../AddEmployeeModal";
import userService from "../../../../services/userService";
import "./styles.css";

function PageData() {

  // Initialize state variables
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch employees from the user service when the component mounts 
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

  // Modal and search-related states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [formData, setFormData] = useState({ _id: "", name: "", email: "", role: "employee" });
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [filter, setFilter] = useState({ name: "", email: "", role: "" });

  // Open delete modal and set the employee to be deleted
  const openDeleteModal = (employee) => {
    setFormData(employee);
    setShowDeleteModal(true);
  };

  // Open edit modal to edit employee data
  const openEditModal = (employee) => {
    setFormData(employee);
    setShowAddEmployeeModal(true);
  }

  // Close delete modal and reset confirmation text
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteConfirmText("");
  };

  // Handle employee deletion by filtering out the deleted employee
  const handleDelete = () => {
    setEmployees((prev) => prev.filter((emp) => emp._id !== formData._id));
    closeDeleteModal();
  };

  // Handle checkbox change for selecting employees
  const handleCheckboxChange = (id) => {
    setSelectedEmployees((prev) => prev.includes(id) ? prev.filter((empId) => empId !== id) : [...prev, id]);
  };

  // Select/deselect all employees
  const handleSelectAll = () => {
    setSelectedEmployees(selectedEmployees.length === employees.length ? [] : employees.map((e) => e._id));
  };

  // Apply filters based on the form data
  const handleApplyFilter = (newFilter) => {
    setFilter(newFilter);
    setShowFilterModal(false);
  };

  // Filter employees based on the applied filters
  const filteredEmployees = employees.filter((employee) => {
    return (
      (filter.name ? employee.name.toLowerCase().includes(filter.name.toLowerCase()) : true) &&
      (filter.email ? employee.email.toLowerCase().includes(filter.email.toLowerCase()) : true) &&
      (filter.role ? employee.role.toLowerCase().includes(filter.role.toLowerCase()) : true)
    );
  });

  // Handle adding a new employee or editing an existing one
  const handleAddEmployee = (newEmployee) => {
    if (newEmployee._id) {
      setEmployees(employees.map((emp) => (emp._id === newEmployee._id ? newEmployee : emp)));
    } else {
      setEmployees((prev) => [...prev, { ...newEmployee, _id: Date.now().toString() }]);
    }
  };

  // Handle search functionality based on search term
  const handleSearch = () => {
      if (!searchTerm.trim()) return;
  
      // Search for employees matching the search term
      const foundEmployee = employees.filter((employee) => 
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      setSearchResults(foundEmployee);
    };
  
    // Update search results whenever the search term or employee data changes
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
  
    // Combine the search results with the applied filters
    const EmployeesToDisplay = searchResults.length > 0 ? searchResults : filteredEmployees;

  return (
    <div className="container">
      <h2>Gerenciamento de Funcionários</h2>

      {/* Search and Filter Inputs */}
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

      {/* Button to open Add Employee Modal */}
      <Button variant="primary" onClick={() => setShowAddEmployeeModal(true)} className="mb-3">
        Adicionar Funcionário
      </Button>

      {/* Employee Table Component */}
      <EmployeeTable
        employees={EmployeesToDisplay}
        selectedEmployees={selectedEmployees}
        handleCheckboxChange={handleCheckboxChange}
        handleSelectAll={handleSelectAll}
        openDeleteModal={openDeleteModal}
        openModal={openEditModal}
      />

      {/* Delete Modal Component */}
      <DeleteModal
        show={showDeleteModal}
        closeDeleteModal={closeDeleteModal}
        handleDelete={handleDelete}
        formData={formData}
        deleteConfirmText={deleteConfirmText}
        setDeleteConfirmText={setDeleteConfirmText}
      />

      {/* Filter Modal Component */}
      <FilterModal
        show={showFilterModal}
        handleClose={() => setShowFilterModal(false)}
        handleApplyFilter={handleApplyFilter}
        filter={filter}
        setFilter={setFilter}
      />

      {/* Add/Edit Employee Modal Component */}
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
