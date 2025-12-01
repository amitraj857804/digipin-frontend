import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectToken } from '../store/authSlice'
import Landing from './pages/Landing'
import Home from './pages/Home'

function RootRoute({ onOpenLoginModal, onOpenSignupModal }) {
  const token = useSelector(selectToken)
  
  // If user is authenticated, show Home page
  // If not, show Landing page
  if (token) {
    return <Home  onOpenLoginModal={onOpenLoginModal} onOpenSignupModal={onOpenSignupModal} />
  }
  
  return <Landing onOpenLoginModal={onOpenLoginModal} onOpenSignupModal={onOpenSignupModal} />
}

export default RootRoute
