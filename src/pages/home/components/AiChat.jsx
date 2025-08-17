import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { prompt } from "../../../data/prompts";
import { constitutionText } from "../../../data/constitution";
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${
  import.meta.env.VITE_GEMINI_API
}`;

const AiChat = () => {
  const [constitutionQuestion, setConstitutionQuestion] = useState("");
  const [constitutionAnswer, setConstitutionAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAskQuestion = async () => {
    if (!constitutionQuestion.trim()) {
      setError("Please enter a question");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      setConstitutionAnswer("");

      const payload = {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt(constitutionText, constitutionQuestion) }],
          },
        ],
      };

      const fetchResponse = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await fetchResponse.json();

      const text = result.candidates[0].content.parts[0].text;

      setConstitutionAnswer(text);
    } catch (err) {
      setError("Failed to get answer. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="constitution-ai" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center fade-in-section">
        <h2 className="text-3xl sm:text-4xl font-bold text-royal-blue mb-2">
          ✨ Explore the Constitution with AI
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Have a question about the Youth Ministry's constitution? Ask our AI
          assistant for a clear answer based directly on the official document.
        </p>

        <div className="max-w-xl mx-auto">
          <div className="relative mb-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200 transition-all duration-200">
              <textarea
                id="constitution-question"
                rows="3"
                placeholder="e.g., What are the duties of a youth leader?"
                className="w-full bg-transparent p-2 text-gray-700 focus:outline-none resize-none placeholder-gray-400"
                value={constitutionQuestion}
                onChange={(e) => {
                  setConstitutionQuestion(e.target.value);
                  setError("");
                }}
                disabled={isLoading}
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm text-left mt-1 ml-2">
                {error}
              </p>
            )}
          </div>

          <button
            id="ask-constitution-btn"
            className={`bg-gradient-to-r from-gold to-gold-dark text-gray-900 font-bold py-3 px-8 rounded-full transition-all duration-200 hover:-translate-y-0.5 ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            onClick={handleAskQuestion}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
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
                Processing...
              </span>
            ) : (
              "Ask Question"
            )}
          </button>

          <div
            className={`bg-white p-6 rounded-xl shadow-inner min-h-[100px] text-left mt-6 transition-all duration-300 ${
              isLoading || constitutionAnswer
                ? "block opacity-100"
                : "hidden opacity-0"
            }`}
          >
            {isLoading ? (
              <div className="flex justify-center items-center h-20">
                <div className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="prose prose-sm max-w-none text-gray-700">
                <Markdown remarkPlugins={[remarkGfm]}>
                  {constitutionAnswer}
                </Markdown>
                {/* {constitutionAnswer.split("\n").map((paragraph, i) => (
                  <p key={i} className="mb-3">
                    {paragraph}
                  </p>
                ))} */}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiChat;
