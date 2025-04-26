"use client"
import { Shield, Lock, AlertTriangle, ChevronRight, Info } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { useRef } from 'react';

const SimulationStart = () => {
  const navigate = useNavigate();
  const hasRedirected = useRef(false);

  const handleStart = () => {
    navigate("/simulation");
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a192f] to-[#112240] text-gray-100 flex items-center justify-center px-4">
      <div className="max-w-3xl w-full">
        {/* Logo and back button */}
        <div className="flex justify-between items-center mb-12">
          <button
            onClick={handleBackToHome}
            className="text-gray-400 hover:text-[#64ffda] transition-colors flex items-center text-sm"
          >
            <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
            Back to Home
          </button>
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-[#64ffda] mr-2" />
            <span className="font-bold text-lg">PhishFortress</span>
          </div>
        </div>

        {/* Main content */}
        <div className="bg-[#112240] rounded-xl border border-[#233554] shadow-2xl overflow-hidden">
          {/* Header with shield pattern */}
          <div className="relative bg-[#0a192f] p-8 border-b border-[#233554] overflow-hidden">
            {/* Shield pattern background */}
            <div className="absolute inset-0 opacity-5">
              <div className="grid grid-cols-6 gap-4">
                {Array(24)
                  .fill()
                  .map((_, i) => (
                    <Shield key={i} className="h-8 w-8 transform rotate-45" />
                  ))}
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-center">
              <div className="bg-[#233554] p-4 rounded-full mr-6">
                <Shield className="h-12 w-12 text-[#64ffda]" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Are you ready to begin your <span className="text-[#64ffda]">Phishing Simulation</span>?
                </h1>
                <p className="text-gray-400 text-lg">Sharpen your instincts. Protect your inbox. Let's do this!</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#0a192f]/50 p-5 rounded-lg border border-[#233554]">
                <div className="w-10 h-10 rounded-lg bg-[#233554] flex items-center justify-center mb-3">
                  <AlertTriangle className="h-5 w-5 text-[#64ffda]" />
                </div>
                <h3 className="font-bold mb-2">Identify Threats</h3>
                <p className="text-sm text-gray-400">
                  Learn to spot the subtle signs of phishing attempts in your inbox.
                </p>
              </div>

              <div className="bg-[#0a192f]/50 p-5 rounded-lg border border-[#233554]">
                <div className="w-10 h-10 rounded-lg bg-[#233554] flex items-center justify-center mb-3">
                  <Lock className="h-5 w-5 text-[#64ffda]" />
                </div>
                <h3 className="font-bold mb-2">Build Skills</h3>
                <p className="text-sm text-gray-400">
                  Practice makes perfect. Train your eye to detect even sophisticated attacks.
                </p>
              </div>

              <div className="bg-[#0a192f]/50 p-5 rounded-lg border border-[#233554]">
                <div className="w-10 h-10 rounded-lg bg-[#233554] flex items-center justify-center mb-3">
                  <Shield className="h-5 w-5 text-[#64ffda]" />
                </div>
                <h3 className="font-bold mb-2">Stay Protected</h3>
                <p className="text-sm text-gray-400">Become your own best defense against email-based cyber attacks.</p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-400 mb-6 max-w-xl mx-auto">
                You'll be presented with a series of emails. Your task is to identify which ones are legitimate and
                which are phishing attempts. Ready to test your skills?
              </p>

              <button
                onClick={handleStart}
                className="px-8 py-4 rounded-md bg-[#64ffda] text-[#0a192f] font-bold text-lg hover:bg-[#4cceac] transition-colors flex items-center mx-auto"
              >
                Start Simulation
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>

              <a
                href="#"
                className="inline-flex items-center text-sm text-gray-400 hover:text-[#64ffda] transition-colors mt-4"
              >
                <Info className="h-4 w-4 mr-1" />
                Learn more about phishing
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-[#0a192f] p-4 border-t border-[#233554] text-center">
            <div className="flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-[#64ffda] mr-2 animate-pulse"></div>
              <span className="text-xs text-gray-400">
                This is a simulation. No real emails will be sent or received.
              </span>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#64ffda]/5 blur-3xl -z-10"></div>
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-[#233554]/20 blur-3xl -z-10"></div>
      </div>
    </div>
  )
}

export default SimulationStart
