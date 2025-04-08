import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import "./styles.css";
import userService from "../../../../services/userService";
import { useState } from "react";

function DeleteUserModal({ show, setShowDeleteModal, formData, employees, setEmployees }) {
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteConfirmText("");
  };

  const handleDelete = async () => {
    try {
      await userService.deleteUser(formData._id);
      setEmployees(employees.filter((user) => user._id !== formData._id));
      closeDeleteModal();
    } catch (error) {
      console.error("Erro ao excluir usuário:", error.response?.data || error.message);
      alert("Erro ao excluir o usuário. Tente novamente.");
    }
  };

  return (
    <Modal show={show} onHide={closeDeleteModal}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Exclusão</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Tem certeza que deseja excluir o usuário <strong>{formData.name}</strong>?</p>
        <p>Digite <strong>DELETAR</strong> para confirmar:</p>
        <Form.Control
          type="text"
          value={deleteConfirmText}
          onChange={(e) => setDeleteConfirmText(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeDeleteModal}>Cancelar</Button>
        <Button variant="danger" onClick={handleDelete} disabled={deleteConfirmText !== "DELETAR"}>
          Confirmar Exclusão
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

DeleteUserModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShowDeleteModal: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  employees: PropTypes.array.isRequired,
  setEmployees: PropTypes.func.isRequired,
};

export default DeleteUserModal;
