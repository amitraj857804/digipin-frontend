import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { 
  MapPin, 
  Search, 
  Loader, 
  CheckCircle, 
  Lock, 
  Navigation,
  AlertCircle,
  Shield,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  MinusCircle,
  Send
} from "lucide-react";
import api from "../../api/api";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/authSlice";

function AIU_Resolve() {
  const [isResolving, setIsResolving] = useState(false);
  const [resolvedAddress, setResolvedAddress] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const token = useSelector(selectToken);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      digitalAddress: "",
      upiPin: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    setIsResolving(true);
    setResolvedAddress(null);
    
    try {
      const response = await api.post(
        "/api/aiu/resolve-with-consent",
        {
          digitalAddress: data.digitalAddress,
          upiPin: data.upiPin,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        toast.success("Address resolved successfully!");
        setResolvedAddress(response.data);
        setShowMap(false);
      }
    } catch (error) {
      console.error("Error resolving address:", error);
      
      // Handle specific error responses
      if (error.response) {
        switch (error.response.status) {
          case 404:
            toast.error("Digital address not found");
            break;
          case 401:
            toast.error(error.response.data || "Invalid DaPin or no active consent");
            break;
          case 500:
            toast.error("Server error. Please try again later");
            break;
          default:
            toast.error(error.response.data || "Failed to resolve address");
        }
      } else {
        toast.error("Network error. Please check your connection");
      }
    } finally {
      setIsResolving(false);
    }
  };

  const handleReset = () => {
    reset();
    setResolvedAddress(null);
    setShowMap(false);
  };

  const openInGoogleMaps = () => {
    if (resolvedAddress?.latitude && resolvedAddress?.longitude) {
      const url = `https://www.google.com/maps?q=${resolvedAddress.latitude},${resolvedAddress.longitude}`;
      window.open(url, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 mt-16">
      <div className="max-w-5xl mx-auto mt-4">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-linear-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
              <Search className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Resolve Digital Address
              </h1>
              <p className="text-gray-600 mt-2">
                Enter digital address and DaPin to access location details
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8 mb-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              {/* Digital Address Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Digital Address *
                </label>
                <InputField
                  required={true}
                  id="digitalAddress"
                  type="text"
                  message="*Digital address is required"
                  placeholder="e.g., username@home.add"
                  register={register}
                  errors={errors}
                  className="w-full px-4 py-3 border border-blue-200! rounded-lg focus:ring-2 focus:ring-blue-600 transition-all"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Enter the complete digital address (format: username@suffix)
                </p>
              </div>

              {/* DaPin Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 items-center gap-2">
                  <Lock className="w-4 h-4 text-blue-600" />
                  DaPin (Digital Address PIN) *
                </label>
                <InputField
                  required={true}
                  id="upiPin"
                  type="password"
                  message="*DaPin is required"
                  placeholder="Enter 6-digit DaPin"
                  register={register}
                  errors={errors}
                  className="w-full px-4 py-3 border border-blue-200! rounded-lg focus:ring-2 focus:ring-blue-600 transition-all"
                  maxLength={6}
                  inputmode="numeric"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                />
                <p className="mt-2 text-xs text-gray-500">
                  The 6-digit PIN provided by the address owner for consent verification
                </p>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-blue-900 mb-1">
                      🔐 Consent-Based Access
                    </p>
                    <p className="text-xs text-blue-800 leading-relaxed">
                      This service requires explicit consent from the address owner. 
                      You must have both the digital address and the DaPin to access location details. 
                      All access attempts are logged for security and transparency.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isResolving}
                  className="flex-1 px-6 py-3 btn1color cursor-pointer font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isResolving ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Resolving...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      Resolve Address
                    </>
                  )}
                </button>

                {resolvedAddress && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-3 bg-gray-200 cursor-pointer text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-all"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Resolved Address Display */}
        {resolvedAddress && (
          <div className="bg-white rounded-2xl shadow-xl border border-green-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Address Resolved Successfully
              </h2>
            </div>

            {/* Address Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Digital Address */}
              <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                <p className="text-xs text-gray-600 font-semibold uppercase mb-2">
                  Digital Address
                </p>
                <p className="text-lg font-bold text-blue-600 break-all">
                  {resolvedAddress.digitalAddress}
                </p>
              </div>

              {/* Generated Digipin ID */}
              <div className="bg-linear-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                <p className="text-xs text-gray-600 font-semibold uppercase mb-2">
                  Generated Digipin ID
                </p>
                <p className="text-lg font-bold text-purple-600 font-mono">
                  {resolvedAddress.generatedDigipin}
                </p>
              </div>

              {/* Physical Address */}
              <div className="col-span-1 md:col-span-2 bg-linear-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                <p className="text-xs text-gray-600 font-semibold uppercase mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Physical Address
                </p>
                <p className="text-lg font-bold text-gray-900">
                  {resolvedAddress.address}
                </p>
              </div>

              {/* Pincode */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-xs text-gray-600 font-semibold uppercase mb-2">
                  Pincode
                </p>
                <p className="text-lg font-bold text-gray-900">
                  {resolvedAddress.pincode}
                </p>
              </div>

              {/* Verification Type */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-xs text-gray-600 font-semibold uppercase mb-2">
                  Verification Type
                </p>
                <p className="text-lg font-bold text-gray-900">
                  {resolvedAddress.verificationType}
                </p>
              </div>

              {/* Coordinates */}
              <div className="bg-linear-to-r from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200">
                <p className="text-xs text-gray-600 font-semibold uppercase mb-2">
                  Latitude
                </p>
                <p className="text-lg font-bold text-gray-900 font-mono">
                  {resolvedAddress.latitude}
                </p>
              </div>

              <div className="bg-linear-to-r from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200">
                <p className="text-xs text-gray-600 font-semibold uppercase mb-2">
                  Longitude
                </p>
                <p className="text-lg font-bold text-gray-900 font-mono">
                  {resolvedAddress.longitude}
                </p>
              </div>

              {/* Confidence Score */}
              {resolvedAddress.confidenceScore && (
                <div className="col-span-1 md:col-span-2 bg-linear-to-r from-cyan-50 to-blue-50 rounded-lg p-4 border border-cyan-200">
                  <p className="text-xs text-gray-600 font-semibold uppercase mb-2">
                    Confidence Score
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-linear-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all"
                        style={{ width: `${resolvedAddress.confidenceScore}%` }}
                      ></div>
                    </div>
                    <span className="text-lg font-bold text-gray-900">
                      {resolvedAddress.confidenceScore}%
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Map Integration Button */}
            <div className="border-t border-gray-200 pt-6">
              <button
                onClick={openInGoogleMaps}
                className="w-full px-6 py-3 bg-linear-to-r cursor-pointer from-green-600 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3"
              >
                <Navigation className="w-5 h-5" />
                Open in Google Maps
              </button>
            </div>

            {/* Security Notice */}
            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-amber-900 mb-1">
                    ⚠️ Privacy Notice
                  </p>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    This access has been logged for security purposes. Please ensure you 
                    have proper authorization to access this address information. Misuse 
                    of this service may result in legal action.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8 mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            How It Works
          </h3>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex gap-3">
              <span className="shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                1
              </span>
              <p>
                <strong>Enter Digital Address:</strong> Provide the complete digital 
                address in the format username@suffix (e.g., john@home.add)
              </p>
            </div>
            <div className="flex gap-3">
              <span className="shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                2
              </span>
              <p>
                <strong>Provide DaPin:</strong> Enter the 6-digit PIN shared by the 
                address owner for consent verification
              </p>
            </div>
            <div className="flex gap-3">
              <span className="shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                3
              </span>
              <p>
                <strong>Access Details:</strong> Upon successful verification, you'll 
                receive the physical address, coordinates, and verification details
              </p>
            </div>
            <div className="flex gap-3">
              <span className="shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                4
              </span>
              <p>
                <strong>Navigate:</strong> Use the Google Maps integration to navigate 
                to the resolved location
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIU_Resolve;
