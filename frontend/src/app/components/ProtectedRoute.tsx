import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../redux/hooks'


const ProtectedRoute = () => {
  const token = useAppSelector(state => state.usuario.token)
  if (!token) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
