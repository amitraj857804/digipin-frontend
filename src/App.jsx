import { useState } from "react";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "./store/authSlice";
import {
  Navbar,
  Home,
  About,
  Contact,
  AuthModal,
  RootRoute,
  PrivateRoute,
  Dashboard,
  UserProfile,
  User_AIU,
  AIU_Resolve,
  AIU_Feedback,
  AAVA_Verification,
} from "./utils/app";

function App() {
  const [authModal, setAuthModal] = useState({
    isOpen: false,
    initialTab: "login",
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
          <Route path="/user_aiu" element={<User_AIU />} />
          <Route path="/resolve_consent" element={<AIU_Resolve />} />
          <Route path="/feedback" element={<AIU_Feedback />} />
          <Route path="/verify-aava" element={<AAVA_Verification />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/"
            element={
              <RootRoute
                onOpenLoginModal={openLoginModal}
                onOpenSignupModal={openSignupModal}
              />
            }
          />

          {/* Private route - only accessible if authenticated */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home
                  onOpenLoginModal={openLoginModal}
                  onOpenSignupModal={openSignupModal}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard
                  onOpenLoginModal={openLoginModal}
                  onOpenSignupModal={openSignupModal}
                />
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
      <Toaster />
    </>
  );
}

export default App;
