import { useForm } from "react-hook-form";
import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../../../app/services/api";

interface FormCanjeProps {
    accion: string; // 'a' para alta, 'm' para modificar, 'c' para visualizar (consulta)
    id?: number; // ID del registro a modificar o consultar
    onClose: () => void; // Callback para manejar éxito después de la operación
    formDisabled?: boolean; // Deshabilitar formulario
    setReload?: (value: any) => void;
}
const canjeCupon = z.object({
    codigo: z.string().min(1, "Obligatorio"),
})

const FormCanje: React.FC<FormCanjeProps> = ({ onClose, setReload }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            codigo: ''
        },
        resolver: zodResolver(canjeCupon)
    });
    const onSubmit = async (data: any) => {
        setReload && setReload((prev: number) => prev + 1);
        try {
            const response = await api.post('/api/canjear-cupon', data);
            if (response.data.info) {
                onClose();
            }
        } catch (error) {

        }
    }
    return (
        <>
            <Container>
                <Row className="mb-3">
                    <Col>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                             <Form.Group className="mt-3">
                                    <FloatingLabel controlId="floatingSelect" label="Código" className="mb-3">
                                        <Form.Control type="text" placeholder="" {...register("codigo")} isInvalid={!!errors.codigo} />
                                        <Form.Control.Feedback type="invalid">{errors.codigo?.message}</Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                            <Button variant="primary" type="submit" className="me-2">
                                Canjear Cupón
                            </Button>
                            <Button variant="secondary" onClick={onClose}>
                                Cancelar
                            </Button>
                        </Form>
                    </Col>
                </Row>

            </Container>
        </>
    );
}
export default FormCanje;