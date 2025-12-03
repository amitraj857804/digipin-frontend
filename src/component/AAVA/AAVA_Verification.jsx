import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import {
  Shield,
  MapPin,
  Loader,
  CheckCircle,
  FileText,
  Camera,
  Send,
  Sparkles,
  Search,
  Eye,
  XCircle,
  AlertTriangle,
  Truck,
  ShoppingBag,
  Building2,
  Phone,
  Calendar,
  User,
  Award,
} from "lucide-react";
import api from "../../api/api";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/authSlice";

function AAVA_Verification() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationResults, setVerificationResults] = useState([]);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [activeTab, setActiveTab] = useState("verification");
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [statusData, setStatusData] = useState(null);
  const token = useSelector(selectToken);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      digitalAddress: "",
      agentId: "",
      verificationStatus: "PENDING",
      locationConfirmed: false,
      verificationNotes: "",
      verifiedLatitude: "",
      verifiedLongitude: "",
      photoproofUrl: "",
    },
    mode: "onTouched",
  });

  const {
    register: registerStatus,
    handleSubmit: handleSubmitStatus,
    formState: { errors: errorsStatus },
  } = useForm({
    defaultValues: {
      digitalAddress: "",
    },
    mode: "onTouched",
  });

  const verificationStatuses = [
    { value: "PENDING", label: "Pending Review" },
    { value: "VERIFIED", label: "Verified ✓" },
    { value: "VERIFICATION_FAILED", label: "Verification Failed" },
    { value: "REQUIRES_CORRECTION", label: "Requires Correction" },
  ];

  const useCaseIcons = {
    governmentWelfare: Building2,
    propertyRecords: FileText,
    legalNotices: Shield,
    emergencyServices: Phone,
    eCommerce: ShoppingBag,
    foodDelivery: Truck,
  };

  const useCaseLabels = {
    governmentWelfare: "Government Welfare",
    propertyRecords: "Property Records",
    legalNotices: "Legal Notices",
    emergencyServices: "Emergency Services",
    eCommerce: "E-Commerce",
    foodDelivery: "Food Delivery",
  };

  const getCurrentLocation = () => {
    setGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setValue("verifiedLatitude", position.coords.latitude.toString());
          setValue("verifiedLongitude", position.coords.longitude.toString());
          setGettingLocation(false);
          toast.success("📍 Location captured successfully!");
        },
        (error) => {
          toast.error(`Location error: ${error.message}`);
          setGettingLocation(false);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      toast.error("Geolocation is not supported by this browser");
      setGettingLocation(false);
    }
  };

  const onSubmitStatus = async (data) => {
    setIsLoadingStatus(true);
    setStatusData(null);

    try {
      const response = await api.get(
        `/api/aava/aava-status/${encodeURIComponent(
          data.digitalAddress.trim()
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        setStatusData(response.data);
        toast.success("✅ Status retrieved successfully!");
      }
    } catch (error) {
      console.error("Error fetching AAVA status:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        error.response?.status === 404
          ? "Digital address not found"
          : "Failed to retrieve status";
      toast.error(errorMessage);
      setStatusData(null);
    } finally {
      setIsLoadingStatus(false);
    }
  };

  const getVerificationIcon = (isVerified) => {
    return isVerified ? (
      <CheckCircle className="w-5 h-5 text-green-600" />
    ) : (
      <XCircle className="w-5 h-5 text-red-500" />
    );
  };

  const getVerificationBadge = (isVerified) => {
    return isVerified ? (
      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold border border-green-200">
        ✓ Approved
      </span>
    ) : (
      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold border border-red-200">
        ✗ Not Approved
      </span>
    );
  };
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const payload = {
        digitalAddress: data.digitalAddress.trim(),
        agentId: data.agentId.trim(),
        locationConfirmed: !!data.locationConfirmed,
        verificationNotes: data.verificationNotes?.trim() || null,
        verifiedLatitude: data.verifiedLatitude
          ? parseFloat(data.verifiedLatitude)
          : null,
        verifiedLongitude: data.verifiedLongitude
          ? parseFloat(data.verifiedLongitude)
          : null,
        photoproofUrl: data.photoproofUrl?.trim() || null,
        verificationStatus: data.verificationStatus,
      };

      const response = await api.post("/api/aava/aava-verify", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data) {
        toast.success("🎉 AAVA verification submitted successfully!");
        setVerificationResults((prev) => [...prev, response.data]);
        reset();
      }
    } catch (error) {
      console.error("Error submitting AAVA verification:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        "Failed to submit verification";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4 pt-20 mt-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Animated Header */}
        <div className="text-center mb-12">
          <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl shadow-xl animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-4 shadow-2xl">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            AAVA System
          </h1>
          <p className="text-gray-600 text-xl font-medium">
            Authorized Agent Address Verification & Status
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <span className="text-blue-600 font-semibold">
              Secure • Trusted • Verified
            </span>
            <Sparkles className="w-5 h-5 text-blue-500" />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-xl border border-blue-100">
            <button
              onClick={() => setActiveTab("verification")}
              className={`px-6 py-3 rounded-xl font-semibold cursor-pointer transition-all duration-300 flex items-center gap-2 ${
                activeTab === "verification"
                  ? "btn1color shadow-lg"
                  : "text-gray-700 hover:bg-blue-50"
              }`}
            >
              <Send className="w-5 h-5" />
              Submit Verification
            </button>
            <button
              onClick={() => setActiveTab("status")}
              className={`px-6 py-3 rounded-xl font-semibold cursor-pointer transition-all duration-300 flex items-center gap-2 ${
                activeTab === "status"
                  ? "btn1color shadow-lg"
                  : "text-gray-700 hover:bg-blue-50"
              }`}
            >
              <Eye className="w-5 h-5" />
              Check Status
            </button>
          </div>
        </div>

        {/* Conditional Content Based on Active Tab */}
        {activeTab === "verification" && (
          <>
            {/* Verification Results */}
            {verificationResults.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl border border-blue-100 overflow-hidden">
                <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-white" />
                    <h2 className="text-xl font-bold text-white">
                      Recent Verifications ({verificationResults.length})
                    </h2>
                  </div>
                </div>
                <div className="divide-y divide-blue-100">
                  {verificationResults.map((result, idx) => (
                    <div
                      key={idx}
                      className="px-8 py-6 hover:bg-blue-50 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                              <Shield className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <p className="text-lg font-bold text-gray-900">
                                {result.digitalAddress}
                              </p>
                              <p className="text-sm text-gray-500">
                                Agent: {result.agentId}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                            <div className="bg-gray-50 px-3 py-2 rounded-lg">
                              <p className="text-xs text-gray-500 font-medium">
                                AAVA Verified
                              </p>
                              <p className="font-bold text-gray-900">
                                {result.isAavaVerified ? "✓ Yes" : "✗ No"}
                              </p>
                            </div>
                            <div className="bg-gray-50 px-3 py-2 rounded-lg">
                              <p className="text-xs text-gray-500 font-medium">
                                Type
                              </p>
                              <p className="font-bold text-gray-900">
                                {result.verificationType}
                              </p>
                            </div>
                            <div className="bg-gray-50 px-3 py-2 rounded-lg">
                              <p className="text-xs text-gray-500 font-medium">
                                Confidence
                              </p>
                              <p className="font-bold text-gray-900">
                                {result.oldConfidenceScore} →{" "}
                                {result.newConfidenceScore}
                              </p>
                            </div>
                            <div className="bg-gray-50 px-3 py-2 rounded-lg">
                              <p className="text-xs text-gray-500 font-medium">
                                Verified At
                              </p>
                              <p className="font-bold text-gray-900">
                                {new Date(
                                  result.verifiedAt
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <span
                            className={`px-4 py-2 rounded-full text-sm font-bold shadow-md ${
                              result.verificationStatus === "VERIFIED"
                                ? "bg-green-100 text-green-800 border border-green-200"
                                : result.verificationStatus ===
                                  "VERIFICATION_FAILED"
                                ? "bg-red-100 text-red-800 border border-red-200"
                                : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                            }`}
                          >
                            {result.verificationStatus}
                          </span>
                          {result.tamperProofLogged && (
                            <p className="text-xs text-blue-600 font-semibold mt-2">
                              🔒 Tamper-proof logged
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Verification Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl border border-white/50 overflow-hidden">
                <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600">
                  <div className="flex items-center gap-3">
                    <Send className="w-6 h-6 text-white" />
                    <h2 className="text-xl font-bold text-white">
                      Submit New Verification
                    </h2>
                  </div>
                </div>

                <div className="px-8 py-8 space-y-6">
                  {/* Digital Address */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      Digital Address
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...registerStatus("digitalAddress", {
                        required: "Digital address is required",
                      })}
                      placeholder="Enter digital address to check"
                      className={`w-full px-4 py-4 text-base border-2 rounded-xl outline-none transition-all duration-300 ${
                        errorsStatus.digitalAddress
                          ? "border-red-500 bg-red-50"
                          : "border-blue-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                      }`}
                    />
                    {errors.digitalAddress && (
                      <p className="text-sm text-red-600 mt-2 font-medium">
                        {errors.digitalAddress.message}
                      </p>
                    )}
                  </div>

                  {/* Agent ID */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                      <Shield className="w-5 h-5 text-blue-600" />
                      AAVA Agent ID
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("agentId", {
                        required: "AAVA agent ID is required",
                      })}
                      placeholder="Enter your authorized agent ID"
                      className={`w-full px-4 py-4 text-base border-2 rounded-xl outline-none transition-all duration-300 ${
                        errors.agentId
                          ? "border-red-500 bg-red-50"
                          : "border-blue-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                      }`}
                    />
                    {errors.agentId && (
                      <p className="text-sm text-red-600 mt-2 font-medium">
                        {errors.agentId.message}
                      </p>
                    )}
                  </div>

                  {/* Verification Status */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                      Verification Status
                    </label>
                    <select
                      {...register("verificationStatus")}
                      className="w-full px-4 py-4 text-base border-2 border-blue-200 rounded-xl outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                    >
                      {verificationStatuses.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Location Section */}
                  <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-4">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      Location Verification
                    </label>

                    {/* Location Confirmed Checkbox */}
                    <div className="flex items-center gap-3 mb-4">
                      <input
                        type="checkbox"
                        {...register("locationConfirmed")}
                        className="w-5 h-5 accent-blue-600 rounded"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        I confirm the location is accurate
                      </span>
                    </div>

                    {/* Coordinates */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        type="number"
                        step="any"
                        {...register("verifiedLatitude")}
                        placeholder="Latitude"
                        className="px-4 py-3 text-base border-2 border-blue-200 rounded-xl outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                      />
                      <input
                        type="number"
                        step="any"
                        {...register("verifiedLongitude")}
                        placeholder="Longitude"
                        className="px-4 py-3 text-base border-2 border-blue-200 rounded-xl outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                      />
                      <button
                        type="button"
                        onClick={getCurrentLocation}
                        disabled={gettingLocation}
                        className="px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {gettingLocation ? (
                          <>
                            <Loader className="w-5 h-5 animate-spin" />
                            Getting...
                          </>
                        ) : (
                          <>
                            <MapPin className="w-5 h-5" />
                            Get Location
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Verification Notes */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      Verification Notes
                    </label>
                    <textarea
                      {...register("verificationNotes")}
                      placeholder="Add any observations, issues, or additional details about the verification..."
                      rows="4"
                      className="w-full px-4 py-4 text-base border-2 border-blue-200 rounded-xl outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all duration-300 resize-y min-h-[120px]"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Include any relevant details that may help with
                      verification review
                    </p>
                  </div>

                  {/* Photo Proof URL */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                      <Camera className="w-5 h-5 text-blue-600" />
                      Photo Proof URL
                    </label>
                    <input
                      type="url"
                      {...register("photoproofUrl")}
                      placeholder="https://example.com/photo-proof.jpg"
                      className="w-full px-4 py-4 text-base border-2 border-blue-200 rounded-xl outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Optional: URL to photo evidence supporting the
                      verification
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="w-6 h-6 animate-spin" />
                        Processing Verification...
                      </>
                    ) : (
                      <>
                        <Send className="w-6 h-6" />
                        Submit Verification
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </>
        )}

        {/* Status Check Tab Content */}
        {activeTab === "status" && (
          <>
            {/* Status Search Form */}
            <form onSubmit={handleSubmitStatus(onSubmitStatus)}>
              <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl border border-white/50 overflow-hidden">
                <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600">
                  <div className="flex items-center gap-3">
                    <Search className="w-6 h-6 text-white" />
                    <h2 className="text-xl font-bold text-white">
                      Check Verification Status
                    </h2>
                  </div>
                </div>

                <div className="px-8 py-8">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      Digital Address
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-4">
                      <input
                        type="text"
                        {...registerStatus("digitalAddress", {
                          required: "Digital address is required",
                        })}
                        placeholder="Enter digital address to check status"
                        className={`flex-1 px-4 py-4 text-base border-2 rounded-xl outline-none transition-all duration-300 font-mono ${
                          errorsStatus.digitalAddress
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        }`}
                      />
                      <button
                        type="submit"
                        disabled={isLoadingStatus}
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 disabled:opacity-60 disabled:hover:scale-100"
                      >
                        {isLoadingStatus ? (
                          <>
                            <Loader className="w-5 h-5 animate-spin" />
                            Checking...
                          </>
                        ) : (
                          <>
                            <Search className="w-5 h-5" />
                            Check Status
                          </>
                        )}
                      </button>
                    </div>
                    {errorsStatus.digitalAddress && (
                      <p className="text-sm text-red-600 mt-2 font-medium">
                        {errorsStatus.digitalAddress.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </form>

            {/* Status Results */}
            {statusData && (
              <div className="space-y-8">
                {/* Main Status Card */}
                <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl border border-white/50 overflow-hidden">
                  <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Shield className="w-6 h-6 text-white" />
                        <h2 className="text-xl font-bold text-white">
                          Verification Status
                        </h2>
                      </div>
                      {statusData.isAavaVerified && (
                        <Award className="w-6 h-6 text-yellow-300" />
                      )}
                    </div>
                  </div>

                  <div className="px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Left Column - Basic Info */}
                      <div className="space-y-6">
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                          <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-blue-600" />
                            Address Information
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm text-gray-500 font-medium">
                                Digital Address
                              </p>
                              <p className="font-mono font-bold text-gray-900 bg-white px-3 py-2 rounded-lg border">
                                {statusData.digitalAddress}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 font-medium">
                                Verification Type
                              </p>
                              <p className="font-bold text-gray-900">
                                {statusData.verificationType}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                          <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                            <User className="w-5 h-5 text-blue-600" />
                            Agent Information
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm text-gray-500 font-medium">
                                Agent ID
                              </p>
                              <p className="font-bold text-gray-900">
                                {statusData.agentId || "N/A"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 font-medium">
                                Verified At
                              </p>
                              <p className="font-bold text-gray-900 flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                {statusData.verifiedAt
                                  ? new Date(
                                      statusData.verifiedAt
                                    ).toLocaleString()
                                  : "Not verified yet"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Status */}
                      <div className="space-y-6">
                        <div
                          className={`p-6 rounded-2xl border-2 ${
                            statusData.isAavaVerified
                              ? "bg-green-50 border-green-200"
                              : "bg-red-50 border-red-200"
                          }`}
                        >
                          <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                            {getVerificationIcon(statusData.isAavaVerified)}
                            AAVA Verification Status
                          </h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-700">
                                Status:
                              </span>
                              {getVerificationBadge(statusData.isAavaVerified)}
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-700">
                                Requires Verification:
                              </span>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-bold ${
                                  statusData.requiresAavaVerification
                                    ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                                    : "bg-green-100 text-green-800 border border-green-200"
                                }`}
                              >
                                {statusData.requiresAavaVerification
                                  ? "Yes"
                                  : "No"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {statusData.verificationNotes && (
                          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
                            <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                              <FileText className="w-5 h-5 text-blue-600" />
                              Verification Notes
                            </h3>
                            <p className="text-gray-700 italic">
                              {statusData.verificationNotes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Use Cases Approval */}
                <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl border border-white/50 overflow-hidden">
                  <div className="px-8 py-6 bg-gradient-to-r from-indigo-600 to-purple-600">
                    <div className="flex items-center gap-3">
                      <Award className="w-6 h-6 text-white" />
                      <h2 className="text-xl font-bold text-white">
                        Approved Use Cases
                      </h2>
                    </div>
                  </div>

                  <div className="px-8 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {Object.entries(statusData.approvedUseCases || {}).map(
                        ([useCase, isApproved]) => {
                          const IconComponent = useCaseIcons[useCase] || Shield;
                          return (
                            <div
                              key={useCase}
                              className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
                                isApproved
                                  ? "bg-green-50 border-green-200 hover:bg-green-100"
                                  : "bg-red-50 border-red-200 hover:bg-red-100"
                              }`}
                            >
                              <div className="flex items-center gap-3 mb-4">
                                <div
                                  className={`p-2 rounded-xl ${
                                    isApproved ? "bg-green-100" : "bg-red-100"
                                  }`}
                                >
                                  <IconComponent
                                    className={`w-5 h-5 ${
                                      isApproved
                                        ? "text-green-600"
                                        : "text-red-500"
                                    }`}
                                  />
                                </div>
                                <h3 className="font-bold text-gray-900">
                                  {useCaseLabels[useCase] || useCase}
                                </h3>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600 font-medium">
                                  Access:
                                </span>
                                {getVerificationBadge(isApproved)}
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>

                    <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-200">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <h3 className="font-bold text-blue-900 mb-2">
                            Use Case Approval Criteria
                          </h3>
                          <ul className="text-sm text-blue-800 space-y-1">
                            <li>
                              • <strong>Government & Legal Services:</strong>{" "}
                              Require full AAVA verification
                            </li>
                            <li>
                              • <strong>Emergency Services:</strong> Approved
                              with AAVA verification OR 80+ confidence score
                            </li>
                            <li>
                              • <strong>Commercial Services:</strong> Approved
                              with 50+ confidence score
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* No Status Results State */}
            {!statusData && !isLoadingStatus && (
              <div className="text-center py-16">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Enter a digital address to check its status
                </h3>
                <p className="text-gray-500">
                  Get real-time verification status and approved use cases
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AAVA_Verification;
