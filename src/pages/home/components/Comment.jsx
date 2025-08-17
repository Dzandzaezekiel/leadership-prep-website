import { useForm } from "react-hook-form";
import { db } from "../../../fireabase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const Comment = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const feedbackRef = collection(db, "feedback");
      await addDoc(feedbackRef, {
        name: data.name || "Anonymous",
        comment: data.comment,
        timestamp: new Date(),
      });
      reset();
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <section id="feedback" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center fade-in-section">
        <h2 className="text-3xl sm:text-4xl font-bold text-royal-blue">
          Have a Question or Comment?
        </h2>
        <p className="text-gray-600 mt-2 mb-8 max-w-2xl mx-auto">
          We'd love to hear from you. Share your thoughts, questions, or
          feedback about the session below.
        </p>
        <div id="feedback-container" className="max-w-xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto">
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-transparent rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                  <input
                    type="text"
                    id="feedback-name"
                    placeholder=" "
                    className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border rounded-lg focus:ring-2 text-gray-800 placeholder-transparent peer transition-all duration-200 shadow-sm"
                    {...register("name", { required: false })}
                  />
                  <label
                    htmlFor="feedback-name"
                    className="absolute left-4 top-3 text-gray-500 pointer-events-none transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-royal-blue -top-2 text-xs bg-white px-1 peer-focus:bg-white/90"
                  >
                    Your Name (Optional)
                  </label>
                </div>
              </div>

              {/* Comment Field */}
              <div>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-transparent rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                  <textarea
                    id="feedback-text"
                    rows="4"
                    placeholder=" "
                    className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg focus:ring-2 focus:border-gold text-gray-800 placeholder-transparent peer transition-all duration-200 shadow-sm"
                    {...register("comment", { required: false })}
                  ></textarea>
                  <label
                    htmlFor="feedback-text"
                    className="absolute left-4 top-3 text-gray-500 pointer-events-none transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-royal-blue -top-2 text-xs bg-white px-1 peer-focus:bg-white/90"
                  >
                    Your question or comment...
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative overflow-hidden group w-full md:w-auto bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-gray-900 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-900"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      "Submit Feedback"
                    )}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-full group-hover:translate-x-full"></span>
                </button>
              </div>
            </div>
          </form>
          {isSubmitSuccessful && (
            <p className="text-green-600 mt-4 text-xl">
              Thank you for your feedback!
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Comment;
