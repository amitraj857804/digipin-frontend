import { useState } from 'react'
import './App.css'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectToken } from './store/authSlice'
import Navbar from './component/Navbar'
import Home from './component/pages/Home'
import AuthModal from './component/auth/AuthModal'
import RootRoute from './component/RootRoute'
import PrivateRoute from './component/PrivateRoute'
import Dashboard from './component/pages/Dashborad'
import UserProfile from './component/UserProfile'

function App() {
  const [authModal, setAuthModal] = useState({
    isOpen: false,
    initialTab: "login"
  });
  const token = useSelector(selectToken);

  const openLoginModal = () => {
    setAuthModal({ isOpen: true, initialTab: "login" });
  };

  const openSignupModal = () => {
    setAuthModal({ isOpen: true, initialTab: "signup" });
  };

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, initialTab: "login" });
  };

  return (
    <>
    <BrowserRouter>
    <Navbar 
      onOpenLoginModal={openLoginModal}
      onOpenSignupModal={openSignupModal}
      onCloseAuthModal={closeAuthModal}
     
    />
    <Routes>
      {/* Root route - shows Landing if not authenticated, Home if authenticated */}
      <Route 
        path="/" 
        element={<RootRoute onOpenLoginModal={openLoginModal} onOpenSignupModal={openSignupModal} />}
      />
      
      {/* Private route - only accessible if authenticated */}
      <Route 
        path="/home" 
        element={
          <PrivateRoute>
            <Home onOpenLoginModal={openLoginModal} onOpenSignupModal={openSignupModal} />
          </PrivateRoute>
        }
      />
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <Dashboard onOpenLoginModal={openLoginModal} onOpenSignupModal={openSignupModal} />
          </PrivateRoute>
        }
      />
      <Route 
        path="/profile" 
        element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        }
      />
    </Routes>
    <AuthModal 
      isOpen={authModal.isOpen} 
      onClose={closeAuthModal}
      initialTab={authModal.initialTab}
    />
    </BrowserRouter>
     <Toaster/>
    </>
  )
}

export default App
