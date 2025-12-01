import { Copy, Edit, Trash2, Eye } from "lucide-react";
import toast from "react-hot-toast";

function AddressCard({ address, onView, onEdit, onDelete }) {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const getConsentBadgeColor = (consent) => {
    return consent === "PERMANENT"
      ? "bg-green-100 text-green-800"
      : "bg-amber-100 text-amber-800";
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-blue-100 text-blue-800";
      case "EXPIRED":
        return "bg-red-100 text-red-800";
      case "INACTIVE":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-blue-100 p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">{address.addressName}</h3>
          <p className="text-sm text-gray-600 mt-1">{address.purpose}</p>
        </div>
        <div className="flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(address.status || 'ACTIVE')}`}>
            {address.status || 'ACTIVE'}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getConsentBadgeColor(address.consentType)}`}>
            {address.consentType}
          </span>
        </div>
      </div>

      {/* Digital Address Display */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-4 border border-blue-200">
        <p className="text-xs text-gray-600 font-semibold uppercase mb-2">Digital Address</p>
        <div className="flex items-center justify-between gap-3">
          <p className="text-lg font-bold text-blue-600 break-all">{address.digitalAddress}</p>
          <button
            onClick={() => handleCopy(address.digitalAddress)}
            className="flex-shrink-0 cursor-pointer p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            title="Copy address"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Address Details */}
      <div className="space-y-2 mb-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Physical Address:</span>
          <span className="font-semibold text-gray-900">{address.address}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Pincode:</span>
          <span className="font-semibold text-gray-900">{address.pincode}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Created:</span>
          <span className="font-semibold text-gray-900">
            {new Date(address.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* DaPin Preview */}
      <div className="bg-blue-50 rounded-lg p-3 mb-4 border border-blue-200">
        <p className="text-xs text-blue-700 font-semibold">🔐 DaPin: <span className="font-mono">{address.uniPin ? "*".repeat(address.uniPin.length) : "Not set"}</span></p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onView(address)}
          className="flex-1 flex items-center justify-center cursor-pointer gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm"
        >
          <Eye className="w-4 h-4" /> View Details
        </button>
        <button
          onClick={() => onEdit(address)}
          className="p-2 bg-green-100 cursor-pointer text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          title="Edit address"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(address.id)}
          className="p-2 bg-red-100 cursor-pointer text-red-700 rounded-lg hover:bg-red-200 transition-colors"
          title="Delete address"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default AddressCard;
