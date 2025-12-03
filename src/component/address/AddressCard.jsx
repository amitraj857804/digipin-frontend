import { Copy, Edit, Trash2, Eye, Loader, AlertCircle, X } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import api from "../../api/api";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/authSlice";

function AddressCard({ address, onView, onEdit, onDelete }) {
  const token = useSelector(selectToken);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    setShowDeleteDialog(false);
    setDeleting(true);
    try {
      await api.delete(`/api/digital-address/delete?digitalAddress=${address.digitalAddress}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Address deleted successfully!");
      g
      // Call refresh callback to update dashboard
      if (onDelete) {
        onDelete(address.id || address._id);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to delete address";
      toast.error(errorMessage);
      console.error("Delete error:", error);
    } finally {
      setDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
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
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(address.hasActiveConsent ? "ACTIVE" : "INACTIVE")}`}>
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
          <span className="font-semibold text-gray-900">{address.pinCode}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Created:</span>
          <span className="font-semibold text-gray-900">
            {new Date(address.createdAt).toLocaleDateString()}
          </span>
        </div>
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
          className="p-2 bg-green-100 cursor-pointer text-green-700 rounded-lg hover:bg-green-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Edit address"
          disabled={deleting}
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={handleDeleteClick}
          className="p-2 bg-red-100 cursor-pointer text-red-700 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          title="Delete address"
          disabled={deleting}
        >
          {deleting ? <Loader className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 border border-blue-100">
            {/* Icon */}
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Delete Address?
            </h3>

            {/* Message */}
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete <strong>{address.addressName}</strong>? This action cannot be undone.
            </p>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCancelDelete}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={deleting}
                className="flex-1 px-4 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {deleting ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddressCard;
