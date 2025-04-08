import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import userService from "../../../../services/userService"; // ajuste conforme necessário
import "./styles.css";

const statusOptions = [
  { label: "Funcionário", value: "employee" },
  { label: "Cliente", value: "client" },
  { label: "Gerente", value: "manager" },
  { label: "RH", value: "rh" },
  { label: "Suporte", value: "support" },
  { label: "Administrador", value: "admin" },
];

function EditEmployeeModal({ show, handleClose, user, setEmployees }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "employee",
    photo: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "employee",
        photo: user.photo || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await userService.updateUser(user._id, formData);
      const updatedUser = response.data.user; // <- acessando corretamente o user da resposta

      setEmployees((prev) =>
        prev.map((emp) => (emp._id === user._id ? updatedUser : emp))
      );

      handleClose();
    } catch (error) {
      console.error("Erro ao editar usuário:", error.response?.data || error.message);
      alert("Erro ao editar usuário. Verifique os dados e tente novamente.");
    }
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
          <h2>Editar Usuário</h2>
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
          <input
            type="text"
            placeholder="Link da Foto (opcional)"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
          />
          <select name="role" value={formData.role} onChange={handleChange}>
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="modal-footer">
          <button className="btn secondary" onClick={handleClose}>Cancelar</button>
          <button className="btn primary" onClick={handleSubmit}>Salvar</button>
        </div>
      </div>
    </div>
  );
}

EditEmployeeModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  setEmployees: PropTypes.func.isRequired,
};

export default EditEmployeeModal;
