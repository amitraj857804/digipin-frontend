import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  MinusCircle,
  Send,
  Loader,
  CheckCircle,
  TrendingUp,
  Award,
  AlertCircle,
} from "lucide-react";
import api from "../../api/api";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/authSlice";

function AIU_Feedback() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackResult, setFeedbackResult] = useState(null);
  const token = useSelector(selectToken);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      digitalAddress: "",
      fulfillmentStatus: "SUCCESS",
      aiuIdentifier: "",
      comments: "",
    },
    mode: "onTouched",
  });

  const selectedStatus = watch("fulfillmentStatus");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setFeedbackResult(null);

    try {
      const response = await api.post(
        "/api/aiu/feedback",
        {
          digitalAddress: data.digitalAddress,
          fulfillmentStatus: data.fulfillmentStatus,
          aiuIdentifier: data.aiuIdentifier,
          comments: data.comments || "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        toast.success("Feedback submitted successfully!");
        setFeedbackResult(response.data);
        // Optionally reset form
        // reset();
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      if (error.response) {
        switch (error.response.status) {
          case 404:
            toast.error("Digital address not found");
            break;
          case 400:
            toast.error(error.response.data || "Invalid feedback data");
            break;
          case 500:
            toast.error("Server error. Please try again later");
            break;
          default:
            toast.error(error.response.data || "Failed to submit feedback");
        }
      } else {
        toast.error("Network error. Please check your connection");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    reset();
    setFeedbackResult(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "SUCCESS":
        return "from-green-600 to-emerald-600";
      case "FAILURE":
        return "from-red-600 to-rose-600";
      case "NEUTRAL":
        return "from-amber-600 to-orange-600";
      default:
        return "from-gray-600 to-slate-600";
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl border border-purple-100 p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-linear-to-br from-purple-600 to-pink-600 rounded-xl shadow-lg">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Service Fulfillment Feedback
              </h1>
              <p className="text-gray-600 mt-2">
                Help improve address accuracy by providing delivery feedback
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-purple-100 p-8 mb-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              {/* Digital Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Digital Address *
                </label>
                <InputField
                  required={true}
                  id="digitalAddress"
                  type="text"
                  message="*Digital address is required"
                  placeholder="e.g., username@home.add"
                  register={register}
                  errors={errors}
                  className="w-full px-4 py-3 border border-purple-200! rounded-lg focus:ring-2 focus:ring-purple-600 transition-all"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Enter the digital address you delivered to
                </p>
              </div>

              {/* AIU Identifier */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  AIU Identifier (Service Partner ID) *
                </label>
                <input
                  type="text"
                  {...register("aiuIdentifier", {
                    required: { value: true, message: "*AIU identifier is required" },
                  })}
                  placeholder="Enter your delivery/service partner ID"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-600 transition-all outline-none ${
                    errors.aiuIdentifier ? "border-red-500" : "border-purple-200"
                  }`}
                />
                {errors.aiuIdentifier && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.aiuIdentifier.message}
                  </p>
                )}
              </div>

              {/* Fulfillment Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Fulfillment Status *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label
                    className={`relative flex items-center justify-center gap-3 p-5 border-2 rounded-xl cursor-pointer transition-all ${
                      selectedStatus === "SUCCESS"
                        ? "border-green-500 bg-green-50 shadow-md"
                        : "border-gray-200 hover:border-green-300 hover:bg-green-50/30"
                    }`}
                  >
                    <input
                      type="radio"
                      value="SUCCESS"
                      {...register("fulfillmentStatus")}
                      className="sr-only"
                    />
                    <ThumbsUp
                      className={`w-7 h-7 ${
                        selectedStatus === "SUCCESS"
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    />
                    <div>
                      <span
                        className={`font-bold text-lg block ${
                          selectedStatus === "SUCCESS"
                            ? "text-green-700"
                            : "text-gray-600"
                        }`}
                      >
                        Success
                      </span>
                      <span className="text-xs text-gray-500">
                        Delivered successfully
                      </span>
                    </div>
                  </label>

                  <label
                    className={`relative flex items-center justify-center gap-3 p-5 border-2 rounded-xl cursor-pointer transition-all ${
                      selectedStatus === "FAILURE"
                        ? "border-red-500 bg-red-50 shadow-md"
                        : "border-gray-200 hover:border-red-300 hover:bg-red-50/30"
                    }`}
                  >
                    <input
                      type="radio"
                      value="FAILURE"
                      {...register("fulfillmentStatus")}
                      className="sr-only"
                    />
                    <ThumbsDown
                      className={`w-7 h-7 ${
                        selectedStatus === "FAILURE"
                          ? "text-red-600"
                          : "text-gray-400"
                      }`}
                    />
                    <div>
                      <span
                        className={`font-bold text-lg block ${
                          selectedStatus === "FAILURE"
                            ? "text-red-700"
                            : "text-gray-600"
                        }`}
                      >
                        Failure
                      </span>
                      <span className="text-xs text-gray-500">
                        Delivery failed
                      </span>
                    </div>
                  </label>

                  <label
                    className={`relative flex items-center justify-center gap-3 p-5 border-2 rounded-xl cursor-pointer transition-all ${
                      selectedStatus === "NEUTRAL"
                        ? "border-amber-500 bg-amber-50 shadow-md"
                        : "border-gray-200 hover:border-amber-300 hover:bg-amber-50/30"
                    }`}
                  >
                    <input
                      type="radio"
                      value="NEUTRAL"
                      {...register("fulfillmentStatus")}
                      className="sr-only"
                    />
                    <MinusCircle
                      className={`w-7 h-7 ${
                        selectedStatus === "NEUTRAL"
                          ? "text-amber-600"
                          : "text-gray-400"
                      }`}
                    />
                    <div>
                      <span
                        className={`font-bold text-lg block ${
                          selectedStatus === "NEUTRAL"
                            ? "text-amber-700"
                            : "text-gray-600"
                        }`}
                      >
                        Neutral
                      </span>
                      <span className="text-xs text-gray-500">
                        No clear outcome
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Comments */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Comments (Optional)
                </label>
                <textarea
                  {...register("comments")}
                  rows={4}
                  placeholder="Provide additional details about your delivery experience (e.g., address accuracy, accessibility, customer availability, etc.)"
                  className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-600 transition-all outline-none resize-none"
                />
              </div>

              {/* Info Box */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-purple mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-purple-900 font-semibold mb-2">
                      📊 How Your Feedback Improves the System
                    </p>
                    <ul className="text-xs text-purple-800 space-y-1">
                      <li>
                        • <strong>Success:</strong> Increases confidence score,
                        marking the address as reliable
                      </li>
                      <li>
                        • <strong>Failure:</strong> Decreases confidence score,
                        flagging potential issues
                      </li>
                      <li>
                        • <strong>Neutral:</strong> No impact on confidence score
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Feedback
                    </>
                  )}
                </button>

                {feedbackResult && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-all"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Feedback Result */}
        {feedbackResult && (
          <div className="bg-white rounded-2xl shadow-xl border border-green-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Feedback Submitted Successfully
              </h2>
            </div>

            {/* Result Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Digital Address */}
              <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                <p className="text-xs text-gray-600 font-semibold uppercase mb-2">
                  Digital Address
                </p>
                <p className="text-lg font-bold text-blue-600 break-all">
                  {feedbackResult.digitalAddress}
                </p>
              </div>

              {/* AIU Identifier */}
              <div className="bg-linear-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                <p className="text-xs text-gray-600 font-semibold uppercase mb-2">
                  Service Partner ID
                </p>
                <p className="text-lg font-bold text-purple-600">
                  {feedbackResult.aiuIdentifier}
                </p>
              </div>

              {/* Fulfillment Status */}
              <div
                className={`bg-linear-to-r ${getStatusColor(
                  feedbackResult.fulfillmentStatus
                )} rounded-lg p-4 border border-white/20`}
              >
                <p className="text-xs text-white/80 font-semibold uppercase mb-2">
                  Fulfillment Status
                </p>
                <p className="text-lg font-bold text-white">
                  {feedbackResult.fulfillmentStatus}
                </p>
              </div>

              {/* Total Fulfillments */}
              <div className="bg-linear-to-r from-cyan-50 to-blue-50 rounded-lg p-4 border border-cyan-200">
                <p className="text-xs text-gray-600 font-semibold uppercase mb-2">
                  Total Fulfillments
                </p>
                <p className="text-lg font-bold text-cyan-600">
                  {totalFulfillments || 0}
                </p>
              </div>

              {/* Confidence Score Change */}
              <div className="col-span-1 md:col-span-2 bg-linear-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <p className="text-xs text-gray-600 font-semibold uppercase">
                      Confidence Score Update
                    </p>
                  </div>
                  {feedbackResult.isTrusted && (
                    <div className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-full text-xs font-bold">
                      <Award className="w-3 h-3" />
                      Trusted Address
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 mb-1">Old Score</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-linear-to-r from-gray-400 to-gray-500 h-2 rounded-full"
                          style={{
                            width: `${feedbackResult.oldConfidenceScore}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-gray-700">
                        {feedbackResult.oldConfidenceScore}%
                      </span>
                    </div>
                  </div>
                  <div className="text-2xl text-green-600">→</div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 mb-1">New Score</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-linear-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                          style={{
                            width: `${feedbackResult.newConfidenceScore}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-green-700">
                        {feedbackResult.newConfidenceScore}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Success Message */}
            <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
              <p className="text-green-800 font-semibold mb-2">
                {feedbackResult.message ||
                  "Thank you for your valuable feedback!"}
              </p>
              <p className="text-sm text-green-700">
                Your feedback helps improve the accuracy and reliability of the
                digital address system. The confidence score has been updated based
                on your delivery experience.
              </p>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-purple-100 p-8 mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Feedback Guidelines
          </h3>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex gap-3">
              <span className="shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                1
              </span>
              <p>
                <strong>Enter Digital Address:</strong> Provide the digital
                address where the service was fulfilled
              </p>
            </div>
            <div className="flex gap-3">
              <span className="shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                2
              </span>
              <p>
                <strong>Service Partner ID:</strong> Enter your unique AIU/delivery
                partner identifier for tracking
              </p>
            </div>
            <div className="flex gap-3">
              <span className="shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                3
              </span>
              <p>
                <strong>Select Status:</strong> Choose Success if delivery was
                completed, Failure if there were issues, or Neutral for unclear
                outcomes
              </p>
            </div>
            <div className="flex gap-3">
              <span className="shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                4
              </span>
              <p>
                <strong>Add Comments:</strong> Optionally provide details about
                address accuracy, accessibility, or other relevant information
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIU_Feedback;
