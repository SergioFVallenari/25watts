import z from "zod";
import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Button, Form, Container, Row, Col, ButtonGroup } from 'react-bootstrap';
import notifilix from "../../../app/services/notifilix";
import api from "../../../app/services/api";
import type { FormData, FormProps } from "./interfaces";
import moment from "moment-timezone";
const getSchema = (accion: string) =>
    accion === 'a'
        ? z
            .object({
                codigo: z.string().min(1, "Obligatorio"),
                descripcion: z.string().min(1, "Obligatorio"),
                valor: z.string().min(1, "Obligatorio"),
                fecha_expiracion: z.string().min(1, "Obligatorio")
                .refine((date)=>{
                    if(date <= moment().format('YYYY-MM-DD')){
                        return false
                    }
                    return true
                },{message: "La fecha debe ser mayor a la actual"}),
                estado: z.string().min(1, "Obligatorio"),
            })
        : z.object({
            codigo: z.string().min(1, "Obligatorio"),
            descripcion: z.string().min(1, "Obligatorio"),
            valor: z.string().min(1, "Obligatorio"),
            fecha_expiracion: z.string().min(1, "Obligatorio"),
            estado: z.string().min(1, "Obligatorio"),
        });

const FormCupones: React.FC<FormProps> = ({ accion, id, onClose, formDisabled, setRecargaGrid }) => {
    const schema = getSchema(accion);
    const { register, handleSubmit, formState: { errors },  reset } = useForm<FormData>({
        defaultValues: {
            codigo: '',
            descripcion: '',
            valor: '',
            fecha_expiracion: moment().add(1, 'day').format('YYYY-MM-DD'),
            estado: '',
        },
        resolver: zodResolver(schema)
    });
    const onSubmit = async (data: any) => {
        try {
            switch (accion) {
                case 'a': await altaRegistro(data); break;
                case 'm': await updateRegistro(data); break;
                case 'b':
                    await api.delete(`/usuarios/${id}`);
                    notifilix.EnviarMensaje('success', 'Registro eliminado exitosamente');
                    setRecargaGrid(Date.now().toString());
                    onClose();
                    break;
                default:
                    throw new Error('Acción no válida');
            }
        } catch (error) {}
    }
    const altaRegistro = async (data: any) => {
        try {
            const response = await api.post('/api/cupones', data);
            if (response.data.info) {
                notifilix.EnviarMensaje('success', response.data.msg);
                setRecargaGrid(Date.now().toString());
                onClose();
            } else {
                notifilix.EnviarMensaje('danger', response.data.msg);
            }
        } catch (error: any) {
            notifilix.EnviarMensaje('danger', error.response?.data?.msg || 'Error al crear el registro');
        }
    }
    const updateRegistro = async (data: any) => {
        try {
            const formatBody = {
                ...data,
            }
            const response = await api.put(`/api/cupones/${id}`, formatBody);
            if (response.data.info) {
                notifilix.EnviarMensaje('success', response.data.msg);
                setRecargaGrid(Date.now().toString());
                onClose();
            } else {
                notifilix.EnviarMensaje('danger', response.data.msg);
            }
        } catch (error: any) {
            notifilix.EnviarMensaje('danger', error.response?.data?.msg || 'Error al actualizar el registro');
        }
    }
    const consultaRegistro = async () => {
        try {
            const response = await api.get(`/api/cupones/${id}`);
            if (response.data.info) {
                const registro = response.data.content[0];
                reset({
                    codigo: registro.codigo,
                    descripcion: registro.descripcion,
                    valor: registro.valor,
                    fecha_expiracion: moment(registro.fecha_expiracion).format('YYYY-MM-DD'),
                    estado: registro.estado,
                })
            } else {
                notifilix.EnviarMensaje('danger', response.data.msg);
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        if ((accion === 'c' || accion === 'm') && id) {
            consultaRegistro();
        }
    }, [])

    return (
        <>{
            accion !== 'b' ?
                <Container>
                    <Row>
                        <Col xs={12} md={6} className="mx-auto">
                            <Form onSubmit={handleSubmit(onSubmit)} id="formUsuarios">
                                <Form.Group className="mt-3">
                                    <FloatingLabel controlId="floatingSelect" label="Código" className="mb-3">
                                        <Form.Control type="text" placeholder="" {...register("codigo")} isInvalid={!!errors.codigo}/>
                                        <Form.Control.Feedback type="invalid">{errors.codigo?.message}</Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <FloatingLabel controlId="floatingValue" label="Descripción" className="mb-3">
                                        <Form.Control type="text" placeholder="" {...register("descripcion")} isInvalid={!!errors.descripcion}/>
                                        <Form.Control.Feedback type="invalid">{errors.descripcion?.message}</Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <FloatingLabel controlId="floatingIdValue" label="Valor" className="mb-3">
                                        <Form.Control type="text" placeholder="" {...register("valor")} isInvalid={!!errors.valor}/>
                                        <Form.Control.Feedback type="invalid">{errors.valor?.message}</Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <FloatingLabel controlId="floatingOrden" label="Fecha" className="mb-3">
                                        <Form.Control type="date" placeholder="" {...register("fecha_expiracion")} isInvalid={!!errors.fecha_expiracion}/>
                                        <Form.Control.Feedback type="invalid">{errors.fecha_expiracion?.message}</Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <FloatingLabel controlId="floatingEstado" label="Estado" className="mb-3">
                                        <Form.Select aria-label="Seleccionar estado" {...register("estado")} isInvalid={!!errors.estado}>
                                            <option value="">Seleccione...</option>
                                            <option value="0">Activo</option>
                                            <option value="1">Inactivo</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">{errors.estado?.message}</Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <hr></hr>
                    <Row>
                        <Button className="w-100" size="sm" variant="primary" type="submit" disabled={formDisabled} form="formUsuarios">
                            {accion === 'a' ? 'Agregar' : accion === 'm' ? 'Modificar' : 'Consultar'}
                        </Button>
                    </Row>
                </Container> 
                : 
                <Container>
                    <Row>
                        <Col xs={12} md={12} className="mx-auto text-center">
                            <Form className="mt-3">
                                <h5>¿Está seguro que desea eliminar este registro?</h5>
                                <hr></hr>
                                <ButtonGroup size="sm" className="w-100">
                                    <Button variant="secondary" type="button" onClick={() => onClose()}>
                                        Cancelar
                                    </Button>
                                    <Button variant="danger" type='button' onClick={async () => await onSubmit({})}>
                                        Eliminar
                                    </Button>
                                </ButtonGroup>
                            </Form>
                        </Col>
                    </Row>
                </Container>
        }
        </>
    )
}

export default FormCupones;
