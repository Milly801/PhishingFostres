"use client"
import { HashLoader } from "react-spinners"
import "../../styles/globals.css"
import { useState, useEffect, useRef } from "react"
import { Shield, AlertTriangle, ChevronRight, User, Clock, Paperclip, Check, X, ArrowLeft, ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const EmailSimulation = () => {
  const navigate = useNavigate()
  const [emails, setEmails] = useState([])
  const [currentEmailIndex, setCurrentEmailIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_BASE_URL = 'https://phishingfostres.onrender.com'

  const formatApiEmailData = (apiEmail) => {
    if (!apiEmail) {
      throw new Error('Invalid email data received')
    }

    return {
      id: apiEmail.id || 'unknown',
      sender: {
        name: apiEmail.sender?.name || 'Unknown Sender',
        email: apiEmail.sender?.email || 'no-email@example.com',
      },
      recipient: Array.isArray(apiEmail.receiver?.emails)
        ? apiEmail.receiver.emails[0]
        : apiEmail.receiver?.emails || 'unknown@example.com',
      subject: apiEmail.subject || 'No Subject',
      date: apiEmail.created_at
        ? new Date(apiEmail.created_at).toLocaleString()
        : new Date().toLocaleString(),
      body: formatEmailBody(apiEmail.body || {}),
      isPhishing: Boolean(apiEmail.is_phishing), // Ensure boolean
    }
  }

  // Helper function to format the email body nicely
  const formatEmailBody = (bodyContent) => {
    const { main, signature, original_thread } = bodyContent;

    // Convert newlines to <br> and maintain formatting
    const formattedMain = main.replace(/\n/g, '<br>');
    const formattedSignature = signature ? signature.replace(/\n/g, '<br>') : '';
    const formattedThread = original_thread ? original_thread.replace(/\n/g, '<br>').replace(/^/gm, '> ') : '';

    return `
    <div class="email-body">
      <div class="main-content">
        ${formattedMain}
      </div>
      ${signature ? `
        <div class="signature text-gray-400 mt-4 border-t border-gray-700 pt-4">
          ${formattedSignature}
        </div>
      ` : ''}
      ${original_thread ? `
        <div class="original-thread text-gray-400 mt-4 border-t border-gray-700 pt-4 text-sm">
          <div class="font-medium mb-2">Original Thread:</div>
          <div class="whitespace-pre-line">${formattedThread}</div>
        </div>
      ` : ''}
    </div>
  `;
  }

  // Fetch emails only once at component mount
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await axios.get(
          `${API_BASE_URL}/email_s/simulated_emails?page=1&per_page=5`
        )

        if (!response.data || !response.data.data) {
          throw new Error('Invalid response format from server')
        }

        const formattedEmails = response.data.data.map(formatApiEmailData)

        if (!formattedEmails || formattedEmails.length === 0) {
          throw new Error('No emails received from server')
        }

        setEmails(formattedEmails)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching emails:', error)
        setError(error.message || 'Failed to fetch emails')
        setLoading(false)
      }
    }

    fetchEmails()
  }, []) // Empty dependency array means this runs once on mount

  const currentEmail = emails[currentEmailIndex]

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a192f] to-[#112240] text-gray-100 flex items-center justify-center">
        <div className="bg-[#112240] rounded-lg border border-red-500 p-8 max-w-md mx-auto text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-4">Error Loading Simulation</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#64ffda] text-[#0a192f] rounded-md hover:bg-[#4cceac] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-[#0a192f] to-[#112240] flex items-center justify-center flex-col">
        <HashLoader color="#64ffda" size={50} />
        <p className="text-[#64ffda] mt-4 font-mono">Securing Connection...</p>
      </div>
    );
  }

  if (!currentEmail) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a192f] to-[#112240] text-gray-100 flex items-center justify-center">
        <div className="bg-[#112240] rounded-lg border border-[#233554] p-8 text-center">
          <h2 className="text-xl font-bold mb-4">No Emails Available</h2>
          <p className="text-gray-300 mb-4">Please try again later.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#64ffda] text-[#0a192f] rounded-md hover:bg-[#4cceac] transition-colors"
          >
            Reload
          </button>
        </div>
      </div>
    )
  }

  const handleSelection = (isPhishing) => {
    setSelectedOption(isPhishing)
    setShowFeedback(true)

    if (isPhishing === currentEmail.isPhishing) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentEmailIndex < emails.length - 1) {
      setCurrentEmailIndex(currentEmailIndex + 1)
      setSelectedOption(null)
      setShowFeedback(false)
    } else {
      setCompleted(true)
    }
  }

  const handleRestart = () => {
    setCurrentEmailIndex(0)
    setSelectedOption(null)
    setShowFeedback(false)
    setScore(0)
    setCompleted(false)
  }

  const isCorrect = selectedOption === currentEmail.isPhishing

  // Add progress indicator
  const renderProgress = () => (
    <div className="flex justify-center mb-4">
      {emails.map((_, index) => (
        <div
          key={index}
          className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${index === currentEmailIndex
            ? 'bg-[#64ffda] scale-125'
            : index < currentEmailIndex
              ? 'bg-[#233554] opacity-50'
              : 'bg-[#233554]'
            }`}
        />
      ))}
    </div>
  )

  // Create a new PaginatedEmailBody component
  const PaginatedEmailBody = ({ body }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const containerRef = useRef(null);
    const contentRef = useRef(null);

    // Calculate total pages on mount and when content changes
    useEffect(() => {
      if (containerRef.current && contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight;
        const containerHeight = 400; // Fixed container height
        const pages = Math.ceil(contentHeight / containerHeight);
        setTotalPages(pages);
      }
    }, [body]);

    return (
      <div className="relative">
        <div
          ref={containerRef}
          className="h-[400px] overflow-hidden relative bg-[#1a2942] group"
        >
          <div
            ref={contentRef}
            className="transition-transform duration-500 ease-in-out h-full"
            style={{
              transform: `translateY(-${currentPage * 400}px)`,
            }}
          >
            <div
              className="prose prose-invert max-w-none text-sm sm:text-base p-4 sm:p-6"
              dangerouslySetInnerHTML={{ __html: body }}
            />
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center">
            {currentPage < totalPages - 1 && (
              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="h-full px-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gradient-to-l hover:from-[#1a2942]/80 hover:to-transparent"
                aria-label="Next page"
              >
                <ChevronRight className="h-5 w-5 text-[#64ffda]/70 hover:text-[#64ffda] transition-colors" />
              </button>
            )}
          </div>
          <div className="absolute inset-y-0 left-0 flex items-center">
            {currentPage > 0 && (
              <button
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="h-full px-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1a2942]/80 hover:to-transparent"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-5 w-5 text-[#64ffda]/70 hover:text-[#64ffda] transition-colors" />
              </button>
            )}
          </div>

          {totalPages > 1 && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`transition-all duration-300 ${currentPage === index
                      ? 'w-6 h-1 bg-[#64ffda]/70'
                      : 'w-1 h-1 bg-[#233554] hover:bg-[#64ffda]/40'
                    } rounded-full`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="absolute top-2 right-2 text-xs text-gray-400/80 bg-[#0a192f]/20 px-2 py-1 rounded-sm backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {currentPage + 1} / {totalPages}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a192f] to-[#112240] text-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4 sm:mb-8">
          <button
            onClick={() => navigate("/")}
            className="text-gray-400 hover:text-[#64ffda] transition-colors flex items-center text-xs sm:text-sm"
          >
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            Back
          </button>
          <div className="flex items-center">
            <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-[#64ffda] mr-2" />
            <h1 className="text-xl sm:text-2xl font-bold">
              PhishFortress <span className="text-[#64ffda]">Simulator</span>
            </h1>
          </div>
          <div className="bg-[#233554] px-3 py-1 sm:px-4 sm:py-2 rounded-lg">
            <span className="text-xs sm:text-sm">Score: </span>
            <span className="text-[#64ffda] font-bold">
              {score}/{emails.length}
            </span>
          </div>
        </div>

        {!completed ? (
          <>
            {renderProgress()}

            <div className="bg-[#112240] rounded-lg border border-[#233554] shadow-lg overflow-hidden mb-6">
              <div className="bg-[#0a192f] p-3 sm:p-4 border-b border-[#233554]">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 sm:mb-4">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold">{currentEmail.subject}</h2>
                    <div className="flex items-center mt-1">
                      <User className="h-3 w-3 sm:h-4 sm:w-4 text-[#64ffda] mr-2" />
                      <span className="font-medium mr-1 text-sm sm:text-base">{currentEmail.sender.name}</span>
                      <span className="text-gray-400 text-xs sm:text-sm">&lt;{currentEmail.sender.email}&gt;</span>
                    </div>
                  </div>
                  <div className="mt-1 md:mt-0 flex items-center">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 mr-1" />
                    <span className="text-xs sm:text-sm text-gray-400">{currentEmail.date}</span>
                  </div>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-gray-400">
                  <span className="mr-2">To: {currentEmail.recipient}</span>
                  {currentEmail.hasAttachment && (
                    <div className="flex items-center ml-2 sm:ml-4">
                      <Paperclip className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      <span>{currentEmail.attachmentName}</span>
                    </div>
                  )}
                </div>
              </div>

              <PaginatedEmailBody body={currentEmail.body} />
            </div>

            <div className="mb-6 sm:mb-8">
              <p className="text-center mb-3 sm:mb-4 text-base sm:text-lg">Is this email legitimate or a phishing attempt?</p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <button
                  onClick={() => handleSelection(false)}
                  disabled={showFeedback}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium flex items-center justify-center transition-colors ${selectedOption === false
                    ? showFeedback && isCorrect
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : "bg-[#233554] text-white hover:bg-[#2c4269]"
                    }`}
                >
                  {selectedOption === false && showFeedback && (
                    <>{isCorrect ? <Check className="mr-2 h-5 w-5" /> : <X className="mr-2 h-5 w-5" />}</>
                  )}
                  Legitimate Email
                </button>
                <button
                  onClick={() => handleSelection(true)}
                  disabled={showFeedback}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium flex items-center justify-center transition-colors ${selectedOption === true
                    ? showFeedback && isCorrect
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : "bg-[#233554] text-white hover:bg-[#2c4269]"
                    }`}
                >
                  {selectedOption === true && showFeedback && (
                    <>{isCorrect ? <Check className="mr-2 h-5 w-5" /> : <X className="mr-2 h-5 w-5" />}</>
                  )}
                  Phishing Attempt
                  <AlertTriangle className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>

            {showFeedback && (
              <div
                className={`mb-6 sm:mb-8 p-3 sm:p-4 rounded-lg border ${isCorrect ? "bg-green-900/20 border-green-700" : "bg-red-900/20 border-red-700"
                  }`}
              >
                <h3 className="text-lg font-bold mb-2 flex items-center">
                  {isCorrect ? (
                    <>
                      <Check className="mr-2 h-5 w-5 text-green-500" />
                      <span className="text-green-400">Correct!</span>
                    </>
                  ) : (
                    <>
                      <X className="mr-2 h-5 w-5 text-red-500" />
                      <span className="text-red-400">Incorrect!</span>
                    </>
                  )}
                </h3>
                <p className="mb-2">
                  This email is {currentEmail.isPhishing ? "a phishing attempt" : "legitimate"}.
                </p>
              </div>
            )}

            <div className="flex justify-center">
              <button
                onClick={handleNext}
                className="px-6 sm:px-8 py-2 sm:py-3 rounded-md text-sm sm:text-base bg-[#64ffda] text-[#0a192f] font-medium hover:bg-[#4cceac] transition-colors flex items-center"
              >
                {currentEmailIndex < emails.length - 1 ? (
                  <>
                    Next Email <ChevronRight className="ml-2 h-5 w-5" />
                  </>
                ) : (
                  "See Results"
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="bg-[#112240] rounded-lg border border-[#233554] p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Simulation Complete!</h2>
            <div className="text-6xl font-bold text-[#64ffda] mb-4">
              {score}/{emails.length}
            </div>
            <p className="text-xl mb-6">
              {score === emails.length
                ? "Perfect score! You're a phishing detection expert."
                : score >= emails.length * 0.7
                  ? "Great job! You have good phishing awareness."
                  : "You need more practice to improve your phishing detection skills."}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 rounded-md bg-[#64ffda] text-[#0a192f] font-medium hover:bg-[#4cceac] transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-400">
            This is a simulation for educational purposes. Always be vigilant with real emails.
          </p>
        </div>
      </div>
    </div>
  )
}
export default EmailSimulation
