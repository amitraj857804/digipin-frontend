import { useState, useEffect } from "react";
import { X, Loader } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../api/api";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/authSlice";

function EditAddressModal({ address, isOpen, onClose, onUpdate }) {
  const token = useSelector(selectToken);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    addressName: "",
    purpose: "",
    address: "",
    pincode: "",
    uniPin: "",
    consentType: "PERMANENT",
    consentDurationDays: null,
  });

  // Prevent body scroll when modal is open
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

  // Populate form when address changes
  useEffect(() => {
    if (address) {
      setFormData({
        addressName: address.addressName || "",
        purpose: address.purpose || "",
        address: address.address || "",
        pincode: address.pincode || "",
        uniPin: address.uniPin || "",
        consentType: address.consentType || "PERMANENT",
        consentDurationDays: address.consentDurationDays || null,
      });
    }
  }, [address]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.addressName ||
      !formData.purpose ||
      !formData.address ||
      !formData.pincode ||
      !formData.uniPin
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      
      const response = await api.put(
        "/api/digital-address/update",
        {
          digitalAddress: address.digitalAddress,
          suffix: address.suffix,
          latitude: address.latitude,
          longitude: address.longitude,
          address: formData.address,
          addressName: formData.addressName,
          pincode: formData.pincode,
          purpose: formData.purpose,
          uniPin: formData.uniPin,
          consentType: formData.consentType,
          consentDurationDays: formData.consentDurationDays,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
console.log("end");
      toast.success("Address updated successfully!");
      if (onUpdate) {
        onUpdate(response.data);
      }
      onClose();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update address";
      toast.error(errorMessage);
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 ">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 pt-4 border border-blue-100 max-h-[85vh] overflow-y-auto scrollbar-hide mt-28 mb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Edit Address</h2>
          <button
            onClick={onClose}
            disabled={loading}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer disabled:opacity-50 hover:rotate-90 transition-transform duration-200 ease-in"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Address Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Address Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="addressName"
              value={formData.addressName}
              onChange={handleChange}
              placeholder="e.g., Home, Office, Temporary"
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
              disabled={loading}
            />
          </div>

          {/* Purpose */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Purpose <span className="text-red-600">*</span>
            </label>
            <select
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg cursor-pointer focus:outline-none focus:border-blue-600 transition-colors"
              disabled={loading}
            >
              <option value="">Select a purpose</option>
              <option value="Personal - Home Address">
                Personal - Home Address
              </option>
              <option value="Business - Office Address">
                Business - Office Address
              </option>
              <option value="Temporary - Temporary Address">
                Temporary - Temporary Address
              </option>
              <option value="Other - Specify Purpose">
                Other - Specify Purpose
              </option>
            </select>
          </div>

          {/* Physical Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Physical Address <span className="text-red-600">*</span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your complete physical address"
              rows="3"
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors resize-none"
              disabled={loading}
            />
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Pincode <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="e.g., 110001"
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
              disabled={loading}
            />
          </div>

          {/* DaPin (uniPin) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              DaPin (Digital Address PIN) <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="uniPin"
              value={formData.uniPin}
              onChange={(e) => {
                // Remove any non-numeric characters
                const numericValue = e.target.value.replace(/[^0-9]/g, "");
                // Limit to 6 digits
                const limitedValue = numericValue.slice(0, 6);
                setFormData((prev) => ({
                  ...prev,
                  uniPin: limitedValue,
                }));
              }}
              placeholder="Enter a 6 digit pin (e.g., 123456)"
              inputMode="numeric"
              maxLength="6"
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
              disabled={loading}
            />
          </div>

          {/* Consent Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Consent Type
            </label>
            <select
              name="consentType"
              value={formData.consentType}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-blue-200 cursor-pointer rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
              disabled={loading}
            >
              <option value="PERMANENT">Permanent</option>
              <option value="TEMPORARY">Temporary</option>
            </select>
          </div>

          {/* Consent Duration Days (conditional) */}
          {formData.consentType === "TEMPORARY" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Valid for (days)
              </label>
              <input
                type="number"
                name="consentDurationDays"
                value={formData.consentDurationDays || ""}
                onChange={handleChange}
                placeholder="e.g., 30, 90, 365"
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
                disabled={loading}
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Address"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditAddressModal;
