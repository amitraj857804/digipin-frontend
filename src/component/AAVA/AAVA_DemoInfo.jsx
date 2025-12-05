import { useState } from "react";
import {
  Shield,
  MapPin,
  Camera,
  CheckCircle,
  AlertTriangle,
  Smartphone,
  Map,
  FileText,
  Users,
  Zap,
  Lock,
  ClipboardList,
  X,
} from "lucide-react";

function AAVA_DemoInfo({ isModal = false, onClose = () => {} }) {
  const [activeStep, setActiveStep] = useState(0);

  const verificationSteps = [
    {
      icon: Shield,
      title: "Agent Assignment",
      description: "An AAVA (Avatar) agent is assigned to verify your digital address",
      details: ["Automated agent selection", "Location-based assignment", "Real-time tracking"],
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: MapPin,
      title: "Location Verification",
      description: "Agent captures GPS coordinates at the exact digital address location",
      details: ["High-accuracy GPS", "Latitude/Longitude recording", "Geo-tagging"],
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Camera,
      title: "Photo Evidence",
      description: "Agent captures photo proof of the digital address marking at the location",
      details: ["Real-time photo capture", "Metadata verification", "Geo-tagged images"],
      color: "from-green-500 to-green-600",
    },
    {
      icon: FileText,
      title: "Documentation Review",
      description: "Supporting documents are reviewed for authenticity and completeness",
      details: ["Document validation", "Cross-reference check", "Compliance verification"],
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: CheckCircle,
      title: "Confidence Score Update",
      description: "Digital address confidence score is updated based on verification results",
      details: ["Score calculation", "Tamper-proof logging", "Database update"],
      color: "from-red-500 to-red-600",
    },
  ];

  const benefits = [
    {
      icon: Lock,
      title: "Enhanced Security",
      description: "Verified digital addresses ensure legitimate identities",
    },
    {
      icon: Zap,
      title: "Faster Processing",
      description: "Quick verification enables faster service delivery",
    },
    {
      icon: Users,
      title: "Trusted Network",
      description: "Build confidence in digital address ecosystem",
    },
    {
      icon: ClipboardList,
      title: "Compliance Ready",
      description: "Meets regulatory requirements for digital addresses",
    },
  ];

  const useCases = [
    "Government Welfare Programs",
    "Property Records Registration",
    "Legal Notice Delivery",
    "Emergency Services Response",
    "E-Commerce Deliveries",
    "Food Delivery Services",
  ];

  const containerClass = isModal
    ? "w-full overflow-y-auto scrollbar-hide"
    : "mt-20 sm:mt-24 mb-10 w-full flex justify-center";

  return (
    <div className={containerClass}>
      <div className={isModal ? "w-full" : "w-full max-w-5xl"}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 sm:px-8 py-8 sm:py-12 relative">
          {isModal && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          )}
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            <h1 className="text-2xl sm:text-4xl font-bold text-white">
              How AAVA Verification Works
            </h1>
          </div>
          <p className="text-blue-100 text-sm sm:text-base">
            A step-by-step guide to understanding the automated digital address verification process
          </p>
        </div>

        <div className="px-6 sm:px-8 py-8 sm:py-12 bg-white">
          {/* Verification Steps */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <Smartphone className="w-8 h-8 text-blue-600" />
              Verification Process (5 Steps)
            </h2>

            {/* Step Navigation */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
              {verificationSteps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`px-3 sm:px-4 py-2 rounded-lg cursor-pointer font-semibold transition-all text-sm sm:text-base ${
                    activeStep === index
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Step {index + 1}
                </button>
              ))}
            </div>

            {/* Active Step Display */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 sm:p-10 text-white min-h-[400px] flex flex-col justify-between"
              style={{
                backgroundImage: `linear-gradient(135deg, var(--gradient-from), var(--gradient-to))`,
                '--gradient-from': `${['hsl(220, 100%, 50%)', 'hsl(235, 100%, 50%)', 'hsl(250, 100%, 50%)', 'hsl(30, 100%, 50%)', 'hsl(200, 100%, 50%)'][activeStep]}`,
                '--gradient-to': `${['hsl(250, 100%, 50%)', 'hsl(265, 100%, 50%)', 'hsl(280, 100%, 50%)', 'hsl(45, 100%, 50%)', 'hsl(215, 100%, 50%)'][activeStep]}`,
              }}>
              {(() => {
                const step = verificationSteps[activeStep];
                const IconComponent = step.icon;
                return (
                  <>
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="bg-white/20 p-4 rounded-xl">
                          <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                        </div>
                        <div>
                          <div className="text-white/80 text-sm">Step {activeStep + 1} of 5</div>
                          <h3 className="text-2xl sm:text-3xl font-bold">{step.title}</h3>
                        </div>
                      </div>
                      <p className="text-white/90 text-base sm:text-lg mb-6">
                        {step.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-white mb-3">Key Activities:</h4>
                      <ul className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-white/80" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <Zap className="w-8 h-8 text-yellow-600" />
              Benefits of AAVA Verification
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => {
                const BenefitIcon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <BenefitIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="font-bold text-gray-900">{benefit.title}</h3>
                    </div>
                    <p className="text-gray-700 text-sm">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Use Cases */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <FileText className="w-8 h-8 text-purple-600" />
              Supported Use Cases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {useCases.map((useCase, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200 flex items-center gap-3 hover:shadow-md transition-shadow"
                >
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    ✓
                  </div>
                  <span className="text-gray-900 font-medium">{useCase}</span>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works Timeline */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <Map className="w-8 h-8 text-green-600" />
              Verification Timeline
            </h2>
            <div className="space-y-6">
              {[
                { time: "Immediate", event: "Digital address submitted for verification" },
                { time: "1-2 hours", event: "Agent assigned based on location" },
                { time: "2-4 hours", event: "Agent visits location and captures proof" },
                { time: "4-6 hours", event: "Documentation reviewed and validated" },
                { time: "6-8 hours", event: "Verification completed & score updated" },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>
                    {idx < 4 && <div className="w-1 h-12 bg-blue-200 mt-2"></div>}
                  </div>
                  <div className="pt-2">
                    <div className="font-bold text-blue-600">{item.time}</div>
                    <div className="text-gray-700">{item.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Features */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Lock className="w-8 h-8 text-red-600" />
              Security & Compliance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Security Measures
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Geo-tagged photo proof</li>
                  <li>• Tamper-proof logging</li>
                  <li>• Agent authentication</li>
                  <li>• Real-time tracking</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Compliance Standards
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• GDPR compliant</li>
                  <li>• Data encryption enabled</li>
                  <li>• Audit trails maintained</li>
                  <li>• Privacy protected</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AAVA_DemoInfo;
