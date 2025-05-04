"use client"

import { useState, useEffect, useContext } from "react"
import { Shield, Video, FileText, Award, ArrowLeft, Search } from "lucide-react"
import { ProgressProvider, ProgressContext } from "./ProgressContext"
import ModuleCard from "./ModuleCard"
import ProgressDashboard from "./ProgressDashboard"
import RecentActivity from "./RecentActivity"
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { UserInfoBar } from './UserInfoBar'
import VideoModal from "./VideoModal"
import trainingModules from "./TrainingModules"
import VideoModalWrapper from "./VideoModalWrapper"

const TrainingSection = ({ onBackToHome }) => {
  const [activeTab, setActiveTab] = useState("video")
  const { isLoading } = useAuth0()

  // NEW: State for video modal
  const [selectedVideoModule, setSelectedVideoModule] = useState(null)

  const navigate = useNavigate()
  const { logout } = useAuth0()


  // Handler for clicking a module
  const handleModuleClick = (module) => {
    if (module.type === "video" && module.videoUrl) {
      setSelectedVideoModule(module)
    }
    // You can add logic for text modules if needed
  }

  // Handler to close the modal
  const handleCloseModal = () => setSelectedVideoModule(null)

  return (
    <ProgressProvider>
      <TrainingSectionContent
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onBackToHome={onBackToHome}
        onModuleClick={handleModuleClick} // Pass handler from parent!
        trainingModules={trainingModules} // Pass the modules object
      />
      <div className="my-12 flex flex-col items-center justify-center bg-gradient-to-r from-[#112240] to-[#0a192f] rounded-lg border border-[#233554] p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Ready to Test Your Skills?
        </h2>
        <p className="text-gray-400 mb-6 text-center max-w-xl">
          You've completed the training modules. Now, put your knowledge to the test in our interactive simulation and see how well you can spot phishing attempts!
        </p>
        <button
          onClick={() => navigate('/simulation/start')}
          className="px-8 py-4 rounded-lg bg-[#64ffda] text-[#0a192f] font-bold text-lg shadow-md hover:bg-[#4cceac] transition-colors flex items-center group"
        >
          Proceed to Simulation
          <Shield className="ml-3 h-6 w-6 text-[#0a192f] group-hover:text-[#233554] transition-colors" />
        </button>
      </div>
      {/* Render the modal here, inside the provider but outside the content */}
      <VideoModalWrapper selectedVideoModule={selectedVideoModule} handleCloseModal={handleCloseModal} />
    </ProgressProvider>
  )
}

// Separate component to use the progress context
const TrainingSectionContent = ({
  activeTab,
  setActiveTab,
  onBackToHome,
  onModuleClick,
  trainingModules, // Now passed in
}) => {
  const { initializeModules } = useContext(ProgressContext)

  // Initialize module tracking
  useEffect(() => {
    initializeModules(trainingModules)
    // eslint-disable-next-line
  }, []) // empty dependency array

  const navigate = useNavigate()

  // Get popular modules for featured section
  const popularModules = [
    ...trainingModules.video.filter((module) => module.popular),
    ...trainingModules.text.filter((module) => module.popular),
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a192f] to-[#112240] text-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <button
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-[#64ffda] transition-colors flex items-center text-sm px-3 py-2 rounded-md border border-[#233554] bg-[#0a192f] hover:bg-[#112240]"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </button>
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-[#64ffda]" />
            <h1 className="text-lg md:text-xl font-bold">
              Security <span className="text-[#64ffda]">Training</span>
            </h1>
          </div>
          <UserInfoBar onSignOut={() => logout({ returnTo: window.location.origin })} />
        </div>

        {/* Progress Dashboard */}
        <ProgressDashboard trainingModules={trainingModules} />

        {/* Recent Activity */}
        <RecentActivity trainingModules={trainingModules} />

        {/* Featured Modules */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <Award className="h-5 w-5 text-[#64ffda] mr-2" />
            Featured Training
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularModules.map((module) => (
              <ModuleCard key={module.id} module={module} size="small" onClick={() => onModuleClick(module)} />
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex border-b border-[#233554]">
            <button
              className={`px-6 py-3 font-medium text-sm flex items-center ${activeTab === "video"
                ? "text-[#64ffda] border-b-2 border-[#64ffda]"
                : "text-gray-400 hover:text-gray-300"
                }`}
              onClick={() => setActiveTab("video")}
            >
              <Video className="h-4 w-4 mr-2" />
              Video Lessons
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm flex items-center ${activeTab === "text"
                ? "text-[#64ffda] border-b-2 border-[#64ffda]"
                : "text-gray-400 hover:text-gray-300"
                }`}
              onClick={() => setActiveTab("text")}
            >
              <FileText className="h-4 w-4 mr-2" />
              Text Guides
            </button>
          </div>
        </div>

        {/* Module Grid */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingModules[activeTab].map((module) => (
              <ModuleCard key={module.id} module={module} onClick={() => onModuleClick(module)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrainingSection
