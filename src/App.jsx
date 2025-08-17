import { useState, useEffect } from "react";
import Announcement from "./pages/home/components/Announcement";
import Comment from "./pages/home/components/Comment";
import AiChat from "./pages/home/components/AiChat";
import Hero from "./pages/home/components/Hero";

const timelineData = [
  {
    time: "10:00 AM",
    title: "Opening Remarks & Introduction",
    details:
      "Welcome and a brief overview of the session’s objectives and speakers.",
  },
  {
    time: "10:10 AM",
    title: "The Call & The Vision",
    details:
      "A deep dive into the spiritual foundations of Kingdom leadership and personal calling.",
  },
  {
    time: "10:30 AM",
    title: "Understanding Our Constitution",
    details:
      "An interactive session focused on the key articles and principles of the Youth Ministry Constitution.",
  },
  {
    time: "11:00 AM",
    title: "Q&A Session",
    details: "An open forum for questions and answers with the speakers.",
  },
  {
    time: "11:15 AM",
    title: "Announcements & Closing",
    details: "Updates on upcoming events, surveys, and final prayers.",
  },
];

// Content for the transcript modal
const transcriptContent = `
  <h4 class="font-bold text-lg mb-2">Leadership Prep: August Session Summary</h4>
  <p>The "Leadership Prep – August Edition" session was held on August 14th, 2025, with the theme "Building Kingdom Leaders: Understanding Our Calling, Embracing Our Constitution." The event aimed to equip leaders with the spiritual foundation and practical knowledge necessary for effective service within the youth ministry.</p>
  <br/>
  <p><strong>Session Highlights:</strong></p>
  <ul class="list-disc list-inside space-y-2 mt-2">
    <li>The session opened with an introduction highlighting the importance of understanding one’s divine calling as the bedrock of all leadership.</li>
    <li>A detailed discussion on the Youth Ministry Constitution emphasized its role as a guiding compass for all operational and spiritual activities. Key articles related to the duties and qualifications of leaders were reviewed.</li>
    <li>Attendees participated in a lively Q&A session, where speakers addressed questions on governance, decision-making, and fostering unity.</li>
    <li>The event concluded with important announcements about the upcoming "Leadership & Governance Essentials" Part 2 on August 21st, and calls to action for the "Operation 2000 by 2030" survey and the National Congress registration.</li>
  </ul>
  <br/>
  <p>The core message reinforced throughout the session was that effective leadership is rooted in a clear vision, a firm biblical foundation, and a unified spirit among all leaders. The event served as a powerful reminder that the constitution is not just a document, but a tool for fostering intentional and impactful service for God's Kingdom.</p>
`;

// Main App component
const App = () => {
  const [replayModalOpen, setReplayModalOpen] = useState(false);
  const [transcriptModalOpen, setTranscriptModalOpen] = useState(false);
  const [timelineOpenStates, setTimelineOpenStates] = useState({});
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const [constitutionQuestion, setConstitutionQuestion] = useState("");
  const [constitutionAnswer, setConstitutionAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAskQuestion = () => {
    setIsLoading(true);
    setTimeout(() => {
      setConstitutionAnswer(
        "The AI functionality is currently disabled in this UI preview. Please implement the necessary API calls to enable this feature."
      );
      setIsLoading(false);
    }, 1500);
  };

  const handleSubmitFeedback = () => {
    const name = document.getElementById("feedback-name").value;
    const text = document.getElementById("feedback-text").value;
    if (text.length > 0) {
      document.getElementById("feedback-form").classList.add("hidden");
      document.getElementById("feedback-success").classList.remove("hidden");
    }
  };

  const toggleTimelineItem = (index) => {
    setTimelineOpenStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".fade-in-section").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleAudioToggle = () => {
    const audio = document.getElementById("background-music");
    if (isAudioPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsAudioPlaying(!isAudioPlaying);
  };

  return (
    <div className="bg-white text-gray-900 font-poppins antialiased">
      <button
        id="audio-toggle"
        className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full bg-royal-blue text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none"
        onClick={handleAudioToggle}
      >
        <span id="audio-icon">{isAudioPlaying ? "🔊" : "🔇"}</span>
      </button>
      <audio id="background-music" loop></audio>

      <Hero />
      <section id="outline" className="py-20 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 fade-in-section">
            <h2 className="text-3xl sm:text-4xl font-bold text-royal-blue">
              Program Outline
            </h2>
            <p className="text-gray-600 mt-2">
              An hour of inspiration, learning, and interaction.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="border-l-2 border-gray-200 absolute h-full left-4 md:left-1/2 md:-translate-x-1/2"></div>
              <div id="timeline-container" className="space-y-12">
                {timelineData.map((item, index) => (
                  <div
                    key={index}
                    className={`timeline-item relative flex flex-col md:flex-row items-center md:items-start ${
                      index % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className="absolute top-0 left-4 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-royal-blue flex items-center justify-center text-white z-10 timeline-icon transform transition-transform duration-500 cursor-pointer"
                      onClick={() => toggleTimelineItem(index)}
                    >
                      <span className="text-xl font-bold transform rotate-0 transition-transform duration-500">
                        +
                      </span>
                    </div>
                    <div
                      className={`p-6 bg-white rounded-xl shadow-lg w-full md:w-5/12 ml-10 md:ml-0 md:mr-10 transition-all duration-500 transform fade-in-section ${
                        index % 2 === 0
                          ? "md:translate-x-1/2"
                          : "md:-translate-x-1/2"
                      }`}
                    >
                      <h3 className="font-bold text-xl text-royal-blue mb-1">
                        {item.time}
                      </h3>
                      <h4 className="font-semibold text-lg text-gray-800 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-gray-600">{item.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="speakers" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 fade-in-section">
            <h2 className="text-3xl sm:text-4xl font-bold text-royal-blue">
              Meet The Speakers
            </h2>
            <p className="text-gray-600 mt-2">
              Wisdom and insights from dedicated leaders.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center bg-gray-50 rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 fade-in-section">
              <img
                src="https://i.postimg.cc/3rpXqtyh/rev-ezekiel.jpg"
                alt="Rev. Ezekiel Razak Alhassan"
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gold object-cover"
              />
              <h3 className="text-xl font-bold text-royal-blue">
                Rev. Ezekiel Razak Alhassan
              </h3>
              <p className="text-gold font-semibold mb-2">
                Youth & NUBS Coordinator
              </p>
              <p className="text-gray-600 mb-4">
                Passionate about equipping young leaders for impactful service.
              </p>
              <a
                href="https://wa.me/233244447115"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 text-white font-bold py-2 px-4 rounded-full text-sm hover:bg-green-600 transition-colors shadow"
              >
                Contact on WhatsApp
              </a>
            </div>
            <div className="text-center bg-gray-50 rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 fade-in-section">
              <img
                src="https://i.postimg.cc/sXxnS7KX/ps-bernard1.jpg"
                alt="Mr. Bernard Adu-Gyamfi"
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gold object-cover"
              />
              <h3 className="text-xl font-bold text-royal-blue">
                Mr. Bernard Adu-Gyamfi
              </h3>
              <p className="text-gold font-semibold mb-2">
                Ministry Strategist & Leadership Mentor
              </p>
              <p className="text-gray-600 mb-4">
                Years of experience in Christian youth development.
              </p>
              <a
                href="https://wa.me/233242118627"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 text-white font-bold py-2 px-4 rounded-full text-sm hover:bg-green-600 transition-colors shadow"
              >
                Contact on WhatsApp
              </a>
            </div>
            <div className="text-center bg-gray-50 rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 fade-in-section">
              <img
                src="https://i.postimg.cc/fyxY0b4y/Ezekiel1.jpg"
                alt="Mr. Ezekiel K. Dzandza"
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gold object-cover"
              />
              <h3 className="text-xl font-bold text-royal-blue">
                Mr. Ezekiel K. Dzandza
              </h3>
              <p className="text-gold font-semibold mb-2">
                RDC Chairman & Host
              </p>
              <p className="text-gray-600 mb-4">
                Focused on strengthening the link between Kingdom purpose and
                practical leadership.
              </p>
              <a
                href="https://wa.me/233245413116"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 text-white font-bold py-2 px-4 rounded-full text-sm hover:bg-green-600 transition-colors shadow"
              >
                Contact on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <AiChat />
      {/* Key Takeaways Section */}
      <section id="takeaways" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 fade-in-section">
            <h2 className="text-3xl sm:text-4xl font-bold text-royal-blue">
              Key Takeaways
            </h2>
            <p className="text-gray-600 mt-2">
              Core principles from our session on Kingdom Leadership.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 fade-in-section">
              <h3 className="font-bold text-xl text-royal-blue mb-2">
                Leadership Begins with Calling
              </h3>
              <p className="text-gray-600">
                Every Kingdom leader must first understand why they are called
                before what they are to do.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 fade-in-section">
              <h3 className="font-bold text-xl text-royal-blue mb-2">
                The Constitution is Our Compass
              </h3>
              <p className="text-gray-600">
                It provides direction, clarity, and unity for the youth
                ministry’s mission.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 fade-in-section">
              <h3 className="font-bold text-xl text-royal-blue mb-2">
                Vision Fuels Purpose
              </h3>
              <p className="text-gray-600">
                Without vision, leadership drifts; with vision, leaders move
                with intentionality.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 fade-in-section lg:col-start-2">
              <h3 className="font-bold text-xl text-royal-blue mb-2">
                Biblical Foundation is Non-Negotiable
              </h3>
              <p className="text-gray-600">
                True leadership must be rooted in God’s Word, not just human
                ideas.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 fade-in-section">
              <h3 className="font-bold text-xl text-royal-blue mb-2">
                Unity Strengthens Impact
              </h3>
              <p className="text-gray-600">
                When leaders align with the same Spirit and mission, their
                influence multiplies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comments and Questions Section */}
      <Comment />

      {/* Prepare for Part 2 Section */}
      <section id="part2" className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center fade-in-section">
          <h2 className="text-3xl sm:text-4xl font-bold text-royal-blue">
            Coming Up: Part 2
          </h2>
          <p className="text-xl text-gray-500 mt-2 mb-2 text-gold font-bold">
            Leadership & Governance Essentials
          </p>
          <p className="text-lg text-gray-700 font-semibold mb-4">
            21st August, 2025
          </p>
          <p className="max-w-2xl mx-auto text-gray-600 mb-8">
            <strong>Objective:</strong> To explain the practical Structure,
            Roles, and Expectations for Youth Leaders under the Constitution.
          </p>
          <div id="notify-container" className="max-w-md mx-auto">
            <div id="notify-form">
              <div className="bg-white p-2 rounded-full shadow-lg mb-4">
                <input
                  type="email"
                  id="notify-email"
                  placeholder="Enter your email for a reminder"
                  className="w-full bg-transparent p-2 text-gray-700 focus:outline-none"
                />
              </div>
              <div className="bg-white p-2 rounded-full shadow-lg">
                <input
                  type="tel"
                  id="notify-whatsapp"
                  placeholder="WhatsApp Number (Optional)"
                  className="w-full bg-transparent p-2 text-gray-700 focus:outline-none"
                />
              </div>
              <button
                id="notify-btn"
                className="bg-gold text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-yellow-400 transition-colors mt-4 shadow-lg"
              >
                Notify Me
              </button>
            </div>
            <p id="notify-success" className="text-green-600 mt-4 hidden">
              Thank you! We'll notify you about Part 2.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="cta" className="py-20 bg-royal-blue text-white">
        <div className="container mx-auto px-4 text-center fade-in-section">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black drop-shadow-lg">
            Thanks For Joining Us!
          </h2>
          <p className="text-xl mt-4 mb-8">
            Review the session with the full video replay or read the summary.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="open-replay-btn-2"
              className="bg-gold text-gray-900 font-bold py-4 px-10 rounded-full text-lg uppercase hover:bg-yellow-400 transition-colors duration-300 shadow-xl hover:scale-105"
              onClick={() => setReplayModalOpen(true)}
            >
              Watch Full Replay
            </button>
            <button
              id="open-transcript-btn"
              className="border-2 border-white text-white font-bold py-4 px-10 rounded-full text-lg uppercase hover:bg-white hover:text-royal-blue transition-colors duration-300 shadow-xl hover:scale-105"
              onClick={() => setTranscriptModalOpen(true)}
            >
              Read Meeting Summary
            </button>
          </div>
        </div>
      </section>

      <Announcement />

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-gray-400">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a
              href="https://web.facebook.com/p/Ghana-Baptist-Youth-Ministry-61568425853681/?_rdc=1&_rdr#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Facebook
            </a>
          </div>
          <p className="text-sm">#LeadershipPrep #KingdomLeaders</p>
          <div className="mt-4 space-x-4">
            <a
              href="#"
              id="view-submissions-btn"
              className="text-sm text-gray-500 hover:text-gold"
            >
              View Signups
            </a>
            <a
              href="#"
              id="view-feedback-btn"
              className="text-sm text-gray-500 hover:text-gold"
            >
              View Feedback
            </a>
          </div>
          {/* Admin Panels (UI-only) */}
          <div
            id="submissions-container"
            className="hidden mt-4 max-w-md mx-auto bg-gray-700 p-4 rounded-xl text-left"
          >
            <h4 className="font-bold text-white mb-2">Signups for Part 2:</h4>
            <div id="submissions-list" className="space-y-2 text-gray-300">
              <p>Signups will appear here when connected to a backend.</p>
            </div>
          </div>
          <div
            id="feedback-list-container"
            className="hidden mt-4 max-w-md mx-auto bg-gray-700 p-4 rounded-xl text-left"
          >
            <h4 className="font-bold text-white mb-2">Feedback & Questions:</h4>
            <div id="feedback-list" className="space-y-2 text-gray-300">
              <p>Feedback will appear here when connected to a backend.</p>
            </div>
          </div>
          <p className="mt-4 text-sm">
            &copy; 2025 Leadership Prep. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* Video Replay Modal */}
      {replayModalOpen && (
        <div
          id="replay-modal"
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
        >
          <div className="bg-black rounded-lg shadow-2xl w-full max-w-4xl transition-transform transform scale-100">
            <div className="flex justify-end p-2">
              <button
                className="text-white hover:text-gray-300 text-3xl font-bold"
                onClick={() => setReplayModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="relative" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Transcript Modal */}
      {transcriptModalOpen && (
        <div
          id="transcript-modal"
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
        >
          <div className="bg-white text-gray-800 rounded-lg shadow-2xl w-full max-w-3xl transition-transform transform scale-100">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-royal-blue">
                Meeting Summary
              </h3>
              <button
                className="text-gray-400 hover:text-gray-800 text-3xl font-bold"
                onClick={() => setTranscriptModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <div
              id="transcript-content"
              className="p-6 max-h-[70vh] overflow-y-auto text-gray-600"
              dangerouslySetInnerHTML={{ __html: transcriptContent }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
