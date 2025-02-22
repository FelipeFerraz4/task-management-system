import { useState, useEffect } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import PropTypes from "prop-types";

const AddEmployeeModal = ({ show, handleClose, handleAddTask, task = null }) => {
  const [formData, setFormData] = useState({
    "id": "",
    "title": "",
    "description": "",
    "status": "",
    "due_date": "",
    "responsible": ""
  });

  useEffect(() => {
    if (task && task.id) {
      setFormData(task);
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    handleAddTask(formData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{formData.id ? "Editar Tarefa" : "Adicionar Tarefa"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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

export default AddEmployeeModal;
