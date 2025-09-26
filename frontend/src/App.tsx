// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import Principal from './pages/Principal'
import NotFound from './pages/notFound'
import { useEffect } from 'react'
import config from './app/services/config'
import ProtectedRoute from './app/components/ProtectedRoute'
import Cupones from './pages/Cupones/Cupones'

function App() {
  useEffect(() => {
    document.title = config.nombrePlataforma;
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/inicio" element={<Principal />} />
          <Route path="/cupones" element={<Cupones />} />
        </Route>
      </Routes>
    </Router>
  )
}
export default App
