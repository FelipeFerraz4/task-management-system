import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import "./styles.css";

// DeleteModal component for confirming deletion of an item
function DeleteModal({ show, closeDeleteModal, handleDelete, formData, deleteConfirmText, setDeleteConfirmText }) {
  return (

    // Modal component from React-Bootstrap to display the delete confirmation dialog
    <Modal show={show} onHide={closeDeleteModal}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Exclusão</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        {/* The message displaying the task name and asking for confirmation */}
        <p>Tem certeza que deseja excluir {formData.title}?</p>
        <p>Digite <strong>{'"DELETAR"'}</strong> para confirmar:</p>

        {/* Text input field to type 'DELETAR' for confirmation */}
        <Form.Control
          type="text"
          value={deleteConfirmText}
          onChange={(e) => setDeleteConfirmText(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>

        {/* Cancel button that closes the modal */}
        <Button variant="secondary" onClick={closeDeleteModal}>Cancelar</Button>

        {/* Delete confirmation button, disabled unless the correct text 'DELETAR' is typed */}
        <Button variant="danger" onClick={handleDelete} disabled={deleteConfirmText !== "DELETAR"}>
          Confirmar Exclusão
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

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
