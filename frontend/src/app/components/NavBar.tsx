import React from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { BellRinging, Moon } from 'tabler-icons-react';
const NavBar: React.FC = () => {
 
  return (
    <Navbar className="py-3 border-bottom bg-white">
      <Container className="d-flex align-items-center justify-content-between">
        <div style={{ width: 120 }} />

        <div className="text-center">
          <h2 className="mb-0" style={{ color: "#0057FF", fontWeight: 700 }}>
            25Watts
          </h2>
        </div>

        <div className="d-flex align-items-center gap-2" style={{ width: 120, justifyContent: "flex-end" }}>
          <Button size="sm" variant="primary" className="rounded-circle" title="Notificaciones">
            <BellRinging />
          </Button>
          <Button size="sm" variant="primary" className="rounded-pill" title="Modo">
            <Moon />
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavBar;
