import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import "./styles.css";

// FilterModal component for filtering tasks
function FilterModal({ show, handleClose, handleApplyFilter, filter, setFilter }) {
  // Handle input change for the filter fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  // Clear all filters
  const handleClear = () => {
    setFilter({
      id: "",
      title: "",
      description: "",
      status: "",
      due_date: "",
      responsible: "",
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Filtros de Pesquisa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="filterTitle" className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o título"
              name="title"
              value={filter.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="filterDescription" className="mb-3">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite a descrição"
              name="description"
              value={filter.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="filterStatus" className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={filter.status}
              onChange={handleChange}
            >
              <option value="">Todos</option>
              <option value="pending">Pendente</option>
              <option value="in-progress">Em andamento</option>
              <option value="completed">Concluído</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="filterDueDate" className="mb-3">
            <Form.Label>Data de vencimento</Form.Label>
            <Form.Control
              type="date"
              name="due_date"
              value={filter.due_date}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="filterResponsible" className="mb-3">
            <Form.Label>Responsável</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o nome do responsável"
              name="responsible"
              value={filter.responsible}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClear}>
          Limpar
        </Button>
        <Button variant="primary" onClick={() => handleApplyFilter(filter)}>
          Aplicar Filtro
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

FilterModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleApplyFilter: PropTypes.func.isRequired,
  filter: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    due_date: PropTypes.string,
    responsible: PropTypes.string,
  }).isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default FilterModal;
