import { X, Copy, MapPin, Shield, Calendar, Phone, Mail, Zap } from "lucide-react";
import toast from "react-hot-toast";
import { useEffect } from "react";

function AddressDetailsModal({ isOpen, address, onClose }) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !address) return null;

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied!`);
  };

  const calculateDaysRemaining = (createdAt, duration) => {
    if (!createdAt || !duration) return null;
    const created = new Date(createdAt);
    const expiry = new Date(created.getTime() + duration * 24 * 60 * 60 * 1000);
    const today = new Date();
    const daysLeft = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return daysLeft > 0 ? daysLeft : 0;
  };

  const daysRemaining = address.consentType === "TEMPORARY" 
    ? calculateDaysRemaining(address.createdAt, address.consentDurationDays)
    : null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 top-20 pt-12">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {/* Header */}
        <div className="sticky top-0 btn1color px-6 py-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Address Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors cursor-pointer hover:rotate-90 transition-transform duration-200 ease-in"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Address Name & Status */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{address.addressName}</h3>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                {address.purpose}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                address.consentType === "PERMANENT"
                  ? "bg-green-100 text-green-800"
                  : "bg-amber-100 text-amber-800"
              }`}>
                {address.consentType}
              </span>
            </div>
          </div>

          {/* Digital Address (Main) */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
            <p className="text-sm text-gray-600 font-semibold uppercase mb-3">Your Digital Address</p>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-2xl font-bold text-blue-600 font-mono break-all">{address.digitalAddress}</p>
                <p className="text-xs text-gray-600 mt-2">Use this address to receive deliveries and services</p>
              </div>
              <button
                onClick={() => handleCopy(address.digitalAddress, "Digital Address")}
                className="flex-shrink-0 p-3 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Physical Address Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-gray-600" />
                <p className="text-sm text-gray-600 font-semibold">Physical Address</p>
              </div>
              <p className="text-lg font-bold text-gray-900">{address.address}</p>
              <p className="text-sm text-gray-600 mt-2">📍 Pincode: {address.pincode}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-gray-600" />
                <p className="text-sm text-gray-600 font-semibold">Coordinates</p>
              </div>
              <p className="text-sm text-gray-900 font-mono">
                Lat: {address.latitude?.toFixed(6)}<br />
                Lng: {address.longitude?.toFixed(6)}
              </p>
            </div>
          </div>

          {/* Security Information */}
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-blue-600" />
              <h4 className="text-lg font-bold text-blue-900">Security Information</h4>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-semibold">🔐 DaPin (Digital Address PIN):</span>
                <span className="font-mono text-lg font-bold text-blue-600">{address.uniPin ? "*".repeat(address.uniPin.length) : "Not set"}</span>
              </div>
              <p className="text-sm text-blue-800 bg-white rounded p-3">
                Your DaPin acts as a consent granter. Partners need this PIN to access your digital address information. Only share this PIN with trusted parties.
              </p>
            </div>
          </div>

          {/* Consent Details */}
          <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
            <h4 className="text-lg font-bold text-amber-900 mb-4">Consent Configuration</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Consent Type:</span>
                <span className="font-bold text-gray-900">{address.consentType}</span>
              </div>
              {address.consentType === "TEMPORARY" && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Duration:</span>
                    <span className="font-bold text-gray-900">{address.consentDurationDays} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Days Remaining:</span>
                    <span className={`font-bold ${daysRemaining && daysRemaining > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {daysRemaining} days
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Timestamps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-gray-600">Created:</p>
                <p className="font-semibold text-gray-900">
                  {new Date(address.createdAt).toLocaleDateString()} at {new Date(address.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
            {address.updatedAt && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-gray-600">Last Updated:</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(address.updatedAt).toLocaleDateString()} at {new Date(address.updatedAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sharing Info */}
          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <h4 className="text-lg font-bold text-green-900 mb-3">Sharing Information</h4>
            <div className="space-y-2 text-sm">
              <p className="text-green-800">
                ✅ Shared with: <span className="font-bold">{address.sharedWith || 0} partners</span>
              </p>
              <p className="text-green-800">
                ✅ Total deliveries: <span className="font-bold">{address.deliveryCount || 0}</span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 cursor-pointer bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressDetailsModal;
