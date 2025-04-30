"use client"

import { useState } from "react"
import { Shield, AlertTriangle, ChevronRight, User, Clock, Paperclip, Check, X, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

// Mock email data
const mockEmails = [
  {
    id: 1,
    sender: {
      name: "PayPal Customer Service",
      email: "service@paypa1.com", // Subtle misspelling (1 instead of l)
    },
    recipient: "user@company.com",
    subject: "Urgent: Your account has been limited",
    date: "Today, 10:23 AM",
    body: `<p>Dear Valued Customer,</p>
    <p>We've noticed some unusual activity on your PayPal account. Your account has been temporarily limited until we can verify your identity.</p>
    <p>Please click the link below to verify your information and restore full access to your account:</p>
    <p><a href="#" style="color: #0070ba;">https://secure.paypa1.com/verify-account</a></p>
    <p>If you don't verify your account within 24 hours, your account will be permanently limited.</p>
    <p>Thank you for your cooperation.</p>
    <p>PayPal Customer Service Team</p>`,
    hasAttachment: false,
    isPhishing: true,
    phishingIndicators: [
      "Misspelled sender email (paypa1.com instead of paypal.com)",
      "Creates urgency with threats of account limitation",
      "Contains suspicious link",
      "Generic greeting",
    ],
  },
  {
    id: 2,
    sender: {
      name: "Microsoft 365 Team",
      email: "no-reply@microsoft.com",
    },
    recipient: "user@company.com",
    subject: "Your Microsoft 365 subscription is expiring soon",
    date: "Yesterday, 4:15 PM",
    body: `<p>Hello,</p>
    <p>Your Microsoft 365 subscription will expire in 3 days. To ensure uninterrupted access to your services, please renew your subscription now.</p>
    <p>Click here to renew: <a href="#" style="color: #0078d4;">https://login.microsoftonline.com</a></p>
    <p>If you've already renewed, please disregard this message.</p>
    <p>Thank you,<br>Microsoft 365 Team</p>`,
    hasAttachment: false,
    isPhishing: false,
    phishingIndicators: [],
  },
  {
    id: 3,
    sender: {
      name: "HR Department",
      email: "hr@company-benefits.net",
    },
    recipient: "user@company.com",
    subject: "Important: New Benefits Enrollment Form",
    date: "May 15, 2:30 PM",
    body: `<p>Dear Employee,</p>
    <p>Please find attached the new benefits enrollment form for the upcoming fiscal year. This form must be completed by all employees.</p>
    <p>To access your benefits, please download and open the attached file: <strong>Benefits_Form_2023.exe</strong></p>
    <p>Complete the form by Friday to ensure your benefits continue without interruption.</p>
    <p>Best regards,<br>Human Resources</p>`,
    hasAttachment: true,
    attachmentName: "Benefits_Form_2023.exe",
    isPhishing: true,
    phishingIndicators: [
      "Suspicious sender domain (not your company's domain)",
      "Executable file attachment (.exe)",
      "Creates urgency",
      "Generic greeting",
    ],
  },
  {
    id: 4,
    sender: {
      name: "Jane Smith",
      email: "j.smith@company.com",
    },
    recipient: "user@company.com",
    subject: "Meeting notes from yesterday",
    date: "May 14, 9:45 AM",
    body: `<p>Hi there,</p>
    <p>Attached are the meeting notes from yesterday's project status update. Please review them and let me know if you have any questions or if I missed anything important.</p>
    <p>We need to follow up on the action items by next week.</p>
    <p>Thanks,<br>Jane</p>`,
    hasAttachment: true,
    attachmentName: "Meeting_Notes_May13.pdf",
    isPhishing: false,
    phishingIndicators: [],
  },
  {
    id: 5,
    sender: {
      name: "Amazon",
      email: "order-confirmation@amazon.com",
    },
    recipient: "user@company.com",
    subject: "Your Amazon.com order #402-5798231-4563901",
    date: "May 10, 11:20 AM",
    body: `<p>Hello,</p>
    <p>Thank you for your order. We'll send a confirmation when your item ships.</p>
    <p><strong>Order Details:</strong><br>
    Order #402-5798231-4563901<br>
    Placed on May 10, 2023</p>
    <p><strong>1x</strong> Wireless Bluetooth Headphones - $79.99<br>
    <strong>Subtotal:</strong> $79.99<br>
    <strong>Shipping:</strong> $0.00 (Prime)<br>
    <strong>Tax:</strong> $6.40<br>
    <strong>Total:</strong> $86.39</p>
    <p>Your order will be sent to:<br>
    John Doe<br>
    123 Main St<br>
    Anytown, ST 12345</p>
    <p>View or manage your order: <a href="#" style="color: #0066c0;">https://www.amazon.com/orders</a></p>`,
    hasAttachment: false,
    isPhishing: false,
    phishingIndicators: [],
  },
]

const EmailSimulation = () => {
  const navigate = useNavigate()
  const [currentEmailIndex, setCurrentEmailIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)

  const currentEmail = mockEmails[currentEmailIndex]

  const handleSelection = (isPhishing) => {
    setSelectedOption(isPhishing)
    setShowFeedback(true)

    if (isPhishing === currentEmail.isPhishing) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentEmailIndex < mockEmails.length - 1) {
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
              {score}/{mockEmails.length}
            </span>
          </div>
        </div>

        {!completed ? (
          <>
            <div className="bg-[#112240] rounded-lg border border-[#233554] shadow-lg overflow-hidden mb-6">
              {/* Email Header */}
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

              {/* Email Body */}
              <div className="p-4 sm:p-6 bg-[#1a2942] min-h-[200px] sm:min-h-[300px]">
                <div
                  className="prose prose-invert max-w-none text-sm sm:text-base"
                  dangerouslySetInnerHTML={{ __html: currentEmail.body }}
                ></div>
              </div>
            </div>

            {/* Decision Buttons */}
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

            {/* Feedback */}
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
                <p className="mb-2">This email is {currentEmail.isPhishing ? "a phishing attempt" : "legitimate"}.</p>
                {currentEmail.isPhishing && currentEmail.phishingIndicators.length > 0 && (
                  <div>
                    <p className="font-medium mb-1">Phishing indicators:</p>
                    <ul className="list-disc pl-5 text-sm">
                      {currentEmail.phishingIndicators.map((indicator, index) => (
                        <li key={index} className="mb-1">
                          {indicator}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Next Button */}
            {showFeedback && (
              <div className="flex justify-center">
                <button
                  onClick={handleNext}
                  className="px-6 sm:px-8 py-2 sm:py-3 rounded-md text-sm sm:text-base bg-[#64ffda] text-[#0a192f] font-medium hover:bg-[#4cceac] transition-colors flex items-center"
                >
                  {currentEmailIndex < mockEmails.length - 1 ? (
                    <>
                      Next Email <ChevronRight className="ml-2 h-5 w-5" />
                    </>
                  ) : (
                    "See Results"
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          // Results screen
          <div className="bg-[#112240] rounded-lg border border-[#233554] p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Simulation Complete!</h2>
            <div className="text-6xl font-bold text-[#64ffda] mb-4">
              {score}/{mockEmails.length}
            </div>
            <p className="text-xl mb-6">
              {score === mockEmails.length
                ? "Perfect score! You're a phishing detection expert."
                : score >= mockEmails.length * 0.7
                  ? "Great job! You have good phishing awareness."
                  : "You need more practice to improve your phishing detection skills."}
            </p>
            <button
              onClick={handleRestart}
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
