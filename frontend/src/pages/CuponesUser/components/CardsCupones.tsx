import moment from "moment-timezone";
import React from "react";
import { Card, Row, Col, Button, Badge } from "react-bootstrap";

export interface Cupon {
  codigo: string;
    descripcion: string;
  valor: number;
  estado: string;
  fecha_expiracion: string;
}

interface CardsCuponesProps {
  cupones?: Cupon[];
}

const CardsCupones: React.FC<CardsCuponesProps> = ({ cupones }) => {
  if (!cupones || cupones.length === 0) {
    return <p>No hay cupones disponibles.</p>;
  }

  return (
    <Row xs={1} md={3} className="g-4">
      {cupones.map((cupon, index) => (
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
              <Button variant="primary" disabled={cupon.estado !== "0"}>
                Canjear
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CardsCupones;
