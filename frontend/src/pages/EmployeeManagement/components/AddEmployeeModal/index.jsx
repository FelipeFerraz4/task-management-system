import { useState, useEffect } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import PropTypes from "prop-types";

const AddEmployeeModal = ({ show, handleClose, handleAddEmployee, employee = null }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "employee",
  });

  useEffect(() => {
    if (employee && employee.id) {
      setFormData(employee); // Preenche o formulário com os dados do funcionário para edição
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

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{formData.id ? "Editar Funcionário" : "Adicionar Funcionário"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Nome"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="employee">Funcionário</option>
              <option value="manager">Gerente</option>
              <option value="admin">Administrador</option>
            </Form.Select>
          </InputGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {formData.id ? "Salvar Alterações" : "Adicionar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

AddEmployeeModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleAddEmployee: PropTypes.func.isRequired,
  employee: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  }),
};

export default AddEmployeeModal;
