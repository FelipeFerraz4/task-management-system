import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from 'prop-types';
import "./styles.css";

const FilterModal = ({ show, handleClose, handleApplyFilter, filter, setFilter }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setFilter({ name: "", email: "", role: "" });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Filtros de Pesquisa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="filterName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o nome"
              name="name"
              value={filter.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="filterEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite o email"
              name="email"
              value={filter.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="filterRole">
            <Form.Label>Cargo</Form.Label>
            <Form.Select
                name="role"
                value={filter.role}
                onChange={handleChange}
            >
                <option value="">Todos</option>
                <option value="employee">Funcionário</option>
                <option value="manager">Gerente</option>
                <option value="admin">Administrador</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClear}>Limpar</Button>
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
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default FilterModal;
