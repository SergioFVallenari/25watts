// src/components/NotFound.tsx
import React from 'react'
import { Link } from 'react-router-dom'
const NotFound: React.FC = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center p-4">
      <h1 className="display-1 fw-bold text-primary">404</h1>
      <h2 className="mb-3">Página no encontrada</h2>
      <p className="mb-4 text-muted">
        Lo sentimos, la página que estás buscando no existe o fue movida.
      </p>
      <Link to="/" className="btn btn-primary">
        Volver al inicio
      </Link>
    </div>
  )
}
export default NotFound
