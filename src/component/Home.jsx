import { useState } from "react";
import {
  MapPin,
  Plus,
  Copy,
  Share2,
  Eye,
  Lock,
  Zap,
  TrendingUp,
} from "lucide-react";
import toast from "react-hot-toast";
import CreateAddress from "./CreateAddress";

function Home() {
  const [digitalAddress] = useState("DIP-9876543210");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(digitalAddress);
    setCopied(true);
    toast.success("Digital address copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-16 bg-gradient-to-b from-white via-blue-50 to-indigo-50 min-h-screen">
      {/* Welcome Section */}
      <div className="pt-12 pb-16 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome to Your Digital 
            <span className="btn2color bg-clip-text text-transparent">
              Address Hub
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage, share, and track your digital address all in one place. Get
            started by creating your unique address or managing existing ones.
          </p>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Digital Address Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-blue-100 p-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-blue-600" />
                    Your Digital Address
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Your unique identifier for receiving deliveries
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold">
                  <Eye className="w-4 h-4" /> Active
                </div>
              </div>

              {/* Address Display */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide mb-2">
                  Your Address ID
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text font-mono">
                    {digitalAddress}
                  </p>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-blue-50 border border-blue-200 rounded-lg font-semibold text-blue-600 transition-all hover:scale-105"
                  >
                    <Copy className="w-5 h-5" />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-100">
                  <p className="text-3xl font-bold text-blue-600">24</p>
                  <p className="text-sm text-gray-600 mt-1">Deliveries</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-4 text-center border border-indigo-100">
                  <p className="text-3xl font-bold text-indigo-600">12</p>
                  <p className="text-sm text-gray-600 mt-1">Shared With</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center border border-purple-100">
                  <p className="text-3xl font-bold text-purple-600">8</p>
                  <p className="text-sm text-gray-600 mt-1">Pending</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 btn1color font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all">
                  <Share2 className="w-5 h-5" /> Share Address
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all">
                  <Eye className="w-5 h-5" /> View Details
                </button>
              </div>
            </div>
          </div>

          {/* Side Stats Card */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 btn1color p-0 rounded-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">
                    Account Status
                  </p>
                  <p className="text-lg font-bold text-gray-900">Premium</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Full access to all features
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">
                    Security
                  </p>
                  <p className="text-lg font-bold text-gray-900">Verified</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">All information secured</p>
            </div>

            <div className="btn2color rounded-xl shadow-lg p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Create New Address</h3>
              <p className="text-blue-100 text-sm mb-4">
                Generate additional digital addresses for different purposes
              </p>
              <button className="w-full flex items-center text-indigo-600 justify-center gap-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 font-semibold rounded-lg transition-all">
                <Plus className="w-5 h-5 text-blue-600 " /> Add New
              </button>
            </div>
          </div>
        </div>

        <CreateAddress />

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6 hover:shadow-xl transition-all">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg mb-4">
              <Share2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Easy Sharing
            </h3>
            <p className="text-gray-600 text-sm">
              Share your digital address with anyone safely and securely
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6 hover:shadow-xl transition-all">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Track Activity
            </h3>
            <p className="text-gray-600 text-sm">
              Monitor all deliveries and access requests in real-time
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6 hover:shadow-xl transition-all">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-pink-600 to-red-600 rounded-lg mb-4">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Enhanced Security
            </h3>
            <p className="text-gray-600 text-sm">
              Protect your privacy with advanced encryption and controls
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
