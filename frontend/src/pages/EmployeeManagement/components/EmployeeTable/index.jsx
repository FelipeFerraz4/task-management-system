import { Table, Form } from "react-bootstrap";
import editIcon from "../../../../assets/edit.png";
import deleteIcon from "../../../../assets/bin.png";
import PropTypes from "prop-types";
import "./styles.css";

const EmployeeTable = ({ employees, selectedEmployees, handleCheckboxChange, handleSelectAll, openModal, openDeleteModal }) => {
  return (
    <div className="table-container">
      {/* Tabela versão Desktop */}
      <Table striped bordered hover className="table d-none d-md-table">
        <thead>
          <tr>
            <th>
              <Form.Check
                type="checkbox"
                checked={selectedEmployees.length === employees.length && employees.length > 0}
                onChange={handleSelectAll}
              />
            </th>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Função</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={selectedEmployees.includes(employee.id)}
                  onChange={() => handleCheckboxChange(employee.id)}
                />
              </td>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
              <td>
                <button className="icon-btn" onClick={() => openModal(employee)}>
                  <img src={editIcon} alt="Editar" className="icon" />
                </button>
                <button className="icon-btn" onClick={() => openDeleteModal(employee)}>
                  <img src={deleteIcon} alt="Deletar" className="icon" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Versão Mobile */}
      <div className="mobile-table d-md-none">
        {/* Checkbox para selecionar todos os itens na versão mobile */}
        <div className="mobile-select-all">
          <Form.Check
            type="checkbox"
            checked={selectedEmployees.length === employees.length && employees.length > 0}
            onChange={handleSelectAll}
            label="Selecionar Todos"
          />
        </div>

        {/* Cartões de cada funcionário */}
        {employees.map((employee) => (
          <div key={employee.id} className="mobile-card">
            <div className="mobile-checkbox">
              <Form.Check
                type="checkbox"
                checked={selectedEmployees.includes(employee.id)}
                onChange={() => handleCheckboxChange(employee.id)}
              />
            </div>
            <p><strong>Nome:</strong> {employee.name}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Função:</strong> {employee.role}</p>
            <div className="mobile-actions">
              <button className="icon-btn" onClick={() => openModal(employee)}>
                <img src={editIcon} alt="Editar" className="icon" />
              </button>
              <button className="icon-btn" onClick={() => openDeleteModal(employee)}>
                <img src={deleteIcon} alt="Deletar" className="icon" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

EmployeeTable.propTypes = {
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedEmployees: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  handleSelectAll: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  openDeleteModal: PropTypes.func.isRequired,
};

export default EmployeeTable;
