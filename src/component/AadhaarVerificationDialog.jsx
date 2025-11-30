import { useState } from "react";
import { X, Shield, AlertCircle, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import api from "../api/api";
import { useSelector, useDispatch } from "react-redux";
import { selectToken, setUserVerified } from "../store/authSlice";

function AadhaarVerificationDialog({ isOpen, onClose, onVerified }) {
  const [loading, setLoading] = useState(false);
  const [verificationStep, setVerificationStep] = useState("input");
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const [showError , setShowError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      aadhaarNumber: "",
      dateOfBirth: "",
    },
    mode: "onTouched",
  });

  const handleVerification = async (data) => {
    setLoading(true);
    try {
      // Remove spaces from Aadhaar number
      const cleanAadhaar = data.aadhaarNumber.replace(/\s/g, "");

      // Validate Aadhaar format (12 digits)
      if (!/^\d{12}$/.test(cleanAadhaar)) {
        toast.error("Aadhaar number must be 12 digits");
        setLoading(false);
        return;
      }

      // Validate date of birth format
      if (!data.dateOfBirth) {
        toast.error("Please select date of birth");
        setLoading(false);
        return;
      }

      const response = await api.post(
        "/api/auth/verify-aadhaar",
        {
          aadhaarNumber: cleanAadhaar,
          dateOfBirth: data.dateOfBirth,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        setVerificationStep("success");
        // Update Redux state to mark user as verified
        dispatch(setUserVerified(true));
        // Call the callback after 2 seconds
        setTimeout(() => {
          onVerified(response.data);
          reset();
          setVerificationStep("input");
          onClose();
        }, 2000);
      }
    } catch (error) {
      if (error?.response?.data == "aadhaar verified")
        setVerificationStep("error");
      setShowError(error.response.data);
      const errorMessage = "Already verified";
      toast.error(errorMessage);

      setTimeout(() => {
        setVerificationStep("input");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-tra bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white bg-opacity-95 backdrop-blur-md rounded-2xl shadow-2xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto border top-15 relative border-white border-opacity-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Verify Aadhaar</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer hover:rotate-90 transition-transform duration-200 ease-in hover:bg-gray-100 p-1 rounded-lg "
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Input State */}
        {verificationStep === "input" && (
          <>
            <p className="text-gray-600 text-sm mb-6">
              Please verify your identity with your Aadhaar number to create a
              digital address. Your information is secure and encrypted.
            </p>

            <form
              onSubmit={handleSubmit(handleVerification)}
              className="space-y-4"
            >
              {/* Aadhaar Number Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Aadhaar Number
                </label>
                <input
                  type="text"
                  placeholder="XXXX XXXX XXXX"
                  maxLength="14"
                  {...register("aadhaarNumber", {
                    required: "Aadhaar number is required",
                    pattern: {
                      value: /^\d{12}$|^\d{4}\s\d{4}\s\d{4}$/,
                      message: "Enter valid 12-digit Aadhaar",
                    },
                  })}
                  onChange={(e) => {
                    // Auto-format: XXXX XXXX XXXX
                    let value = e.target.value.replace(/\s/g, "");
                    if (value.length > 0) {
                      value = value.match(/.{1,4}/g).join(" ");
                    }
                    e.target.value = value;
                  }}
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-mono text-lg tracking-widest"
                />
                {errors.aadhaarNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.aadhaarNumber.message}
                  </p>
                )}
              </div>

              {/* Date of Birth Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  {...register("dateOfBirth", {
                    required: "Date of birth is required",
                  })}
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>

              {/* Security Note */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700">
                  Your Aadhaar data is encrypted and used only for verification
                  purposes.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 btn1color  cursor-pointer font-bold rounded-lg hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    Verify Aadhaar
                  </>
                )}
              </button>

              {/* Cancel Button */}
              <button
                type="button"
                onClick={onClose}
                className="w-full px-6 py-3 border-2 cursor-pointer border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </form>
          </>
        )}

        {/* Success State */}
        {verificationStep === "success" && (
          <div className="text-center py-8">
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Verification Successful!
            </h3>
            <p className="text-gray-600 text-sm">
              Your Aadhaar has been verified. You can now create your digital
              address.
            </p>
          </div>
        )}

        {/* Error State */}
        {verificationStep === "error" && (
          <div className="text-center py-8">
            <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Verification Failed
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {showError}
            </p>
            <button
              onClick={() => setVerificationStep("input")}
              className="w-full px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AadhaarVerificationDialog;
