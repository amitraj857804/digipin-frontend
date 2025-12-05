import { useState } from "react";
import { Info, ChevronDown } from "lucide-react";
import AAVA_DemoInfo from "./AAVA_DemoInfo";
import AAVA_Verification from "./AAVA_Verification";

function AAVA_DemoComplete() {
  const [activeSection, setActiveSection] = useState("info");
  const [expandedInfo, setExpandedInfo] = useState(true);

  return (
    <div className="mt-20 sm:mt-24 mb-10 w-full flex justify-center">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="flex gap-2 sm:gap-4 mb-8 flex-col sm:flex-row">
          <button
            onClick={() => setActiveSection("info")}
            className={`flex-1 px-4 sm:px-6 py-3 cursor-pointer rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
              activeSection === "info"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Info className="w-5 h-5" />
            <span className="hidden sm:inline">How It Works</span>
            <span className="sm:hidden">Demo</span>
          </button>
          <button
            onClick={() => setActiveSection("verification")}
            className={`flex-1 cursor-pointer px-4 sm:px-6 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
              activeSection === "verification"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>Try Verification</span>
          </button>
        </div>

        {/* Info Section - Collapsible */}
        <div className="mb-8">
          {activeSection === "info" && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Collapsible Header */}
              <button
                onClick={() => setExpandedInfo(!expandedInfo)}
                className="w-full px-6 sm:px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-between hover:shadow-lg transition-all"
              >
                <span className="font-bold text-lg sm:text-xl">📚 Learn: How AAVA Verification Works</span>
                <ChevronDown
                  className={`w-6 h-6 transition-transform ${expandedInfo ? "rotate-180" : ""}`}
                />
              </button>

              {/* Content */}
              {expandedInfo && (
                <div className="px-0 py-0">
                  <AAVA_DemoInfo isModal={false} />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Verification Section */}
        {activeSection === "verification" && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="px-6 sm:px-8 py-6 sm:py-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">🔐 Try AAVA Verification Demo</h2>
              <p className="text-blue-100">
                See how agents would verify digital addresses. Fill in the form below to submit a verification request.
              </p>
            </div>

            <div className="px-0 py-0">
              <AAVA_Verification />
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">📖 Quick Reference</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <h4 className="font-bold text-blue-600 mb-2">What is AAVA?</h4>
              <p className="text-sm text-gray-700">
                Automated Avatar Verification Agent - A system that automatically verifies digital addresses through location confirmation and photo evidence.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <h4 className="font-bold text-blue-600 mb-2">Verification Timeline</h4>
              <p className="text-sm text-gray-700">
                Typically completed within 6-8 hours from submission. Includes location verification, photo capture, and confidence score update.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <h4 className="font-bold text-blue-600 mb-2">Security Features</h4>
              <p className="text-sm text-gray-700">
                Geo-tagged photos, tamper-proof logging, real-time tracking, and encrypted data storage ensure maximum security.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <h4 className="font-bold text-blue-600 mb-2">Use Cases</h4>
              <p className="text-sm text-gray-700">
                Government services, legal notices, e-commerce deliveries, emergency response, and any service requiring address verification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AAVA_DemoComplete;
