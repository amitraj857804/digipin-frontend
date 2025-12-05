import { useState, useRef, useEffect } from "react";
import {
  MapPin,
  Plus,
  Copy,
  Share2,
  Eye,
  Lock,
  Zap,
  TrendingUp,
  Loader,
  Shield,
} from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CreateAddress from "../address/CreateAddress";
import AddressDetailsModal from "../address/AddressDetailsModal";
import { useSelector, useDispatch } from "react-redux";
import { selectToken } from "../../store/authSlice";
import {
  selectHighestConfidenceAddress,
  selectAddressLoading,
  selectAddressError,
  fetchAllAddresses,
} from "../../store/addressSlice";
import api from "../../api/api";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [digipinId, setDigipinId] = useState(null);
  const [digipinLoading, setDigipinLoading] = useState(false);
  const [digipinError, setDigipinError] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const createAddressRef = useRef(null);
  const token = useSelector(selectToken);
  const highestConfidenceAddr = useSelector(selectHighestConfidenceAddress);
  const loading = useSelector(selectAddressLoading);
  const error = useSelector(selectAddressError);

  const digitalAddress = highestConfidenceAddr?.digitalAddress || null;

  // Fetch addresses on component mount
  useEffect(() => {
    if (token) {
      dispatch(fetchAllAddresses());
    }
  }, [token, dispatch]);

  // Fetch Digipin ID based on device location
  useEffect(() => {
    if (token) {
      fetchDigipinIdFromDeviceLocation();
    }
  }, [token]);

  const fetchDigipinIdFromDeviceLocation = async () => {
    if (!navigator.geolocation) {
      setDigipinError("Geolocation not available");
      return;
    }

    setDigipinLoading(true);
    setDigipinError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          
          const response = await api.get(
            `/api/digital-address/digipin?lon=${longitude}&lat=${latitude}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setDigipinId(response.data.digipinId || response.data);
        } catch (err) {
          console.error("Error fetching Digipin ID:", err);
          setDigipinError("Failed to load");
        } finally {
          setDigipinLoading(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setDigipinError("Location access denied");
        setDigipinLoading(false);
      }
    );
  };

  const copyToClipboard = () => {
    if (!digitalAddress) {
      toast.error("No digital address to copy");
      return;
    }
    navigator.clipboard.writeText(digitalAddress);
    setCopied(true);
    toast.success("Digital address copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToCreateAddress = () => {
    createAddressRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="mt-16 bg-gradient-to-b from-white via-blue-50 to-indigo-50 min-h-screen">
      {/* Welcome Section */}
      <div className="pt-12 pb-16 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome to Your Digital
            <span className="btn2color bg-clip-text text-transparent">
              Address Hub
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage, share, and track your digital address all in one place. Get
            started by creating your unique address or managing existing ones.
          </p>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {/* Digital Address Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-blue-100 p-6 sm:p-8">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <MapPin className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
                    Your Digital Address
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base mt-1">
                    Your unique identifier for receiving deliveries
                  </p>
                </div>
                {highestConfidenceAddr && (
                  <div className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-semibold text-sm sm:text-base whitespace-nowrap ${
                    highestConfidenceAddr.status === "ACTIVE" 
                      ? "bg-green-100 text-green-700" 
                      : highestConfidenceAddr.status === "EXPIRED"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    <Eye className="w-4 h-4" /> {highestConfidenceAddr.linkStatus }
                  </div>
                )}
              </div>

              {/* Address Display */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide mb-2">
                  Your Digital Address ID 
                </p>
                 {loading ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : error ? (
                  <div className="text-red-600 text-sm py-4">{error}</div>
                ) : !digitalAddress ? (
                  <div className="text-gray-600 text-sm py-4">
                    No digital address found. Create one to get started!
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <p className="text-2xl sm:text-4xl font-bold text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text font-mono break-all">
                      {digitalAddress}
                    </p>
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center cursor-pointer gap-2 px-3 sm:px-4 py-2 bg-white hover:bg-blue-50 border border-blue-500 rounded-lg font-semibold text-blue-600 transition-all hover:scale-105 whitespace-nowrap text-sm sm:text-base"
                    >
                      <Copy className="w-4 sm:w-5 h-4 sm:h-5" />
                      <span className="hidden sm:inline">{copied ? "Copied!" : "Copy"}</span>
                    </button>
                  </div>
                )}
              </div>

              

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button 
                  onClick={async () => {
                    if (!digitalAddress) {
                      toast.error("No address to share");
                      return;
                    }

                    // Check if Web Share API is available
                    if (navigator.share) {
                      try {
                        await navigator.share({
                          title: "My Digital Address",
                          text: `My digital address is: ${digitalAddress}`,
                        });
                        toast.success("Address shared successfully!");
                      } catch (err) {
                        if (err.name !== "AbortError") {
                          toast.error("Failed to share");
                        }
                      }
                    } else {
                      // Fallback: Copy to clipboard if Web Share API is not available
                      try {
                        await navigator.clipboard.writeText(digitalAddress);
                        toast.success("Address copied! Share via your preferred method");
                      } catch (err) {
                        toast.error("Failed to copy address");
                      }
                    }
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-3 btn1color font-semibold text-sm sm:text-base rounded-lg hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
                >
                  <Share2 className="w-4 sm:w-5 h-4 sm:h-5" /> Share Address
                </button>
                <button 
                  onClick={() => setShowDetailsModal(true)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold text-sm sm:text-base rounded-lg hover:bg-blue-50 transition-all cursor-pointer"
                >
                  <Eye className="w-4 sm:w-5 h-4 sm:h-5" /> View Details
                </button>
              </div>
            </div>
          </div>

          {/* Side Stats Card */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 btn1color p-0 rounded-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">
                    Your Digipin ID
                  </p>
                  {digipinLoading ? (
                    <div className="flex items-center gap-1">
                      <Loader className="w-4 h-4 animate-spin text-gray-600" />
                      <p className="text-xs text-gray-600">Loading...</p>
                    </div>
                  ) : digipinError ? (
                    <p className="text-sm text-red-600 font-semibold">{digipinError}</p>
                  ) : digipinId ? (
                    <p className="text-xl font-bold text-gray-900 truncate">
                      {digipinId}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-600">Not available</p>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Unique identifier for your digital address
              </p>
            </div>

            

            <div className="btn2color rounded-xl shadow-lg p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Create New Address</h3>
              <p className="text-blue-100 text-sm mb-4">
                Generate additional digital addresses for different purposes
              </p>
              <button
                className="w-full flex items-center cursor-pointer text-indigo-600 justify-center gap-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 font-semibold rounded-lg transition-all"
                onClick={scrollToCreateAddress}
              >
                <Plus className="w-5 h-5 text-blue-600 " /> Add New
              </button>
            </div>
          </div>
        </div>

        <div ref={createAddressRef}>
          <CreateAddress />
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6 hover:shadow-xl transition-all">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg mb-4">
              <Share2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Easy Sharing
            </h3>
            <p className="text-gray-600 text-sm">
              Share your digital address with anyone safely and securely
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6 hover:shadow-xl transition-all">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Track Activity
            </h3>
            <p className="text-gray-600 text-sm">
              Monitor all deliveries and access requests in real-time
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6 hover:shadow-xl transition-all">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-pink-600 to-red-600 rounded-lg mb-4">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Enhanced Security
            </h3>
            <p className="text-gray-600 text-sm">
              Protect your privacy with advanced encryption and controls
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl shadow-lg border border-indigo-300 p-6 hover:shadow-xl transition-all text-white">
            <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold mb-2">
              AAVA Verification
            </h3>
            <p className="text-blue-100 text-sm mb-4">
              Learn how automated agent verification works to validate your digital address
            </p>
            <button
              onClick={() => navigate("/aava-demo")}
              className="w-full px-4 py-2 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-blue-50 transition-all"
            >
              View Demo →
            </button>
          </div>
        </div>
      </div>
      
      {/* Address Details Modal */}
      <AddressDetailsModal 
        isOpen={showDetailsModal}
        address={highestConfidenceAddr}
        onClose={() => setShowDetailsModal(false)}
      />
    </div>
  );
}

export default Home;
