import { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import api from "../api/api";
import "../App.css";
import { FaUser, FaEye, FaEyeSlash, FaPhoneSquareAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import toast from "react-hot-toast";

const SignUp = ({
  onSwitchTab,
  isModal = false,
}) => {
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
      emailId: "",
      password: "",
      phoneNumber: "",
    },
    mode: "onTouched",
  });

  const registerHandler = async (data) => {
    setLoader(true);
    try {
      const { data: response } = await api.post("/api/auth/register", data);
      reset();
      if (isModal && onSwitchTab) {
        onSwitchTab("login");
      }
      toast.success("SignedUp Successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.response?.data.error ||
          "Signup failed. Please try again."
      );
    } finally {
      setLoader(false);
    }
  };

  const navigateToLogin = () => {
    if (isModal && onSwitchTab) {
      onSwitchTab("login");
    }
  };

  return (
    <div
      className={`${
        isModal
          ? "w-full overflow-hidden"
          : "mt-20 sm:mt-24 mb-10 w-full flex justify-center"
      }`}
    >
      <div>
        <form
          onSubmit={handleSubmit(registerHandler)}
          className={`w-full ${
            isModal
              ? "py-4 px-6 sm:py-8 sm:px-10 lg:px-14 overflow-hidden"
              : "py-6 px-6 sm:px-10"
          } rounded-xl`}
        >
          {/* Header */}
          <div className="flex justify-around mb-6 px-10">
            <h1
              className="text-center text-blue-600 font-serif font-bold lg:text-2xl text-xl cursor-pointer hover:text-blue-700 hover:scale-105 transition-transform"
              onClick={navigateToLogin}
            >
              Login
            </h1>
            <h1 className="text-center px-4 py-2 btn2color font-bold lg:text-2xl text-xl cursor-pointer relative  rounded-lg shadow-md hover:shadow-lg transition-shadow">
              SignUp
            </h1>
          </div>

          <hr className="mt-2 mb-5 border-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent" />

          {/* Input Fields */}
          <div className="flex flex-col text-gray-700 gap-4 px-10 justify-center items-center">
            {/* Full Name */}
            <div className="w-full">
              <div className="flex items-center gap-2 w-full">
                <FaUser className="text-blue-600 text-xl opacity-90" />

                <div className="relative w-full">
                  <InputField
                    id="userName"
                    type="text"
                    message="*Name required"
                    placeholder="Full Name"
                    register={register}
                    errors={errors}
                    required={true}
                  />
                </div>
              </div>
              {errors.userName?.message && (
                <p className="text-xs font-semibold text-red-600 px-7 mt-1">
                  {errors.userName?.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="w-full">
              <div className="flex items-center gap-2 w-full">
                <MdEmail className="text-blue-600 text-xl opacity-90" />

                <div className="relative w-full">
                  <InputField
                    id="emailId"
                    type="email"
                    message="*Email required"
                    placeholder="E-mail"
                    register={register}
                    errors={errors}
                    required={true}
                  />
                </div>
              </div>
              {errors.email?.message && (
                <p className="text-xs font-semibold text-red-600 px-7 mt-1">
                  {errors.email?.message}
                </p>
              )}
            </div>

            {/* Mobile Number */}
            <div className="w-full">
              <div className="flex items-center gap-2 w-full">
                <FaPhoneSquareAlt className="text-blue-600 text-xl opacity-90" />

                <div className="relative w-full">
                  <InputField
                    id="phoneNumber"
                    type="number"
                    message="*Mobile number required"
                    placeholder="Mobile number"
                    register={register}
                    errors={errors}
                    required={true}
                  />
                </div>
              </div>
              {errors.phoneNumber?.message && (
                <p className="text-xs font-semibold text-red-600 px-7 mt-1">
                  {errors.phoneNumber?.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="w-full">
              <div className="flex items-center gap-2 w-full">
                <RiLockPasswordFill className="text-blue-600 text-xl opacity-90" />

                <div className="relative w-full">
                  <InputField
                    id="password"
                    type={showPassword ? "text" : "password"}
                    message="*Password required"
                    placeholder="Password"
                    register={register}
                    errors={errors}
                    required={true}
                  />

                  <div
                    className="absolute right-3 top-3.5 cursor-pointer text-blue-600 opacity-90 hover:text-blue-700 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-xl" />
                    ) : (
                      <FaEye className="text-xl" />
                    )}
                  </div>
                </div>
              </div>
              {errors.password?.message && (
                <p className="text-xs font-semibold text-red-600 px-7 mt-1">
                  {errors.password?.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-7">
            <button
              disabled={loader}
              type="submit"
              className="font-semibold  flex justify-center items-center  btn2color
                         w-32 h-11 py-2 rounded-full shadow-lg 
                         hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 my-2 cursor-pointer disabled:opacity-70"
            >
              {loader && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              {loader ? "" : "Sign Up"}
            </button>
          </div>

          {/* Already have account link */}
          <div className="text-center mt-6 text-sm text-gray-700">
            Already have an account?{" "}
            <button
              type="button"
              onClick={navigateToLogin}
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors cursor-pointer"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
