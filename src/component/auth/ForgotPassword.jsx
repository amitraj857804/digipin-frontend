import { useState } from "react";
import InputField from "../InputField";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { FaUser, FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import api from "../../api/api";

function ForgotPassword({ onBack, isModal = false }) {
  const [loader, setLoader] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      emailOrPhone: "",
      aadhaarNumber: "",
      dateOfBirth: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  });

  const newPassword = watch("newPassword");

  const forgotPasswordHandler = async (data) => {
    // Validate passwords match
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoader(true);
    try {
      const payload = {
        emailOrPhone: data.emailOrPhone,
        aadhaarNumber: data.aadhaarNumber,
        dateOfBirth: data.dateOfBirth,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      };

      const response = await api.post("/api/auth/forgot-password", payload);

      setResetSent(true);
      reset();
      toast.success("Password reset successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.error || 
        error.response?.data?.message ||
        "Failed to reset password. Please try again."
      );
      console.error("Forgot password error:", error);
    } finally {
      setLoader(false);
    }
  };

  // Reset view when going back
  const handleGoBack = () => {
    setResetSent(false);
    reset();
    if (onBack) {
      onBack();
    }
  };

  if (resetSent) {
    return (
      <div
        className={`${
          isModal
            ? "w-full overflow-hidden scrollbar-hide"
            : "mt-20 sm:mt-24 mb-10 w-full flex justify-center overflow-hidden scrollbar-hide"
        }`}
      >
        <div>
          <div className="py-6 px-6 sm:px-10 rounded-xl scrollbar-hide">
            {/* Success Header */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold btn2color bg-clip-text text-transparent mb-2">
                Password Reset Successfully!
              </h1>
              <p className="text-gray-600 text-sm">
                Your password has been updated successfully
              </p>
            </div>

            {/* Success Message */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">✓ Success:</span>
              </p>
              <ul className="text-sm text-gray-700 mt-2 space-y-2">
                <li>✓ Your password has been reset</li>
                <li>✓ You can now login with your new password</li>
                <li>✓ For security, please keep your new password safe</li>
              </ul>
            </div>

            {/* Back to Login Button */}
            <div className="flex justify-center mt-6">
              <button
                type="button"
                onClick={handleGoBack}
                className="font-semibold btn2color flex justify-center items-center gap-2
                           w-48 h-11 py-2 rounded-full shadow-lg 
                           hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 my-2 cursor-pointer text-white"
              >
                <FaArrowLeft className="text-lg" />
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${
        isModal
          ? "w-full overflow-hidden scrollbar-hide "
          : "mt-20 sm:mt-24 mb-10 w-full flex justify-center overflow-hidden scrollbar-hide"
      }`}
    >
      <div>
        <form
          onSubmit={handleSubmit(forgotPasswordHandler)}
          className="py-4 px-6 sm:px-10 rounded-xl scrollbar-hide"
        >
          {/* Header */}
          <div className="mb-2">
            <h1 className="text-2xl font-bold btn2color bg-clip-text text-transparent mb-2">
              Reset Password
            </h1>
            
          </div>

          <hr className="mt-2 mb-5 border-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent" />

          {/* Form Fields */}
          <div className="flex flex-col text-gray-700 gap-4 justify-center items-center px-10">
            {/* Email or Phone */}
            <div className="w-full">
              <div className="flex items-center gap-2">
                <FaUser className="text-blue-600 text-xl opacity-90" />
                <div className="w-full relative">
                  <InputField
                    required
                    id="emailOrPhone"
                    type="text"
                    message="*Email or Phone Number is required"
                    placeholder="Enter your email or phone number"
                    register={register}
                    errors={errors}
                    className="mb-2"
                  />
                </div>
              </div>
              {errors.emailOrPhone?.message && (
                <p className="text-xs font-semibold text-red-600 px-7 mt-1">
                  {errors.emailOrPhone?.message}
                </p>
              )}
            </div>

            {/* Aadhaar Number */}
            <div className="w-full">
              <div className="flex items-center gap-2">
                <FaUser className="text-blue-600 text-xl opacity-90" />
                <div className="w-full relative">
                  <InputField
                    required
                    id="aadhaarNumber"
                    type="text"
                    message="*Aadhaar Number is required (12 digits)"
                    placeholder="Enter your Aadhaar Number"
                    register={register}
                    errors={errors}
                    maxLength="12"
                    className="mb-2"
                  />
                </div>
              </div>
              {errors.aadhaarNumber?.message && (
                <p className="text-xs font-semibold text-red-600 px-7 mt-1">
                  {errors.aadhaarNumber?.message}
                </p>
              )}
            </div>

            {/* Date of Birth */}
            <div className="w-full">
              <div className="flex items-center gap-2">
                <FaUser className="text-blue-600 text-xl opacity-90" />
                <div className="w-full relative">
                  <InputField
                    required
                    id="dateOfBirth"
                    type="date"
                    message="*Date of Birth is required"
                    placeholder="Enter your Date of Birth"
                    register={register}
                    errors={errors}
                    className="mb-2"
                  />
                </div>
              </div>
              {errors.dateOfBirth?.message && (
                <p className="text-xs font-semibold text-red-600 px-7 mt-1">
                  {errors.dateOfBirth?.message}
                </p>
              )}
            </div>

            {/* New Password */}
            <div className="w-full">
              <div className="flex items-center gap-2">
                <RiLockPasswordFill className="text-blue-600 text-xl opacity-90" />
                <div className="relative w-full">
                  <InputField
                    required
                    id="newPassword"
                    type={showPasswords.newPassword ? "text" : "password"}
                    message="*New Password is required (min 6 characters)"
                    placeholder="Enter new password"
                    register={register}
                    min={6}
                    errors={errors}
                  />
                  <div
                    className="absolute right-3 top-3.5 cursor-pointer text-blue-600 opacity-90 hover:text-blue-700 transition-colors"
                    onClick={() =>
                      setShowPasswords((prev) => ({
                        ...prev,
                        newPassword: !prev.newPassword,
                      }))
                    }
                  >
                    {showPasswords.newPassword ? (
                      <FaEyeSlash className="text-xl" />
                    ) : (
                      <FaEye className="text-xl" />
                    )}
                  </div>
                </div>
              </div>
              {errors.newPassword?.message && (
                <p className="text-xs font-semibold text-red-600 px-7 mt-1">
                  {errors.newPassword?.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="w-full">
              <div className="flex items-center gap-2">
                <RiLockPasswordFill className="text-blue-600 text-xl opacity-90" />
                <div className="relative w-full">
                  <InputField
                    required
                    id="confirmPassword"
                    type={showPasswords.confirmPassword ? "text" : "password"}
                    message="*Confirm Password is required"
                    placeholder="Confirm new password"
                    register={register}
                    min={6}
                    errors={errors}
                    validate={(value) =>
                      value === newPassword || "Passwords do not match"
                    }
                  />
                  <div
                    className="absolute right-3 top-3.5 cursor-pointer text-blue-600 opacity-90 hover:text-blue-700 transition-colors"
                    onClick={() =>
                      setShowPasswords((prev) => ({
                        ...prev,
                        confirmPassword: !prev.confirmPassword,
                      }))
                    }
                  >
                    {showPasswords.confirmPassword ? (
                      <FaEyeSlash className="text-xl" />
                    ) : (
                      <FaEye className="text-xl" />
                    )}
                  </div>
                </div>
              </div>
              {errors.confirmPassword?.message && (
                <p className="text-xs font-semibold text-red-600 px-7 mt-1">
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-7">
            <button
              disabled={loader}
              type="submit"
              className="font-semibold btn2color flex justify-center items-center     
                         w-40 h-11 py-2 rounded-full shadow-lg 
                         hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 my-2 cursor-pointer disabled:opacity-70 text-white"
            >
              {loader && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              )}
              {loader ? "Resetting..." : "Reset Password"}
            </button>
          </div>

          {/* Back Button */}
          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={handleGoBack}
              className="text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors flex items-center gap-2 cursor-pointer"
            >
              <FaArrowLeft className="text-sm" />
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
