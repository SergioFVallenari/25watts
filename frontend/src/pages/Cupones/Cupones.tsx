import React, { useState } from 'react';
import '@assets/css/principal.css';
import { Container } from 'react-bootstrap';
import FormCupones from './components/FormCupones';
import MenuLateral from '../../app/components/MenuLateral';
import NavBar from '../../app/components/NavBar';
import ScrollBox from '../../app/components/ScrollBox';
import ModalDinamico from '../../app/components/modal/ModalDinamico';
import Footer from '../../app/components/Footer';
import ResponsiveExample from '../../app/components/Grid/Grid2';
import { resuelve_tabla_by_tipo } from '../../app/components/Grid/utils';
const Cupones: React.FC = () => {
  const [formDisabled, setFormDisabled] = useState(false);
  const [modalCupones, setmodalCupones] = useState({show: false,id: 0,accion: ''});
  const [reloadGrid, setReloadGrid] = useState(0);
  const handleAcciones = (_origen: string, id: string, accion: string, _e: any) => {
    switch (accion) {
      case 'a': setmodalCupones({ show: true, id: 0, accion: 'a' }); break;
      case 'm': setmodalCupones({ show: true, id: Number(id), accion: 'm' }); break;
      case 'c': setmodalCupones({ show: true, id: Number(id), accion: 'c' }); setFormDisabled(true); break;
      case 'b': setmodalCupones({ show: true, id: Number(id), accion: 'b' }); break;
      default: break;
    }
  };

  const rawColumnsData = resuelve_tabla_by_tipo('cupones');

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <MenuLateral />
        <div className="layout-page">
          <NavBar />
          <div className="content-wrapper">
            <ScrollBox reduction={0.85}>
              <Container fluid className="p-4">
                  <ResponsiveExample
                    columns={rawColumnsData}
                    manejo_acciones={handleAcciones}
                    reloadTrigger={reloadGrid} 
                  />
              </Container>
            </ScrollBox>
            <Footer />
          </div>
        </div>
      </div>
      <ModalDinamico id='modalCupones' manejador={modalCupones} modalTitulo="Cupones" sizeModal="xl" handleClose={() => { setmodalCupones({ show: false, id: 0, accion: '' }), setFormDisabled(false) }}>
        <FormCupones accion={modalCupones.accion} id={modalCupones.id} onClose={() => setmodalCupones({ show: false, id: 0, accion: '' })} formDisabled={formDisabled} setReloadGrid={setReloadGrid} />
      </ModalDinamico>
    </div>
  )
};
export default Cupones;
