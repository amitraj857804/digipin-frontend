import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUsername,
  selectUserEmail,
  selectUserId,
  selectUserLoading,
  selectUserError,
  fetchUserDetails,
  selectUserPhone,
  selectUserVerified,
} from "../store/authSlice";
import {
  Mail,
  Phone,
  User,
  Calendar,
  Shield,
  MapPin,
  Edit,
  Camera,
  Copy,
  Loader,
} from "lucide-react";
import toast from "react-hot-toast";
import AadhaarVerificationDialog from "../component/address/AadhaarVerificationDialog";

function UserProfile() {
  const dispatch = useDispatch();
  const username = useSelector(selectUsername);
  const userEmail = useSelector(selectUserEmail);
  const userId = useSelector(selectUserId);
  const userLoading = useSelector(selectUserLoading);
  const userError = useSelector(selectUserError);
  const userPhoneNumber = useSelector(selectUserPhone);
  const userVerified = useSelector(selectUserVerified);
  
  // Local state for editable fields
  const [isEditing, setIsEditing] = useState(false);
  const [showAadhaarDialog, setShowAadhaarDialog] = useState(false);
  const [profileData, setProfileData] = useState({
    username: username || "User",
    email: userEmail || "email@example.com",
    joinDate: new Date().toLocaleDateString(),

    addresses: 3,
  });

  const [editForm, setEditForm] = useState(profileData);

  // Fetch user details on component mount
  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  // Update profile data when store updates
  useEffect(() => {
    if (username || userEmail || userId || userPhoneNumber) {
      setProfileData((prevData) => ({
        ...prevData,
        username: username || prevData.username,
        email: userEmail || prevData.email,
        userId: userId || prevData.userId,
        userPhoneNumber: userPhoneNumber || prevData.userPhoneNumber,
        userVerified: userVerified || prevData.userVerified,
      }));
      setEditForm((prevData) => ({
        ...prevData,
        username: username || prevData.username,
        email: userEmail || prevData.email,
        userId: userId || prevData.userId,
        userPhoneNumberphone: userPhoneNumber || prevData.userPhoneNumber,
      }));
    }
  }, [username, userEmail, userId, userPhoneNumber]);

  const handleEditChange = (field, value) => {
    setEditForm({ ...editForm, [field]: value });
  };

  const handleSaveChanges = () => {
    setProfileData(editForm);
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    setEditForm(profileData);
    setIsEditing(false);
  };

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 mt-16">
      <div className="max-w-4xl mx-auto">
        {/* Loading Indicator */}
        {userLoading && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
            <Loader className="w-5 h-5 text-blue-600 animate-spin" />
            <span className="text-blue-700 font-medium">
              Loading your profile details...
            </span>
          </div>
        )}

        {/* Error Indicator */}
        {userError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <span className="text-red-700 font-medium">{userError}</span>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">User Profile</h1>
          <p className="text-gray-600 mt-2">
            Manage your personal information and account settings
          </p>
        </div>

        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar Section */}
            <div className="relative">
              <div className="w-32 h-32 btn1color rounded-full flex items-center justify-center shadow-lg">
                <User className="w-16 h-16 text-white" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-900">
                {profileData.username}
              </h2>
              <p className="text-gray-600 mt-1">{profileData.email}</p>
              <div className="flex gap-3 mt-4 justify-center md:justify-start flex-wrap">
                {userVerified ? (
                  <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Verified Account
                  </span>
                ) : (
                  <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Verification Pending
                  </span>
                )}
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                  {profileData.addresses} Digital Addresses
                </span>
              </div>
            </div>

            {/* Edit Button */}
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-6 py-3 btn1color cursor-pointer font-bold rounded-lg hover:shadow-lg transition-shadow"
              >
                <Edit className="w-5 h-5" /> Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Profile Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Personal Information
            </h3>
            <div className="space-y-6">
              {/* Username */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <User className="w-4 h-4 text-blue-600" /> Username
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.username}
                    onChange={(e) =>
                      handleEditChange("username", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                ) : (
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-900 font-semibold">
                      {profileData.username}
                    </p>
                    <button
                      onClick={() =>
                        handleCopy(profileData.username, "Username")
                      }
                      className="p-2 hover:bg-gray-200 rounded transition-colors cursor-pointer"
                    >
                      <Copy className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="w-4 h-4 text-blue-600" /> Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => handleEditChange("email", e.target.value)}
                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                ) : (
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-900 font-semibold">
                      {profileData.email}
                    </p>
                    <button
                      onClick={() => handleCopy(profileData.email, "Email")}
                      className="p-2 hover:bg-gray-200 rounded transition-colors cursor-pointer"
                    >
                      <Copy className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Phone className="w-4 h-4 text-blue-600" /> Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editForm.userPhoneNumber}
                    onChange={(e) => handleEditChange("phone", e.target.value)}
                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                ) : (
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-900 font-semibold">
                      {profileData.userPhoneNumber}
                    </p>
                    <button
                      onClick={() =>
                        handleCopy(profileData.userPhoneNumber, "Phone")
                      }
                      className="p-2 hover:bg-gray-200 rounded transition-colors cursor-pointer"
                    >
                      <Copy className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
           {/* Aadhaar Verification Card */}
        <div className=" bg-white rounded-2xl shadow-lg border border-blue-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Aadhaar Verification
              </h3>
              <p className="text-gray-600 mt-1">
                Verify your identity using your Aadhaar number for enhanced security
              </p>
            </div>
            {userVerified ? (
              <div className="px-6 py-3 bg-green-100 text-green-800 rounded-lg font-semibold flex items-center gap-2">
                <Shield className="w-5 h-5" /> Verified
              </div>
            ) : (
              <div className="px-3 py-3 bg-yellow-100 text-yellow-800 rounded-full font-semibold flex items-center gap-2">
                <Shield className="w-5 h-5" /> Pending
              </div>
            )}
          </div>

          {userVerified ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <p className="text-green-700 font-semibold mb-4">
                ✓ Your Aadhaar has been successfully verified
              </p>
              <p className="text-gray-600 text-sm">
                Your account has verified access to all premium features and enhanced security benefits.
              </p>
            </div>
          ) : (
            <div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <p className="text-blue-700 font-semibold mb-2">
                  Why verify your Aadhaar?
                </p>
                <ul className="text-gray-600 text-sm space-y-2 ml-4">
                  <li>✓ Enhanced account security</li>
                  <li>✓ Access to premium features</li>
                  <li>✓ Verified badge on your profile</li>
                  <li>✓ Priority support</li>
                </ul>
              </div>

              <button
                onClick={() => setShowAadhaarDialog(true)}
                className="w-full px-6 py-3 btn1color cursor-pointer font-bold rounded-lg hover:shadow-lg transition-shadow"
              >
                Verify Aadhaar
              </button>
            </div>
          )}
        </div>
        </div>

       

        {/* Aadhaar Verification Dialog */}
        {showAadhaarDialog && (
          <AadhaarVerificationDialog
            isOpen={showAadhaarDialog}
            onClose={() => setShowAadhaarDialog(false)}
            onVerified={() => {
              setShowAadhaarDialog(false);
              dispatch(fetchUserDetails());
            }}
          />
        )}

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex gap-4 mt-8 justify-end">
            <button
              onClick={handleCancel}
              className="px-6 py-3 border-2 cursor-pointer border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveChanges}
              className="px-6 py-3 btn1color cursor-pointer font-bold rounded-lg hover:shadow-lg transition-shadow"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
