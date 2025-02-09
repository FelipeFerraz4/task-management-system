import PropTypes from "prop-types";
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./styles.css";

const UserProfile = ({ user, handleUpdateProfile }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    password: "",
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmUpdate = () => {
    if (confirmText === "ALTERAR") {
      handleUpdateProfile(formData);
      setShowConfirmModal(false);
      setConfirmText("");
    }
  };

  return (
    <div className="profile-container">
      <h2>Perfil do Usuário</h2>
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
