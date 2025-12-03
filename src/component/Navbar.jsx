import { Link, NavLink, useNavigate } from "react-router-dom";
import { MenuIcon, XIcon, MapPin, Shield, Clock, Users, User, Settings, LogOut, Search, MessageSquare, ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  selectUsername,
  selectToken,
  selectUserLoading,
  selectUserEmail,
  clearToken,
  clearUserName,
  fetchUserDetails,
} from "../store/authSlice";

function Navbar({ onOpenLoginModal, onOpenSignupModal, onCloseAuthModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);
  const [showAIUDropdown, setShowAIUDropdown] = useState(false);
  const desktopDropdownRef = useRef(null);
  const aiuDropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector(selectUsername);
  const userEmail = useSelector(selectUserEmail);
  const token = useSelector(selectToken);
  const userLoading = useSelector(selectUserLoading);

  useEffect(() => {
    if (token && !username) {
      dispatch(fetchUserDetails())
      
        .catch((error) => {
          // Only clear token for authentication errors (401)
          if (error.includes && error.includes("Authentication expired")) {
            dispatch(clearToken());
            toast.error("Session expired. Please login again.");
          } else {
            // Log other errors but don't log out the user
            console.error("Failed to fetch username:", error);
          }
        });
    }
  }, [token, username, dispatch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close if clicking outside BOTH desktop AND mobile refs
      const isOutsideDesktop =
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(event.target);
      const isOutsideMobile =
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(event.target);
      const isOutsideAIU =
        aiuDropdownRef.current &&
        !aiuDropdownRef.current.contains(event.target);

      // Only close if it's outside the active dropdown
      if (isOutsideDesktop && isOutsideMobile) {
        setShowLogoutDropdown(false);
      }
      if (isOutsideAIU) {
        setShowAIUDropdown(false);
      }
    };

    if (showLogoutDropdown || showAIUDropdown) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showLogoutDropdown, showAIUDropdown]);

  // Close mobile menu when clicking anywhere or screen resizes
  useEffect(() => {
    const handleClickAnywhere = () => {
      setIsOpen(false);
    };

    const handleResize = () => {
      // Close menu when resizing to desktop (lg breakpoint is 1024px)
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickAnywhere);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("click", handleClickAnywhere);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  const loginHandler = () => {
    navigate("/login");
  };

  const logoutHandler = () => {
    dispatch(clearToken());
    dispatch(clearUserName());
    setShowLogoutDropdown(false);
    toast.success("Logged out successfully!");
    navigate("/");
  };

  // Close dropdown when user logs in
  useEffect(() => {
    if (token) {
      setShowLogoutDropdown(false);
    }
  }, [token]);

  return (
    <div className="fixed top-0 left-0 z-[9979] w-full bg-gradient-to-r from-white via-blue-50 to-indigo-50 border-b border-blue-200 shadow-sm">
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-12 py-4">
        {/* Logo Section */}
        <Link
          to={`${token ? "home" : "/"}`}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg shadow-lg group-hover:shadow-xl transition-shadow">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-bold btn2color px-0 py-0 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:via-indigo-700 group-hover:to-blue-800 transition-all">
              eSthan
            </span>
            <span className="text-xs text-gray-600 font-medium">
              Digital Address
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div
          className={`absolute lg:static top-16 left-0 right-0 lg:top-auto lg:left-auto lg:right-auto
            bg-white lg:bg-transparent lg:flex gap-1 lg:gap-2 flex-col lg:flex-row
            ${isOpen ? "flex" : "hidden"} lg:flex
            px-4 lg:px-0 py-4 lg:py-0 shadow-lg lg:shadow-none
            rounded-lg lg:rounded-none mt-2 lg:mt-0 border lg:border-none border-emerald-100
            transition-all duration-300 z-40`}
          onClick={(e) => e.stopPropagation()}
        >
          <NavLink
            to="/home"
            onClick={() => {
              setIsOpen(false);
              onCloseAuthModal();
            }}
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition-all flex items-center gap-2 font-medium ${
                isActive
                  ? " btn1color text-white shadow-md"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`
            }
          >
            <span className="hidden lg:inline">🏠</span> Home
          </NavLink>

          <NavLink
            to="/dashboard"
            onClick={() => {
              setIsOpen(false);
              onCloseAuthModal();
            }}
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition-all flex items-center gap-2 font-medium ${
                isActive
                  ? " btn1color  text-white shadow-md"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`
            }
          >
            <Shield className="w-4 h-4" /> Dashboard
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => {
              setIsOpen(false);
              onCloseAuthModal();
            }}
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition-all flex items-center gap-2 font-medium ${
                isActive
                  ? " btn1color text-white shadow-md"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`
            }
          >
            <Users className="w-4 h-4" /> About
          </NavLink>

          <NavLink
            to="/contact"
            onClick={() => {
              setIsOpen(false);
              onCloseAuthModal();
            }}
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition-all flex items-center gap-2 font-medium ${
                isActive
                  ? " btn1color text-white shadow-md"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`
            }
          >
            <Clock className="w-4 h-4" /> Contact
          </NavLink>

          {/* AIU Dropdown - Desktop */}
          <div className="relative hidden lg:block" ref={aiuDropdownRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowAIUDropdown(!showAIUDropdown);
              }}
              className="px-4 py-2 rounded-lg cursor-pointer transition-all flex items-center gap-2 font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <MapPin className="w-4 h-4" /> AIU Services
              <ChevronDown className={`w-4 h-4 transition-transform ${showAIUDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showAIUDropdown && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-blue-100 overflow-hidden z-50">
                <div className="px-2 py-2 space-y-1">
                  <Link
                    to="/user_aiu"
                    onClick={() => {
                      setShowAIUDropdown(false);
                      onCloseAuthModal();
                    }}
                    className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
                  >
                    <MapPin className="w-5 h-5" />
                    <div>
                      <p className="font-semibold text-sm">Store Address</p>
                      <p className="text-xs text-gray-500">Add digital address</p>
                    </div>
                  </Link>
                  <Link
                    to="/resolve_consent"
                    onClick={() => {
                      setShowAIUDropdown(false);
                      onCloseAuthModal();
                    }}
                    className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
                  >
                    <Search className="w-5 h-5" />
                    <div>
                      <p className="font-semibold text-sm">Resolve Address</p>
                      <p className="text-xs text-gray-500">Access with consent</p>
                    </div>
                  </Link>
                  <Link
                    to="/feedback"
                    onClick={() => {
                      setShowAIUDropdown(false);
                      onCloseAuthModal();
                    }}
                    className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <div>
                      <p className="font-semibold text-sm">Submit Feedback</p>
                      <p className="text-xs text-gray-500">Service feedback</p>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* AIU Mobile Links */}
          <div className="lg:hidden space-y-1">
            <NavLink
              to="/user_aiu"
              onClick={() => {
                setIsOpen(false);
                onCloseAuthModal();
              }}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition-all flex items-center gap-2 font-medium ${
                  isActive
                    ? " btn1color text-white shadow-md"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`
              }
            >
              <MapPin className="w-4 h-4" /> Store Address
            </NavLink>
            <NavLink
              to="/resolve_consent"
              onClick={() => {
                setIsOpen(false);
                onCloseAuthModal();
              }}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition-all flex items-center gap-2 font-medium ${
                  isActive
                    ? " btn1color text-white shadow-md"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`
              }
            >
              <Search className="w-4 h-4" /> Resolve Address
            </NavLink>
            <NavLink
              to="/feedback"
              onClick={() => {
                setIsOpen(false);
                onCloseAuthModal();
              }}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition-all flex items-center gap-2 font-medium ${
                  isActive
                    ? " btn1color text-white shadow-md"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`
              }
            >
              <MessageSquare className="w-4 h-4" /> Submit Feedback
            </NavLink>
          </div>

          <XIcon
            className="lg:hidden absolute top-4 right-4 w-6 h-6 cursor-pointer text-gray-700"
            onClick={() => setIsOpen(false)}
          />
        </div>

        {/* Right Section - Auth & User Menu */}
        <div className="hidden lg:flex items-center gap-4 ">
          {!token ? (
            <>
              <button
                onClick={onOpenLoginModal}
                className="px-6 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg cursor-pointer transition-all hover:scale-105"
              >
                Login
              </button>
              <button
                onClick={onOpenSignupModal}
                className="px-6 py-2 btn2color font-semibold cursor-pointer rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                Sign Up
              </button>
            </>
          ) : userLoading ? (
            <span className="text-sm animate-pulse">Loading user...</span>
          ) : (
            <div className="relative " ref={desktopDropdownRef}>
              <button
                onClick={() => setShowLogoutDropdown(!showLogoutDropdown)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg cursor-pointer hover:bg-blue-200 transition-all font-medium"
              >
                <span className="w-8 h-8 btn1color  rounded-full flex items-center justify-center text-sm font-bold">
                  {username?.charAt(0)?.toUpperCase() || ""}
                </span>
                {username}
              </button>

              {showLogoutDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-blue-100 overflow-hidden z-50">
                  {/* Profile Header */}
                  <div className="  btn1color">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-lg font-bold">
                        {username?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-white truncate">{username}</p>
                        <p className="text-blue-100 text-xs truncate">{userEmail || "user@example.com"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="px-2 py-2 space-y-1">
                    <Link
                      to="/profile"
                      onClick={() => setShowLogoutDropdown(false)}
                      className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
                    >
                      <User className="w-5 h-5" />
                      View Profile
                    </Link>
                   
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-100"></div>

                  {/* Logout */}
                  <div className="px-2 py-2">
                  <button
                    onClick={logoutHandler}
                    className="w-full flex cursor-pointer items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 font-semibold  rounded-lg transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Auth Buttons */}
        <div className="lg:hidden flex items-center gap-2 -mr-10">
          {!token ? (
            <>
              <button
                onClick={onOpenLoginModal}
                className="px-3 py-1.5 text-blue-600 font-semibold text-sm hover:bg-blue-50 rounded transition-all"
              >
                Login
              </button>
              <button
                onClick={onOpenSignupModal}
                className="px-3 py-1.5 btn1color font-semibold text-sm rounded shadow-lg"
              >
                Sign Up
              </button>
            </>
          ) : (
            <div className="relative" ref={mobileDropdownRef}>
              <button
                onClick={() => setShowLogoutDropdown(!showLogoutDropdown)}
                className="ml-24 w-10 h-10 cursor-pointer btn1color rounded-full flex items-center justify-center text-sm font-bold hover:shadow-lg transition-all"
              >
                {username?.charAt(0)?.toUpperCase() || "U"}
              </button>

              {showLogoutDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-blue-100 overflow-hidden z-50">
                  {/* Profile Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-5 text-white">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-lg font-bold">
                        {username?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-white truncate">{username}</p>
                        <p className="text-blue-100 text-xs truncate">{userEmail || "user@example.com"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="px-2 py-2 space-y-1">
                    <Link
                      to="/profile"
                      onClick={() => setShowLogoutDropdown(false)}
                      className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
                    >
                      <User className="w-5 h-5" />
                      View Profile
                    </Link>
                   
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-100"></div>

                  {/* Logout */}
                  <button
                    onClick={logoutHandler}
                    className="w-full flex  cursor-pointer items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 font-semibold transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          {/* Menu Button for Mobile */}
        </div>
        <MenuIcon
          className="lg:hidden w-8 h-8  cursor-pointer text-gray-700 hover:text-blue-600 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        />
      </div>
    </div>
  );
}

export default Navbar;
