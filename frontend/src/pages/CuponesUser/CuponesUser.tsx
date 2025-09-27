import React, { useEffect, useState } from 'react';
import '@assets/css/principal.css';
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap';
import MenuLateral from '../../app/components/MenuLateral';
import NavBar from '../../app/components/NavBar';
import ScrollBox from '../../app/components/ScrollBox';
import ModalDinamico from '../../app/components/modal/ModalDinamico';
import Footer from '../../app/components/Footer';

import api from '../../app/services/api';
import FormCanje from './components/FormCanje';
import moment from 'moment-timezone';
const CuponesUser: React.FC = () => {
    const [cupones, setCupones] = useState<any[]>([]);
    const [modalCupones, setmodalCupones] = useState({ show: false, id: 0, accion: '' });
    const [reload, setReload] = useState(0);

    const handleAcciones = (_origen: string, _id: string, accion: string, _e: any) => {
        switch (accion) {
            case 'a': setmodalCupones({ show: true, id: 0, accion: 'a' }); break;
            default: break;
        }
    };
    useEffect(() => {
        const fetchCupones = async () => {
            const response = await api.get('/api/allcupones');
            setCupones(response.data.content);
        };
        fetchCupones();
    }, [reload]);

    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                <MenuLateral />
                <div className="layout-page">
                    <NavBar />
                    <div className="content-wrapper">
                        <ScrollBox reduction={0.85}>
                            <Container fluid className="p-4">
                                <Row xs={1} md={3} className="g-4">
                                    {cupones.length > 0 ? cupones.map((cupon, index) => (
                                        <Col key={index}>
                                            <Card>
                                                <Card.Body>
                                                    <Card.Title>{cupon.descripcion}</Card.Title>
                                                    <Card.Text>
                                                        Valor: ${cupon.valor}
                                                        <br />
                                                        Estado: {cupon.estado === "0" ? <Badge bg="success">Activo</Badge> : <Badge bg="danger">Inactivo</Badge>}
                                                        <br />
                                                        Expira: {moment(cupon.fecha_expiracion).format('DD/MM/YYYY')}
                                                    </Card.Text>
                                                    <Button variant="primary" disabled={cupon.estado !== "0"} onClick={(e) => handleAcciones('cuponesUser', cupon.id, 'a', e)}>
                                                        Canjear
                                                    </Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))
                                        : <Col>No hay cupones disponibles</Col>
                                    }
                                </Row>
                            </Container>
                        </ScrollBox>
                        <Footer />
                    </div>
                </div>
            </div>
            <ModalDinamico id='modalCupones' manejador={modalCupones} modalTitulo="Cupones" sizeModal="xl" handleClose={() => { setmodalCupones({ show: false, id: 0, accion: '' }) }}>
                <FormCanje accion={modalCupones.accion} id={modalCupones.id} onClose={() => setmodalCupones({ show: false, id: 0, accion: '' })} setReload={setReload} />
            </ModalDinamico>
        </div>
    )
};
export default CuponesUser;
