import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import userService from "../../../../services/userService";
import "./styles.css";

function UserProfile({ user }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [error, setError] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user]);

  const handleSubmit = () => {
    setError("");
    setShowConfirmModal(true);
  };

  const handleConfirmUpdate = async () => {
    if (confirmText !== "ALTERAR") return;

    const hasName = name.trim().length > 0;
    const hasEmail = email.trim().length > 0;
    const hasPassword = password.trim().length > 0;
    const hasConfirm = passwordConfirm.trim().length > 0;

    if (hasPassword || hasConfirm) {
      if (!hasPassword || !hasConfirm) {
        setError("Preencha os dois campos de senha para alterá-la.");
        return;
      }
      if (password !== passwordConfirm) {
        setError("As senhas não coincidem.");
        return;
      }
    }

    const payload = {};
    if (hasName) payload.name = name;
    if (hasEmail) payload.email = email;
    if (hasPassword) {
      payload.password = password;
      payload.confirmPassword = passwordConfirm;
    }

    try {
      await userService.updateMe(payload);
      setShowConfirmModal(false);
      setConfirmText("");
      setError("");
      setIsEditing(false);
      window.location.reload();
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err);
      setError("Erro ao atualizar perfil. Tente novamente.");
    }
  };

  return (
    <div className="profile-container">
      <h2>Perfil do Usuário</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {!isEditing ? (
        <>
          <p><strong>Nome:</strong> {name.toUpperCase()}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Cargo:</strong> {user.role.toUpperCase()}</p>
          <Button onClick={() => setIsEditing(true)} variant="secondary">
            Editar
          </Button>
        </>
      ) : (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nova Senha</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Deixe em branco para não alterar"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirmar Nova Senha</Form.Label>
            <Form.Control
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="Repita a nova senha"
            />
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Atualizar Perfil
            </Button>
          </div>
        </Form>
      )}

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Alteração</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Digite <strong>ALTERAR</strong> para confirmar a atualização:</p>
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
          <Button
            variant="primary"
            onClick={handleConfirmUpdate}
            disabled={confirmText !== "ALTERAR"}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserProfile;
