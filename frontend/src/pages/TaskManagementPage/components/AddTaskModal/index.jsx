import { useState, useEffect } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import PropTypes from "prop-types";

// AddEmployeeModal component to add or edit a task
function AddTaskModal({ show, handleClose, handleAddTask, task = null }) {

  // State to hold the form data for the task being added or edited
  const [formData, setFormData] = useState({
    "id": "",
    "title": "",
    "description": "",
    "status": "",
    "due_date": "",
    "responsible": ""
  });

  // useEffect to load the task data into the form if we are editing an existing task 
  useEffect(() => {
    if (task && task.id) {
      setFormData(task);
    }
  }, [task]);

  // Handle changes in form input fields and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission by calling the handleAddTask function and closing the modal
  const handleSubmit = () => {
    handleAddTask(formData);
    handleClose();
  };

  return (

    // Modal component from React Bootstrap to display the form
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{formData.id ? "Editar Tarefa" : "Adicionar Tarefa"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        {/* Form to capture task details */}
        <Form>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Título"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Descrição"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Select
              name="Status"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="pending">Pendente</option>
              <option value="in-progress">Em andamento</option>
              <option value="completed">Concluído</option>
            </Form.Select>
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control
              type="date"
              placeholder="Data de vencimento"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Descrição"
              name="Responsável"
              value={formData.responsible}
              onChange={handleChange}
            />
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
          {formData.id ? "Salvar Alterações" : "Adicionar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

AddTaskModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleAddTask: PropTypes.func.isRequired,
  task: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      due_date: PropTypes.string.isRequired,
      responsible: PropTypes.string.isRequired,
    }),
};

export default AddTaskModal;
