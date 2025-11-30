import { useEffect, useState } from "react";
import InputField from "./InputField";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../api/api";
import { useSelector, useDispatch } from "react-redux";
import { setToken, selectToken } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

function Login({ onSwitchTab, onClose, isModal = false }) {
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const loginHandler = async (data) => {
    setLoader(true);
    try {
      const { data: response } = await api.post("/api/auth/login", data);

      dispatch(setToken(response.token));
      reset();
      toast.success(" Login Successful!");
      onClose("false");
      navigate("home");
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Login failed. Please try again."
      );
    } finally {
      setLoader(false);
    }
  };

  const navigateToResetPassword = () => {};

  const navigateToSignUp = () => {
    if (isModal && onSwitchTab) {
      onSwitchTab("signup");
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
          onSubmit={handleSubmit(loginHandler)}
          className={`w-full ${
            isModal
              ? "py-4 px-6 sm:py-8 sm:px-10 lg:px-14 overflow-hidden"
              : "py-6 px-6 sm:px-10"
          } rounded-xl `}
        >
          {/* Header */}
          <div className="flex justify-around mb-6 px-10">
            <h1
              className="text-center px-4 py-2 btn2color font-bold lg:text-2xl text-xl cursor-pointer relative 
                         rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              Login
            </h1>
            <h1
              className="text-center text-blue-600 font-serif font-bold lg:text-2xl text-xl cursor-pointer hover:text-blue-700 hover:scale-105 transition-transform"
              onClick={navigateToSignUp}
            >
              Sign Up
            </h1>
          </div>

          <hr className="mt-2 mb-5 border-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent" />

          {/* Input Fields */}
          <div className="flex flex-col text-gray-700 gap-4  justify-center items-center px-10">
            {/* Email/Mobile */}
            <div className="w-full">
              <div className="flex items-center gap-2">
                <FaUser className="text-blue-600 text-xl opacity-90" />

                <div className="w-full relative">
                  <InputField
                    requireda
                    id="emailOrPhone"
                    type="text"
                    message="*Email or Mobile Number is required"
                    placeholder="E-mail or Mobile Number"
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

            {/* Password */}
            <div className="w-full">
              <div className="flex items-center gap-2">
                <RiLockPasswordFill className="text-blue-600 text-xl opacity-90" />

                <div className="relative w-full">
                  <InputField
                    required
                    id="password"
                    type={showPassword ? "text" : "password"}
                    message="*Password is required"
                    placeholder="Password"
                    register={register}
                    min={6}
                    errors={errors}
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
              className="font-semibold btn2color flex justify-center items-center     
                         w-32 h-11 py-2 rounded-full shadow-lg 
                         hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 my-2 cursor-pointer disabled:opacity-70"
            >
              {loader && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              {loader ? "" : "Login"}
            </button>
          </div>

          {/* Additional Links */}
          <div className="flex flex-col gap-3 mt-6 text-center">
            <button
              type="button"
              onClick={navigateToResetPassword}
              className="text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              Forgot Password?
            </button>
            <div className="text-sm text-gray-700">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={navigateToSignUp}
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
