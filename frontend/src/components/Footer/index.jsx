import { Container, Row, Col } from "react-bootstrap";
import "./styles.css";

function Footer () {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={12} className="text-center">
            <p>&copy; 2025 Blue Fox. Todos os direitos reservados.</p> {/* Copyright notice */}
            <p>Desenvolvido com ❤️ por Felipe Ferraz.</p> {/* Developer's credit */}
             {/* Links to LinkedIn and GitHub, opening in a new tab with secure attributes */}
            <p>
              <a href="https://www.linkedin.com/in/felipeferraz4/" target="_blank" rel="noopener noreferrer" className="text-white">
                LinkedIn
              </a>
              {" | "}
              <a href="https://github.com/FelipeFerraz4" target="_blank" rel="noopener noreferrer" className="text-white">
                Github
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
