import { useState } from "react";
import PropTypes from "prop-types";
import userService from "../../../../services/userService"; // adapte o caminho conforme necessário
import "./styles.css";

const statusOptions = [
  { label: "Funcionário", value: "employee" },
  { label: "Cliente", value: "client" },
  { label: "Gerente", value: "manager" },
  { label: "RH", value: "rh" },
  { label: "Suporte", value: "support" },
  { label: "Administrador", value: "admin" },
];

function AddEmployeeModal({ show, handleClose, setEmployees }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "employee",
    photo: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await userService.createUser(formData);
      // console.log("Usuário cadastrado com sucesso:", response);
      setEmployees((prev) => [...prev, response.data.user]); // Adiciona o novo usuário à lista de funcionários
      handleClose();
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error.response?.data || error.message);
      alert("Erro ao cadastrar usuário. Verifique os dados e tente novamente.");
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
          <h2>Cadastro de Usuário</h2>
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
          <input
            type="password"
            placeholder="Senha"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Confirmar Senha"
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleChange}
          />
        </div>
        <div className="modal-footer">
          <button className="btn secondary" onClick={handleClose}>Fechar</button>
          <button className="btn primary" onClick={handleSubmit}>Cadastrar</button>
        </div>
      </div>
    </div>
  );
}

AddEmployeeModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  setEmployees: PropTypes.func.isRequired,
};

export default AddEmployeeModal;
