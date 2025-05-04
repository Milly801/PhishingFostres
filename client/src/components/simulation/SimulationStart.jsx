"use client"
import { Shield, Lock, AlertTriangle, ChevronRight, Info, LogOut, ChevronDown, User } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { useRef, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserInfoBar } from '../training_module/UserInfoBar';


const SimulationStart = () => {

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useAuth0();
  const navigate = useNavigate();
  const hasRedirected = useRef(false);

  const handleStart = () => {
    navigate("/simulation");
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a192f] to-[#112240] text-gray-100 flex items-center justify-center px-4 overflow-x-hidden">
      <div className="max-w-3xl w-full relative">
        {/* Replace the user info bar with this new modern version */}
        <UserInfoBar />
        {/* Reduce PhishFortress logo size */}
        <div className="flex items-center mb-6 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-[#64ffda] mr-1.5 transition-transform duration-300 group-hover:rotate-12" />
            <span className="font-bold text-sm sm:text-base group-hover:text-[#64ffda] transition-colors duration-300">
              PhishFortress
            </span>
          </motion.div>
        </div>

        {/* Add glow effect and better shadow to make it pop */}
        <div className="bg-[#112240] rounded-xl border border-[#233554] shadow-[0_0_25px_rgba(100,255,218,0.1)] hover:shadow-[0_0_35px_rgba(100,255,218,0.15)] transition-all duration-300 overflow-hidden">
          {/* Header - More compact on mobile */}
          <div className="relative bg-[#0a192f] p-4 sm:p-8 border-b border-[#233554] overflow-hidden">
            <div className="relative z-10 flex flex-col sm:flex-row items-center text-center sm:text-left">
              <div className="bg-[#233554] p-3 sm:p-4 rounded-full mb-4 sm:mb-0 sm:mr-6">
                <Shield className="h-8 w-8 sm:h-12 sm:w-12 text-[#64ffda]" />
              </div>
              <div>
                <h1 className="text-xl sm:text-3xl md:text-4xl font-bold mb-2">
                  Ready to begin your <span className="text-[#64ffda]">Simulation</span>?
                </h1>
                <p className="text-gray-400 text-sm sm:text-base">Sharpen your instincts. Protect your inbox.</p>
              </div>
            </div>
          </div>

          {/* Content - Hide feature boxes on mobile */}
          <div className="p-4 sm:p-8">
            {/* Feature boxes - Hidden on mobile */}
            <div className="hidden sm:grid md:grid-cols-3 gap-6 mb-8">
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
              <p className="text-gray-400 mb-6 text-sm sm:text-base max-w-xl mx-auto">
                You'll be presented with a series of emails. Your task is to identify which ones are legitimate and
                which are phishing attempts.
              </p>

              {/* CTA Button - Moved up on mobile */}
              <button
                onClick={handleStart}
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-md bg-[#64ffda] text-[#0a192f] font-bold text-base sm:text-lg hover:bg-[#4cceac] transition-colors flex items-center mx-auto"
              >
                Start Simulation
                <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              <a
                href="#"
                className="inline-flex items-center text-xs sm:text-sm text-gray-400 hover:text-[#64ffda] transition-colors mt-3 sm:mt-4"
              >
                <Info className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                Learn more about phishing
              </a>
            </div>
          </div>

          {/* Footer - Smaller on mobile */}
          <div className="bg-[#0a192f] p-3 sm:p-4 border-t border-[#233554] text-center">
            <div className="flex items-center justify-center">
              <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#64ffda] mr-2 animate-pulse"></div>
              <span className="text-[10px] sm:text-xs text-gray-400">
                This is a simulation. No real emails will be sent or received.
              </span>
            </div>
          </div>
        </div>

        {/* Update decorative elements to prevent overflow */}
        <div className="fixed -bottom-32 -right-32 h-64 w-64 rounded-full bg-[#64ffda]/5 blur-3xl -z-10 pointer-events-none"></div>
        <div className="fixed -top-32 -left-32 h-64 w-64 rounded-full bg-[#233554]/20 blur-3xl -z-10 pointer-events-none"></div>
      </div>
    </div>
  )
}

export default SimulationStart
