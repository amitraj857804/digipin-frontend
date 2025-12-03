import {
  MapPin,
  Shield,
  Zap,
  Users,
  ArrowRight,
  CheckCircle,
  Award,
  Target,
} from "lucide-react";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pt-4 mt-14">
      {/* Hero Section */}
      <div className="px-4 md:px-8 lg:px-12 max-w-7xl mx-auto py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-6">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            About eSthan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Revolutionizing digital address management for a more private,
            secure, and efficient delivery experience
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Our Mission
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              At eSthan, we believe that your privacy matters. We're building a
              revolutionary system that allows you to receive deliveries without
              compromising your physical address security.
            </p>
            <p className="text-gray-700">
              Our digital address system bridges the gap between convenience and
              privacy, giving you complete control over who has access to your
              personal information.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8 border border-blue-200">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900">
                    Privacy-First Design
                  </h3>
                  <p className="text-sm text-gray-700">
                    Your real address stays protected
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900">
                    Zero Physical Address Sharing
                  </h3>
                  <p className="text-sm text-gray-700">
                    Delivery partners only get what they need
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900">Complete Control</h3>
                  <p className="text-sm text-gray-700">
                    Manage permissions with precision
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            How eSthan Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex gap-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100 p-6 hover:shadow-xl transition-all transform hover:scale-105">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg text-white font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Create Address
                </h3>
                <p className="text-gray-600 text-sm">
                  Generate unique digital addresses for different purposes -
                  home, office, or temporary
                </p>
              </div>

              <div className="flex items-center justify-center mb-6 md:mb-0">
                <ArrowRight className="w-8 h-8 text-blue-600 hidden md:block" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100 p-6 hover:shadow-xl transition-all transform hover:scale-105">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg text-white font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Share Securely
                </h3>
                <p className="text-gray-600 text-sm">
                  Share only the digital address with delivery partners - no
                  physical address exposed
                </p>
              </div>

              <div className="flex items-center justify-center mb-6 md:mb-0">
                <ArrowRight className="w-8 h-8 text-blue-600 hidden md:block" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100 p-6 hover:shadow-xl transition-all transform hover:scale-105">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg text-white font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Receive Delivery
                </h3>
                <p className="text-gray-600 text-sm">
                  Get your packages delivered directly using your digital
                  address
                </p>
              </div>

              <div className="flex items-center justify-center mb-6 md:mb-0">
                <ArrowRight className="w-8 h-8 text-blue-600 hidden md:block" />
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100 p-6 hover:shadow-xl transition-all transform hover:scale-105">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg text-white font-bold mb-4">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Stay Private
              </h3>
              <p className="text-gray-600 text-sm">
                Your real address remains completely confidential and encrypted
              </p>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100 p-8 hover:shadow-lg transition-all">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Enhanced Security
              </h3>
              <p className="text-gray-600">
                Military-grade encryption protects your data during transmission and storage. Delivery partners receive your physical address only when needed for delivery, with complete audit trails and access controls.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100 p-8 hover:shadow-lg transition-all">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Lightning Fast
              </h3>
              <p className="text-gray-600">
                Create addresses instantly and start receiving deliveries
                immediately. No waiting periods or complicated processes.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100 p-8 hover:shadow-lg transition-all">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                User Friendly
              </h3>
              <p className="text-gray-600">
                Intuitive interface makes managing multiple digital addresses
                effortless. Perfect for personal and business use.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl border border-blue-200 p-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Award className="w-8 h-8 text-blue-600" />
                Why Choose eSthan?
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 shrink-0" />
                  <span className="text-gray-700">
                    Advanced address verification system
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 shrink-0" />
                  <span className="text-gray-700">
                    Real-time delivery tracking
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 shrink-0" />
                  <span className="text-gray-700">24/7 customer support</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 shrink-0" />
                  <span className="text-gray-700">
                    Trusted by thousands of users
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 shrink-0" />
                  <span className="text-gray-700">
                    GDPR compliant and privacy-focused
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-white">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                By The Numbers
              </h3>
              <div className="space-y-6">
                <div>
                  <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    50K+
                  </p>
                  <p className="text-gray-600 mt-1">Active Users</p>
                </div>
                <div>
                  <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    200K+
                  </p>
                  <p className="text-gray-600 mt-1">Deliveries Completed</p>
                </div>
                <div>
                  <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    99.9%
                  </p>
                  <p className="text-gray-600 mt-1">Uptime Guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100 p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Have Questions?
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            We're here to help. Reach out to our support team anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:shadow-lg transition-all hover:scale-105">
              Contact Support
            </button>
            <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all">
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
