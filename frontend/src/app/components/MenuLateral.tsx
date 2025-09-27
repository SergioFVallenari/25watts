import React from 'react';
import { Logout, Menu2 } from 'tabler-icons-react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import config from '../services/config';
import { useDispatch } from 'react-redux';
import { clearUsuario } from '../redux/slice/usuarioSlice';
import { ConfirmModal } from '../services/notifilix';
import { useAppSelector } from '../redux/hooks';
import AdminPanel from './AdminPanel';
import UserPanel from './UserPanel';

const MenuLateral: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [toggled, setToggled] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const datosUsuario: any = useAppSelector((state) => state.usuario.user);
  const logout = () => {
    ConfirmModal('Cerrar Sesión', '¿Estas seguro que deseas cerrar la sesión?', async () => {
      dispatch(clearUsuario());
      navigate('/');
    });
  };
  return (
    <>
      {!toggled && (
        <Button variant="dark" size="sm" onClick={() => { setToggled(!toggled), setCollapsed(false) }} className="d-md-none button-menu-mobile">
          <Menu2 />
        </Button>
      )}
      <div className="sidebar-mobile">
        <Sidebar collapsed={collapsed}
          toggled={toggled}
          className='shadow z-menu back-white'
          onBackdropClick={() => setToggled(false)}
          breakPoint="md"
          transitionDuration={500}
          backgroundColor="#0038D1"
          rootStyles={{
            color: 'white',
          }}
        >
          <Navbar className="mb-3">
            <Container>
              <Navbar.Brand className="w-100">
                <div className="d-flex justify-content-between align-items-center">
                  {!collapsed && <h2 className='text-white'>{config.nombrePlataforma}</h2>}
                  <Button variant="dark" size="sm" onClick={() => {
                    setCollapsed(!collapsed)
                    setToggled(false)
                  }}>
                    <Menu2 />
                  </Button>
                </div>
              </Navbar.Brand>
            </Container>
          </Navbar>
          <Menu className='ps-sidebar-container'>
            {
              datosUsuario.tipo == '0' ?
                <AdminPanel collapsed={collapsed} />
                :
                <UserPanel collapsed={collapsed} />
            }
            <MenuItem onClick={logout}>
              <Logout /> {!collapsed && <span>Cerrar Sesión</span>}
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
};
export default MenuLateral;
