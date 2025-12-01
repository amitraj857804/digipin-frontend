import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { MapPin, Loader, CheckCircle, Plus, Home, Phone, Shield, Trash2 } from "lucide-react";
import api from "../../api/api";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/authSlice";

function User_AIU() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]); // ✅ multiple addresses
  const token = useSelector(selectToken);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phoneNumber: "",
      digitalAddress: "",
      daPin: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await api.post(
        "/api/aiu/store",
        {
          name: data.name,
          phoneNumber: data.phoneNumber,
          digitalAddress: data.digitalAddress,
          daPin: data.daPin,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        toast.success("Address stored successfully!");
        setSavedAddresses((prev) => [...prev, response.data]); // ✅ add to list
        reset();
      }
    } catch (error) {
      console.error("Error storing user address:", error);
      toast.error(error.response?.data?.message || "Failed to store address");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-4">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            My Digital Addresses
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your digital addresses for seamless deliveries
          </p>
        </div>
        {/* Saved Addresses Section */}
        {savedAddresses.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/50">
            <div className="px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-white" />
                <h2 className="text-lg font-bold text-white">
                  Saved Addresses ({savedAddresses.length})
                </h2>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {savedAddresses.map((addr, idx) => (
                <div key={idx} className="px-6 py-5 hover:bg-blue-50 transition-colors group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
                          {addr.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-base font-bold text-gray-900">
                            {addr.name}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {addr.phoneNumber}
                          </p>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-2 rounded-lg border border-blue-200">
                        <p className="text-xs text-gray-500 mb-1 font-medium">Digital Address</p>
                        <p className="text-sm font-mono text-blue-600 break-all font-bold">
                          {addr.digitalAddress}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button className="px-4 py-2 bg-gradient-to-r from-[#fb641b] to-[#e85c0d] text-white text-xs font-bold rounded-lg hover:shadow-lg transition-all transform hover:scale-105">
                        DELIVER HERE
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add New Address Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/50 overflow-hidden">
            <div className="px-6 py-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  Add New Address
                </h2>
              </div>
            </div>

            <div className="px-6 py-6 space-y-5">
              {/* Name */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Home className="w-4 h-4 text-blue-600" />
                  Full Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Please enter name" })}
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-3 text-sm border rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Phone className="w-4 h-4 text-blue-600" />
                  Mobile Number
                </label>
                <input
                  type="tel"
                  {...register("phoneNumber", {
                    required: "Please enter phone number",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Enter valid 10 digit number",
                    },
                  })}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className={`w-full px-4 py-3 text-sm border rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all ${
                    errors.phoneNumber ? "border-red-500" : "border-gray-300"
                  }`}
                  onInput={(e) =>
                    (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                  }
                />
                {errors.phoneNumber && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              {/* Digital Address */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  Digital Address
                </label>
                <input
                  type="text"
                  {...register("digitalAddress", {
                    required: "Please enter digital address",
                  })}
                  placeholder="e.g., username@home.add"
                  className={`w-full px-4 py-3 text-sm border rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-mono ${
                    errors.digitalAddress ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.digitalAddress && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.digitalAddress.message}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">Format: username@suffix</p>
              </div>

              {/* DaPin */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Shield className="w-4 h-4 text-blue-600" />
                  DaPin (Security PIN)
                </label>
                <input
                  type="password"
                  {...register("daPin", {
                    required: "Please enter DaPin",
                    pattern: {
                      value: /^[0-9]{6}$/,
                      message: "DaPin must be 6 digits",
                    },
                  })}
                  placeholder="Enter 6-digit PIN"
                  maxLength={6}
                  className={`w-full px-4 py-3 text-sm border rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all ${
                    errors.daPin ? "border-red-500" : "border-gray-300"
                  }`}
                  onInput={(e) =>
                    (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                  }
                />
                {errors.daPin && (
                  <p className="text-xs text-red-600 mt-1">{errors.daPin.message}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">6-digit security PIN for address access</p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-gradient-to-r from-[#fb641b] to-[#e85c0d] hover:from-[#e85c0d] hover:to-[#d94d05] text-white font-bold text-sm uppercase rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Saving Address...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Save Address
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default User_AIU;
