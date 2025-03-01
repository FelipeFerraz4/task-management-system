import { Table, Form } from "react-bootstrap";
import editIcon from "../../../../assets/edit.png";
import deleteIcon from "../../../../assets/bin.png";
import PropTypes from "prop-types";
import "./styles.css";

// TaskTable Component - Displays a list of tasks in a table format (desktop) and a card format (mobile)
function TaskTable ({ tasks, selectedTasks, handleCheckboxChange, handleSelectAll, openModal, openDeleteModal }) {
  return (
    <div className="table-container">

      {/* Desktop Version of the Table */}
      <Table striped bordered hover className="table d-none d-md-table">
        <thead>
          <tr>

            {/* Checkbox for selecting all tasks */}
            <th className="text-center">
              <Form.Check
                type="checkbox"
                checked={selectedTasks.length === tasks.length && tasks.length > 0}
                onChange={handleSelectAll}
              />
            </th>
            <th className="text-center">ID</th>
            <th className="text-center">Título</th>
            <th className="text-center">Descrição</th>
            <th className="text-center">Status</th>
            <th className="text-center">Data de vencimento</th>
            <th className="text-center">Responsável</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>

          {/* Mapping through tasks to render each row */}
          {tasks.map((task) => (
            <tr key={task.id}>
              <td className="text-center">

                {/* Checkbox to select individual tasks */}
                <Form.Check
                  type="checkbox"
                  checked={selectedTasks.includes(task.id)}
                  onChange={() => handleCheckboxChange(task.id)}
                />
              </td>
              <td className="text-center">{task.id}</td>
              <td className="text-center">{task.title}</td>
              <td className="text-center">{task.description}</td>
              <td className="text-center">{task.status}</td>
              <td className="text-center">{task.due_date}</td>
              <td className="text-center">{task.responsible}</td>

              {/* Edit and Delete action buttons */}
              <td className="text-center">
                <button className="icon-btn" onClick={() => openModal(task)}>
                  <img src={editIcon} alt="Editar" className="icon" />
                </button>
                <button className="icon-btn" onClick={() => openDeleteModal(task)}>
                  <img src={deleteIcon} alt="Deletar" className="icon" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Mobile Version (Displays as Cards) */}
      <div className="mobile-table d-md-none">

        {/* Select All Checkbox for mobile */}
        <div className="mobile-select-all">
          <Form.Check
            type="checkbox"
            checked={selectedTasks.length === tasks.length && tasks.length > 0}
            onChange={handleSelectAll}
            label="Selecionar Todos"
          />
        </div>

        {/* Rendering tasks as individual cards for mobile */}
        {tasks.map((task) => (
          <div key={task.id} className="mobile-card">
            <div className="mobile-checkbox">
              <Form.Check
                type="checkbox"
                checked={selectedTasks.includes(task.id)}
                onChange={() => handleCheckboxChange(task.id)}
              />
            </div>
            <p><strong>Título:</strong> {task.title}</p>
            <p><strong>Descrição:</strong> {task.description}</p>
            <p><strong>Status:</strong> {task.status}</p>
            <p><strong>Data de vencimento:</strong> {task.due_date}</p>
            <p><strong>Responsável:</strong> {task.responsible}</p>
            
            {/* Edit and Delete action buttons */}
            <div className="mobile-actions">
              <button className="icon-btn" onClick={() => openModal(task)}>
                <img src={editIcon} alt="Editar" className="icon" />
              </button>
              <button className="icon-btn" onClick={() => openDeleteModal(task)}>
                <img src={deleteIcon} alt="Deletar" className="icon" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

TaskTable.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      due_date: PropTypes.string.isRequired,
      responsible: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedTasks: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  handleSelectAll: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  openDeleteModal: PropTypes.func.isRequired,
};

export default TaskTable;
