import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from 'prop-types';
import "./styles.css";

// FilterModal component for filtering data (tasks)
function FilterModal({ show, handleClose, handleApplyFilter, filter, setFilter }) {

  // Handle input change for the filter fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  // Clear all filters by resetting the filter state to its initial values
  const handleClear = () => {
    setFilter({
    "id": "",
    "title": "",
    "description": "",
    "status": "",
    "due_date": "",
    "responsible": ""
  });
  };

  return (

    // Modal component from React-Bootstrap to display the filter options
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Filtros de Pesquisa</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        {/* Form to filter tasks by various criteria */}
        <Form>
          <Form.Group controlId="filterTitle">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o título"
              name="title"
              value={filter.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="filterDescription">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o descrição"
              name="description"
              value={filter.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="filterStatus">
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

          <Form.Group controlId="filterDueDate">
            <Form.Label>Data de vencimento</Form.Label>
            <Form.Control
              type="date"
              placeholder="Digite o Data de vencimento"
              name="due_date"
              value={filter.due_date}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="filterResponsible">
            <Form.Label>Responsável</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o Responsável"
              name="responsible"
              value={filter.responsible}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>

        {/* Button to clear the filters */}
        <Button variant="secondary" onClick={handleClear}>Limpar</Button>

        {/* Button to apply the filters */}
        <Button variant="primary" onClick={() => handleApplyFilter(filter)}>
          Aplicar Filtro
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

FilterModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleApplyFilter: PropTypes.func.isRequired,
  filter: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    due_date: PropTypes.string.isRequired,
    responsible: PropTypes.string.isRequired,
  }).isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default FilterModal;
