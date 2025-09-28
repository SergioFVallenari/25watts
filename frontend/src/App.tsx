// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import NotFound from './pages/notFound'
import { useEffect } from 'react'
import config from './app/services/config'
import ProtectedRoute from './app/components/ProtectedRoute'
import Cupones from './pages/Cupones/Cupones'
import CuponesUser from './pages/CuponesUser/CuponesUser'
import { useAppSelector } from './app/redux/hooks'

function App() {
  const datosUsuario:any = useAppSelector((state) => state.usuario.user);
  useEffect(() => {
    document.title = config.nombrePlataforma;
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/cupones" element={ datosUsuario?.tipo==0 ? <Cupones /> : <NotFound />} />
          <Route path="/cuponesUser" element={datosUsuario?.tipo==1 ? <CuponesUser /> : <NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}
export default App
