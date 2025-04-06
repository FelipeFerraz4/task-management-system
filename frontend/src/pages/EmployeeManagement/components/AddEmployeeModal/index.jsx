import { useState, useEffect } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import PropTypes from "prop-types";

// AddEmployeeModal component to add or edit a employee
function AddEmployeeModal({ show, handleClose, handleAddEmployee, employee = null }) {

  // State to hold the form data for the employee being added or edited
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "employee",
  });

  // useEffect to load the task data into the form if we are editing an existing task 
  useEffect(() => {
    if (employee && employee._id) {
      setFormData(employee);
    }
  }, [employee]);

  // Handle changes in form input fields and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission by calling the handleAddEmployee function and closing the modal
  const handleSubmit = () => {
    handleAddEmployee(formData);
    handleClose();
  };

  return (

    // Modal component from React Bootstrap to display the form
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{formData._id ? "Editar Funcionário" : "Adicionar Funcionário"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        {/* Form to capture employee details */}
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

        {/* Close button */}
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>

        {/* Submit button with dynamic label */}
        <Button variant="primary" onClick={handleSubmit}>
          {formData._id ? "Salvar Alterações" : "Adicionar"}
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
    _id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  }),
};

export default AddEmployeeModal;
