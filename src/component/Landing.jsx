
import { MapPin, Shield, Clock, Users, ArrowRight, CheckCircle } from 'lucide-react'

function Landing({ onOpenLoginModal, onOpenSignupModal }) {
  return (
    <div className="w-full bg-gradient-to-b from-white via-blue-50 to-indigo-50">
      {/* Main Hero Section */}
      <div className="pt-32 pb-20 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Your Digital
                <span className="btn2color bg-clip-text text-transparent"> Address</span>
                Solution
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Say goodbye to complicated address sharing. <span className="btn2color p-0 bg-clip-text text-transparent">eSthan</span> provides a unique digital address for everyone, making it easier to receive deliveries, directions, and more.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700 font-medium">Get your unique digital address instantly</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700 font-medium">Share safely with businesses and friends</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700 font-medium">Track deliveries and manage access</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700 font-medium">Enhanced security and privacy</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={onOpenSignupModal}
                className="px-8 py-4 btn2color cursor-pointer font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={onOpenLoginModal}
                className="px-8 py-4 border-2 border-blue-600 text-blue-600  cursor-pointer font-bold rounded-lg hover:bg-blue-50 transition-all duration-200"
              >
                Already have an account?
              </button>
            </div>
          </div>

          {/* Right Side - Illustration/Card */}
          <div className="hidden lg:flex justify-center mt-[-50px]">
            <div className="relative w-full max-w-md">
              {/* Main Card */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-blue-100">
                <div className="flex items-center justify-center w-16 h-16 btn1color rounded-lg mx-auto mb-6">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Your Digital Address</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">DIP-1234567890</p>
                  </div>

                  <div className="pt-4 space-y-3 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Location:</span>
                      <span className="text-gray-900 font-semibold">Active</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Deliveries:</span>
                      <span className="text-gray-900 font-semibold">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Security:</span>
                      <span className="flex items-center gap-1 text-green-600 font-semibold">
                        <Shield className="w-4 h-4" /> Secure
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -bottom-10 -left-6 bg-white rounded-xl shadow-lg p-4 border border-blue-100 max-w-xs">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500">Created</p>
                    <p className="text-sm font-semibold text-gray-900">2 weeks ago</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-10 -right-6 bg-white rounded-xl shadow-lg p-4 border border-blue-100 max-w-xs">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500">Shared with</p>
                    <p className="text-sm font-semibold text-gray-900">5 people</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 md:px-8 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose <span className="btn2color p-0 bg-clip-text text-transparent">eSthan</span>?</h2>
            <p className="text-xl text-gray-600">Everything you need for seamless digital address management</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Unique Address</h3>
              <p className="text-gray-600">Get a memorable digital address instantly without any hassle</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Sharing</h3>
              <p className="text-gray-600">Control who can access your address with advanced privacy settings</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Real-time Tracking</h3>
              <p className="text-gray-600">Track deliveries and manage access in real-time with instant notifications</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Easy Collaboration</h3>
              <p className="text-gray-600">Share your address with family, friends, and businesses effortlessly</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 md:px-8 lg:px-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to simplify your address?</h2>
          <p className="text-xl text-blue-100 mb-8">Join thousands of users who are already enjoying the DigiPin experience</p>
          <button
            onClick={onOpenSignupModal}
            className="px-10 py-4 cursor-pointer bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center gap-2"
          >
            Create Your Free Account
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Landing
