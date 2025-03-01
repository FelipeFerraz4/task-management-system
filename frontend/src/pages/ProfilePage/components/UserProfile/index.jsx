import PropTypes from "prop-types";
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./styles.css";

function UserProfile ({ user, handleUpdateProfile }) {

  // State to manage form data, initialized with user details
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    password: "",
  });

   // State to control the confirmation modal visibility
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // State to store confirmation text input
  const [confirmText, setConfirmText] = useState("");

  // Handles input changes and updates the formData state dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Triggers when the "Update Profile" button is clicked, showing the confirmation modal
  const handleSubmit = () => {
    setShowConfirmModal(true);
  };

  // Handles the final confirmation of profile update
  const handleConfirmUpdate = () => {
    if (confirmText === "ALTERAR") {
      handleUpdateProfile(formData);
      setShowConfirmModal(false);
      setConfirmText("");
    }
  };

  return (
    <div className="profile-container">
      {/* title of Form */}
      <h2>Perfil do Usuário</h2>

      {/* Profile Form */}
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Nova Senha</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Deixe em branco para não alterar"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cargo (imutável)</Form.Label>
          <Form.Control
            type="text"
            name="Cargo"
            value={formData.role}
            readOnly={true}
          />
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button variant="primary" onClick={handleSubmit}>
            Atualizar Perfil
          </Button>
        </div>
      </Form>

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Alteração</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Digite <strong>{"ALTERAR"}</strong> para confirmar a atualização:</p>
          <Form.Control
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancelar
          </Button>

          {/* Confirm Button (Disabled until user types "ALTERAR") */}
          <Button variant="primary" onClick={handleConfirmUpdate} disabled={confirmText !== "ALTERAR"}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

UserProfile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  handleUpdateProfile: PropTypes.func.isRequired,
};

export default UserProfile;
