import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectToken } from '../store/authSlice'

function PrivateRoute({ children }) {
  const token = useSelector(selectToken)
  
  if (!token) {
    return <Navigate to="/" replace />
  }
  
  return children
}

export default PrivateRoute
