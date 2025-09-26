import React, { useState } from 'react';
import { Eye, EyeOff } from 'tabler-icons-react';
import { useForm } from 'react-hook-form';

import { Notify } from 'notiflix';
import { Container, Row, Col, Card, Form, Button, FloatingLabel } from 'react-bootstrap';
import api from '../../app/services/api';
type Props = { onClose: () => void; };
const RegistroUsuario: React.FC<Props> = ({ onClose }) => {
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [mostrarConfirm, setMostrarConfirm] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset
    } = useForm({
        defaultValues: {
            email: '',
            clave: '',
            confirmPassword: '',
        }
    });
    const togglePassword = () => setMostrarPassword(!mostrarPassword);
    const toggleConfirm = () => setMostrarConfirm(!mostrarConfirm);
    const registrarUsuario = async (data: any) => {
        if (data.clave !== data.confirmPassword) {
            setError('confirmPassword', {
                type: 'manual',
                message: 'Las contraseñas no coinciden'
            });
            return;
        }
        const passwordRegex = /^[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(data.clave)) {
            setError('clave', {
                type: 'manual',
                message: 'La contraseña debe tener al menos 8 caracteres'
            });
            return;
        }
        try {
            const response = await api.post('/api/usuarios', data);
            if (response.data.info) {
                Notify.success(response.data.msg);
                reset();
                onClose();
            }
        } catch (error: any) {
            Notify.failure(error.response?.data?.msg);
        }
    };
    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={12}>
                    <Card className="shadow">
                        <Card.Body>
                            <Card.Title className="text-center mb-4">Registro de Usuario</Card.Title>
                            <Form onSubmit={handleSubmit(registrarUsuario)}>
                                <Form.Group controlId="email" className="mb-3">
                                    <FloatingLabel label="Correo electrónico">
                                        <Form.Control
                                            type="email"
                                            placeholder="Correo electrónico"
                                            {...register('email', { required: 'Obligatorio' })}
                                            isInvalid={!!errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email?.message}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group controlId="clave" className="mb-3 position-relative">
                                    <FloatingLabel label="Contraseña">
                                        <Form.Control
                                            type={mostrarPassword ? 'text' : 'password'}
                                            placeholder="Contraseña"
                                            {...register('clave', { required: 'Obligatorio' })}
                                            isInvalid={!!errors.clave}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.clave?.message}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                    <Button
                                        variant="default"
                                        onClick={togglePassword}
                                        tabIndex={-1}
                                        className="position-absolute end-0 top-50 translate-middle-y me-2 p-0"
                                        style={{ zIndex: 5 }}
                                    >
                                        {mostrarPassword ? <Eye /> : <EyeOff />}
                                    </Button>
                                </Form.Group>
                                <Form.Group controlId="confirmPassword" className="mb-3 position-relative">
                                    <FloatingLabel label="Confirmar Contraseña">
                                        <Form.Control
                                            type={mostrarConfirm ? 'text' : 'password'}
                                            placeholder="Confirmar Contraseña"
                                            {...register('confirmPassword', { required: 'Obligatorio' })}
                                            isInvalid={!!errors.confirmPassword}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.confirmPassword?.message}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                    <Button
                                        variant="default"
                                        onClick={toggleConfirm}
                                        tabIndex={-1}
                                        className="position-absolute end-0 top-50 translate-middle-y me-2 p-0"
                                        style={{ zIndex: 5 }}
                                    >
                                        {mostrarConfirm ? <Eye /> : <EyeOff />}
                                    </Button>
                                </Form.Group>
                                <hr className="my-4" />
                                <div className="d-grid">
                                    <Button type="submit" variant="primary" size="sm">
                                        Registrarse
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
export default RegistroUsuario;
