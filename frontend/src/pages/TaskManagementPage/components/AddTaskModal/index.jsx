import { useState, useEffect } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import PropTypes from "prop-types";

// Componente AddTaskModal para adicionar ou editar uma tarefa
function AddTaskModal({ show, handleClose, handleAddTask, task = null }) {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    status: "pending",
    due_date: "",
    responsible: ""
  });

  // Carrega os dados da tarefa ao editar
  useEffect(() => {
    if (task && task.id) {
      setFormData(task);
    } else {
      // Reseta o formulário ao abrir para nova tarefa
      setFormData({
        id: "",
        title: "",
        description: "",
        status: "pending",
        due_date: "",
        responsible: ""
      });
    }
  }, [task]);

  // Atualiza os valores conforme o usuário digita
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submete o formulário
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
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="pending">Pendente</option>
              <option value="in-progress">Em andamento</option>
              <option value="completed">Concluída</option>
            </Form.Select>
          </InputGroup>

          <InputGroup className="mb-3">
            <Form.Control
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Responsável"
              name="responsible"
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
}

AddTaskModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleAddTask: PropTypes.func.isRequired,
  task: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    due_date: PropTypes.string,
    responsible: PropTypes.string,
  }),
};

export default AddTaskModal;
