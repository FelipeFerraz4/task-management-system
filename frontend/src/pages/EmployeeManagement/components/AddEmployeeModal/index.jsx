import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./styles.css"; // CSS separado

function AddEmployeeModal({ show, handleClose, handleAddEmployee, employee = null }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "employee",
  });

  useEffect(() => {
    if (employee && employee._id) {
      setFormData(employee);
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    handleAddEmployee(formData);
    handleClose();
  };

  if (!show) return null;

  const handleBackdropClick = (e) => {
    if (e.target.className === "modal-backdrop") {
      handleClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content-custom">
        <div className="modal-header">
          <h2>{formData._id ? "Editar Funcionário" : "Adicionar Funcionário"}</h2>
          <button className="close-btn" onClick={handleClose}>×</button>
        </div>
        <div className="modal-body">
          <input
            type="text"
            placeholder="Nome"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="employee">Funcionário</option>
            <option value="manager">Gerente</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <div className="modal-footer">
          <button className="btn secondary" onClick={handleClose}>Fechar</button>
          <button className="btn primary" onClick={handleSubmit}>
            {formData._id ? "Salvar Alterações" : "Adicionar"}
          </button>
        </div>
      </div>
    </div>
  );
}

AddEmployeeModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleAddEmployee: PropTypes.func.isRequired,
  employee: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  }),
};

export default AddEmployeeModal;
