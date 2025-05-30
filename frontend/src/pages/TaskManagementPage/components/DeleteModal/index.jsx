import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import "./styles.css";

// Componente DeleteModal para confirmar exclusão de um item
function DeleteModal({ show, closeDeleteModal, handleDelete, formData, deleteConfirmText, setDeleteConfirmText }) {
  return (
    <Modal show={show} onHide={closeDeleteModal}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Exclusão</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Tem certeza que deseja excluir <strong>{formData.title}</strong>?</p>
        <p>
          Digite <strong>DELETAR</strong> para confirmar:
        </p>

        <Form.Group controlId="deleteConfirmationInput">
          <Form.Control
            type="text"
            placeholder="Digite DELETAR"
            value={deleteConfirmText}
            onChange={(e) => setDeleteConfirmText(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeDeleteModal}>
          Cancelar
        </Button>
        <Button
          variant="danger"
          onClick={handleDelete}
          disabled={deleteConfirmText !== "DELETAR"}
        >
          Confirmar Exclusão
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

DeleteModal.propTypes = {
  show: PropTypes.bool.isRequired,
  closeDeleteModal: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  deleteConfirmText: PropTypes.string.isRequired,
  setDeleteConfirmText: PropTypes.func.isRequired,
};

export default DeleteModal;
