import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import { BellRinging, Eye, EyeOff, Moon } from "tabler-icons-react";
import NavBar from "../../app/components/NavBar";
import RegistroUsuario from "./RegistroUsuario";
import api from "../../app/services/api";
import notifilix from "../../app/services/notifilix";
import { useAppDispatch } from "../../app/redux/hooks";
import { setUsuario } from "../../app/redux/slice/usuarioSlice";
import { useNavigate } from "react-router-dom";
import { Notify } from "notiflix";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [registroUsuarioOpen, setRegistroUsuarioOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/login', { email, password });
      if (response.data.info) {
        dispatch(setUsuario({
          token: response.data.data.token,
        }))
        Notify.success(response.data.msg);
        navigate('/inicio');
      } else {
        notifilix.EnviarMensaje('danger', response.data.message);
      }
    } catch (error: any) {
      notifilix.EnviarMensaje('danger', error.response.data.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="login-page d-flex flex-column min-vh-100 bg-light">
      <NavBar />
      <main className="flex-grow-1 d-flex align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={6} lg={4}>
              <Card className="shadow-sm mx-auto rounded-3" style={{ marginTop: 48 }}>
                <Card.Body className="p-4">
                  <Card.Title className="text-center fw-bold">INICIAR SESIÓN</Card.Title>
                  <p className="text-center text-muted small mb-4">Ingresá sesión escribiendo tu correo electrónico y contraseña.</p>

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label className="small text-primary">Correo electrónico</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="ejemplo@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="rounded-pill"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                      <Form.Label className="small text-primary">Contraseña</Form.Label>

                      <InputGroup>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="rounded-pill"
                        />
                        <Button
                          variant="outline-secondary"
                          onClick={() => setShowPassword((s) => !s)}
                          aria-label="Mostrar contraseña"
                          className="ms-2 rounded-pill"
                        >
                          {showPassword ? <Eye /> : <EyeOff />}
                        </Button>
                      </InputGroup>
                    </Form.Group>

                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <Form.Check
                        type="switch"
                        id="rememberSwitch"
                        label="Recuérdame"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="text-muted"
                      />

                      <a className="small" href="#" onClick={(e) => e.preventDefault()}>
                        ¿Olvidaste tu contraseña?
                      </a>
                    </div>

                    <div className="d-grid mb-3">
                      <Button type="submit" variant="outline-primary" className="rounded-pill">
                        INICIÁ SESIÓN
                      </Button>
                    </div>

                    <p className="text-center small text-muted mb-0" >
                      ¿No tenes una cuenta? <a onClick={() => setRegistroUsuarioOpen(true)}>REGISTRARME</a>
                    </p>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <Offcanvas show={registroUsuarioOpen} onHide={() => setRegistroUsuarioOpen(false)} placement="end">
          <RegistroUsuario onClose={() => setRegistroUsuarioOpen(false)} />
        </Offcanvas>
      </main>
    </div>
  );
}

export default LoginPage;