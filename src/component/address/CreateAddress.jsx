import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUsername,
  selectUserVerified,
  selectToken,
} from "../../store/authSlice";
import { fetchAllAddresses } from "../../store/addressSlice";
import AadhaarVerificationDialog from "./AadhaarVerificationDialog";
import { Plus, Loader } from "lucide-react";
import api from "../../api/api";
import { createDigitalAddress } from "../../utils/geolocation";

function CreateAddress({ onAddressCreated }) {
  const dispatch = useDispatch();
  const [selectedSuffix, setSelectedSuffix] = useState("home.add");
  const [selectedPurpose, setSelectedPurpose] = useState(
    "Personal - Home Address"
  );
  const [showCustomSuffix, setShowCustomSuffix] = useState(false);
  const [customSuffix, setCustomSuffix] = useState("");
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);
  const username = useSelector(selectUsername);
  const userVerified = useSelector(selectUserVerified);
  const token = useSelector(selectToken);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      addressName: "",
      address: "",
      pincode: "",
      upiPin: "",
      consentType: "PERMANENT",
      consentDurationDays: 365,
    },
    mode: "onTouched",
  });

  const formValues = watch();

  const handleCreateClick = (data) => {
    if (!userVerified) {
      // Store form data and show verification dialog
      setPendingFormData(data);
      setShowVerificationDialog(true);
    } else {
      // User already verified, create address directly
      addHandler(data);
    }
  };

  const handleVerified = async (verificationData) => {
    // After verification, proceed to create address with stored form data
    toast.success("Aadhaar verified!");
    if (pendingFormData) {
      addHandler(pendingFormData);
      setPendingFormData(null);
    }
  };
  const addHandler = async (data) => {
    if (!data) return; // Guard against no data

    setIsCreating(true);
    try {
      // Prepare address data with suffix
      const addressData = {
        suffix: selectedSuffix,
        address: data.address,
        addressName: data.addressName,
        pincode: data.pincode,
        purpose: data.purpose,
        uniPin: data.uniPin,
        consentType: data.consentType,
        consentDurationDays: parseInt(data.consentDurationDays),
      };

      // Create digital address with geolocation
      const result = await createDigitalAddress(addressData, api, toast, token);

      // Reset form on success
      reset();
      setSelectedSuffix("home.add");
      setCustomSuffix("");
      setShowCustomSuffix(false);

      // Show success message with created address
      if (result?.address) {
        toast.success(`Digital address created: ${result.address}`);
      }

      // Dispatch Redux action to refresh addresses globally
      dispatch(fetchAllAddresses());

      // Call parent callback if provided
      if (onAddressCreated) {
        onAddressCreated();
      }
    } catch (error) {
      console.error("Error creating digital address:", error);
      // Error is already handled by createDigitalAddress function
    } finally {
      setIsCreating(false);
    }
  };
  return (
    <>
      {/* Create Digital Address Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8 mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Create Digital Address
        </h2>
        <p className="text-gray-600 mb-8">
          Generate a new digital address for different needs
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form Section */}
          <form onSubmit={handleSubmit(handleCreateClick)}>
            <div className="space-y-2">
              <div className="flex gap-3">
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Purpose
                  </label>
                  <select
                    {...register("purpose")}
                    className="w-full  py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  >
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
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address Name
                  </label>
                  <InputField
                    required={true}
                    id="addressName"
                    type="text"
                    message="*Address name is required"
                    placeholder="e.g. My Home, Work Office"
                    register={register}
                    errors={errors}
                    className="mb-2 w-full  py-2 border !border-blue-200 rounded-lg  transition-all"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address
                  </label>
                  <InputField
                    required={true}
                    id="address"
                    type="text"
                    message="*physical address required"
                    placeholder="Enter your physical address"
                    register={register}
                    errors={errors}
                    className="mb-2 w-full px-4 py-2 border !border-blue-200 rounded-lg  transition-all"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pincode
                  </label>
                  <InputField
                    required
                    id="pincode"
                    type="number"
                    message="*Pincode required"
                    placeholder="Enter pincode"
                    register={register}
                    errors={errors}
                    className="mb-2 w-full px-4 py-2 border !border-blue-200 rounded-lg  transition-all"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Consent Type
                  </label>
                  <select
                    {...register("consentType")}
                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  >
                    <option value="PERMANENT">Permanent</option>
                    <option value="TEMPORARY">Temporary</option>
                  </select>
                </div>
                {formValues.consentType === "TEMPORARY" && (
                  <div className="w-1/2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Valid for (days)
                    </label>
                    <InputField
                      required={true}
                      id="consentDurationDays"
                      type="number"
                      message="*Number of days is required"
                      placeholder="e.g., 30, 90, 365"
                      register={register}
                      errors={errors}
                      className="mb-2 w-full px-4 py-2 border !border-blue-200 rounded-lg transition-all"
                    />
                  </div>
                )}
              </div>

              {formValues.consentType === "TEMPORARY" && (
                <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-900 font-semibold">
                    ⓘ Temporary Consent
                  </p>
                  <p className="text-xs text-amber-800 mt-2">
                    Your digital address will be accessible only for the
                    specified number of days. After expiration, partners will
                    need your permission again to access your address.
                  </p>
                </div>
              )}

              <div className="w-full">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  DaPin (Digital Address PIN)
                </label>
                <InputField
                  required
                  id="uniPin"
                  type="text"
                  inputmode="numeric"
                  message="*DaPin must be exactly 6 digits"
                  placeholder="Enter a 6 digit pin (e.g., 123456)"
                  register={register}
                  errors={errors}
                  length={6}
                  className="mb-2 w-full px-4 py-2 border !border-blue-200 rounded-lg transition-all"
                  onInput={(e) => {
                    // Remove any non-numeric characters
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Digital Address
                </label>
                <div className="flex gap-2 items-center bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg ">
                  {/* Digital Address Input */}
                  <div className="flex-1">
                    <input
                      type="text"
                      value={username || ""}
                      disabled
                      placeholder="Your address"
                      className="w-full bg-transparent px-4 py-2 focus:outline-none font-semibold text-gray-800 placeholder-gray-400"
                    />
                  </div>

                  {/* Separator */}
                  <div className="text-gray-400 text-lg">@</div>

                  {/* Suffix Select/Input */}
                  <div className="relative group mr-1">
                    <select
                      value={selectedSuffix}
                      onChange={(e) => {
                        if (e.target.value === "custom") {
                          setShowCustomSuffix(true);
                        } else {
                          setSelectedSuffix(e.target.value);
                          setShowCustomSuffix(false);
                        }
                      }}
                      className="w-full bg-white px-2 py-1 pr-4 focus:ring-1 focus:ring-blue-600 font-semibold text-gray-700 rounded-md cursor-pointer border border-blue-300 hover:border-blue-400 transition-all"
                    >
                      <option value="home.add">home.add</option>
                      <option value="work.add">work.add</option>
                      <option value="office.add">office.add</option>
                      <option value="personal.add">personal.add</option>
                      <option value="custom">+ Create Custom</option>
                    </select>
                  </div>
                </div>

                {/* Custom Suffix Input */}
                {showCustomSuffix && (
                  <div className="mt-3 flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter custom suffix (e.g., mybiz.add)"
                      value={customSuffix}
                      onChange={(e) => setCustomSuffix(e.target.value)}
                      className="flex-1 px-4 py-1 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (customSuffix) {
                          setSelectedSuffix(customSuffix);
                          setShowCustomSuffix(false);
                        }
                      }}
                      className="px-4 py-1 cursor-pointer bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
                    >
                      Save
                    </button>
                  </div>
                )}

                {/* Preview of complete address */}
                <div className="mt-3 px-4 py-1 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-gray-600 font-semibold uppercase">
                    Complete Address
                  </p>
                  <p className="text-lg font-bold text-blue-600">
                    {username}@{selectedSuffix}
                  </p>
                </div>
              </div>
              <button
                type="submit"
                disabled={isCreating}
                className="w-full px-6 py-3 btn2color font-bold rounded-lg shadow-lg cursor-pointer hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCreating ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" /> Creating...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" /> Create Address
                  </>
                )}
              </button>
            </div>
          </form>
          <div className="gap-8 flex flex-col">
            {/* Preview Section */}
            <div className="flex flex-col justify-center">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">
                  Preview
                </p>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500">Purpose</p>
                    <p className="text-lg font-bold text-gray-900">
                      Personal - Home Address
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Address Name</p>
                    <p className="text-lg font-bold text-gray-900">My Home</p>
                  </div>
                  <div className="pt-4 border-t border-blue-200">
                    <p className="text-xs text-gray-500 mb-2">
                      Your Generated ID
                    </p>
                    <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text font-mono">
                      DIP-XXXXXXXXXX
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2 p-3 bg-blue-50 border border-2 border-blue-200 rounded-lg">
              <p className="text-xs font-semibold text-blue-900 mb-1">
                🔐 What is DaPin?
              </p>
              <p className="text-xs text-blue-800 leading-relaxed">
                DaPin is your{" "}
                <span className="font-semibold">Digital Address PIN</span> - a
                security layer that acts as a{" "}
                <span className="font-semibold">consent granter</span>. When you
                share your digital address with partners or service providers,
                they will need this PIN to access your information. This ensures
                only authorized parties can use your digital address and gives
                you complete control over who accesses your data.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Aadhaar Verification Dialog */}
      <AadhaarVerificationDialog
        isOpen={showVerificationDialog}
        onClose={() => setShowVerificationDialog(false)}
        onVerified={handleVerified}
      />
    </>
  );
}

export default CreateAddress;
