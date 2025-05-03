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

// Mock training module data
const trainingModules = {
  video: [
    {
      id: "v1",
      title: "Identifying Suspicious Email Headers",
      description: "Learn how to analyze email headers to spot phishing attempts before opening them.",
      duration: "12 min",
      level: "Beginner",
      thumbnail: "https://placehold.co/400x225/112240/64ffda?text=Email+Headers",
      type: "video",
      popular: true,
    },
    {
      id: "v2",
      title: "Spotting Fake URLs and Domains",
      description: "Master the techniques to identify malicious URLs and lookalike domains.",
      duration: "15 min",
      level: "Intermediate",
      thumbnail: "https://placehold.co/400x225/112240/64ffda?text=Fake+URLs",
      type: "video",
      popular: true,
    },
    {
      id: "v3",
      title: "Social Engineering Tactics Explained",
      description: "Understand the psychological tricks attackers use to manipulate victims.",
      duration: "18 min",
      level: "Intermediate",
      thumbnail: "https://placehold.co/400x225/112240/64ffda?text=Social+Engineering",
      type: "video",
      popular: false,
    },
    {
      id: "v4",
      title: "Protecting Your Digital Identity",
      description: "Essential practices to safeguard your personal information online.",
      duration: "20 min",
      level: "Advanced",
      thumbnail: "https://placehold.co/400x225/112240/64ffda?text=Digital+Identity",
      type: "video",
      popular: false,
    },
    {
      id: "v5",
      title: "Advanced Email Security Features",
      description: "Learn how to leverage built-in security features in modern email clients.",
      duration: "14 min",
      level: "Advanced",
      thumbnail: "https://placehold.co/400x225/112240/64ffda?text=Email+Security",
      type: "video",
      popular: false,
    },
  ],
  text: [
    {
      id: "t1",
      title: "The Anatomy of a Phishing Email",
      description: "A comprehensive breakdown of common elements found in phishing attempts.",
      readTime: "5 min read",
      level: "Beginner",
      icon: "mail",
      type: "text",
      popular: true,
    },
    {
      id: "t2",
      title: "Red Flags in Business Email Compromise",
      description: "Learn to identify suspicious requests from seemingly legitimate business contacts.",
      readTime: "8 min read",
      level: "Intermediate",
      icon: "alert",
      type: "text",
      popular: true,
    },
    {
      id: "t3",
      title: "Phishing Response Protocol",
      description: "Step-by-step guide on what to do when you encounter a suspected phishing attempt.",
      readTime: "6 min read",
      level: "Beginner",
      icon: "shield",
      type: "text",
      popular: false,
    },
    {
      id: "t4",
      title: "Secure Password Management",
      description: "Best practices for creating and managing strong, unique passwords.",
      readTime: "7 min read",
      level: "Beginner",
      icon: "lock",
      type: "text",
      popular: false,
    },
    {
      id: "t5",
      title: "Advanced Threat Analysis",
      description: "Technical deep-dive into analyzing suspicious emails and attachments.",
      readTime: "12 min read",
      level: "Advanced",
      icon: "search",
      type: "text",
      popular: false,
    },
  ],
}

const TrainingSection = ({ onBackToHome }) => {
  const [activeTab, setActiveTab] = useState("video")
  const { isLoading } = useAuth0()
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredModules, setFilteredModules] = useState({
    video: trainingModules.video,
    text: trainingModules.text,
  })

  // Filter modules based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredModules({
        video: trainingModules.video,
        text: trainingModules.text,
      })
      return
    }

    const query = searchQuery.toLowerCase()
    setFilteredModules({
      video: trainingModules.video.filter(
        (module) => module.title.toLowerCase().includes(query) || module.description.toLowerCase().includes(query),
      ),
      text: trainingModules.text.filter(
        (module) => module.title.toLowerCase().includes(query) || module.description.toLowerCase().includes(query),
      ),
    })
  }, [searchQuery])

  // Get popular modules for featured section
  const popularModules = [
    ...trainingModules.video.filter((module) => module.popular),
    ...trainingModules.text.filter((module) => module.popular),
  ]

  const navigate = useNavigate()
  const { logout } = useAuth0()

  return (
    <ProgressProvider>
      <TrainingSectionContent
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredModules={filteredModules}
        popularModules={popularModules}
        onBackToHome={onBackToHome}
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
    </ProgressProvider>
  )
}

// Separate component to use the progress context
const TrainingSectionContent = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  filteredModules,
  popularModules,
  onBackToHome,
}) => {
  const { initializeModules } = useContext(ProgressContext)

  // Initialize module tracking
  useEffect(() => {
    initializeModules(trainingModules)
    // eslint-disable-next-line
  }, []) // empty dependency array

  const navigate = useNavigate()

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
              <ModuleCard key={module.id} module={module} size="small" />
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
          {filteredModules[activeTab].length === 0 ? (
            <div className="text-center py-12">
              <div className="text-[#64ffda] mb-4">
                <Search className="h-12 w-12 mx-auto opacity-50" />
              </div>
              <h3 className="text-xl font-bold mb-2">No modules found</h3>
              <p className="text-gray-400">Try adjusting your search or browse our other training categories.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModules[activeTab].map((module) => (
                <ModuleCard key={module.id} module={module} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TrainingSection
