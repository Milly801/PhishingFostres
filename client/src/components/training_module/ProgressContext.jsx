"use client"

import { createContext, useState, useEffect, useContext } from "react"
import PropTypes from "prop-types"

// Create context
const ProgressContext = createContext()

// Initial progress structure
const initialProgress = {
  modules: {}, // Will store progress for each module by ID
  overallCompletion: 0,
  lastAccessed: null,
  levelProgress: {
    beginner: { completed: 0, total: 0 },
    intermediate: { completed: 0, total: 0 },
    advanced: { completed: 0, total: 0 },
  },
}

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(() => {
    // Try to load from localStorage on initial render
    const savedProgress = localStorage.getItem("phishingFortressProgress")
    return savedProgress ? JSON.parse(savedProgress) : initialProgress
  })

  // Save to localStorage whenever progress changes
  useEffect(() => {
    localStorage.setItem("phishingFortressProgress", JSON.stringify(progress))
  }, [progress])

  // Initialize module tracking based on available modules
  const initializeModules = (modules) => {
    const newProgress = { ...progress }
    let beginnerCount = 0
    let intermediateCount = 0
    let advancedCount = 0

    // Count modules by level
    Object.values(modules)
      .flat()
      .forEach((module) => {
        // If module doesn't exist in progress, add it with initial state
        if (!newProgress.modules[module.id]) {
          newProgress.modules[module.id] = {
            started: false,
            completed: false,
            percentComplete: 0,
            lastAccessed: null,
          }
        }

        // Count modules by level
        if (module.level.toLowerCase() === "beginner") beginnerCount++
        else if (module.level.toLowerCase() === "intermediate") intermediateCount++
        else if (module.level.toLowerCase() === "advanced") advancedCount++
      })

    // Update level totals
    newProgress.levelProgress.beginner.total = beginnerCount
    newProgress.levelProgress.intermediate.total = intermediateCount
    newProgress.levelProgress.advanced.total = advancedCount

    setProgress(newProgress)
    calculateOverallProgress(newProgress)
  }

  // Calculate overall progress
  const calculateOverallProgress = (currentProgress = progress) => {
    const modules = Object.values(currentProgress.modules)
    if (modules.length === 0) return

    const completedModules = modules.filter((module) => module.completed).length
    const newOverallCompletion = Math.round((completedModules / modules.length) * 100) / 100

    // Count completed modules by level
    const beginnerCompleted = Object.entries(currentProgress.modules).filter(([id, module]) => {
      const allModules = Object.values(trainingModules).flat()
      const moduleData = allModules.find((m) => m.id === id)
      return moduleData?.level.toLowerCase() === "beginner" && module.completed
    }).length

    const intermediateCompleted = Object.entries(currentProgress.modules).filter(([id, module]) => {
      const allModules = Object.values(trainingModules).flat()
      const moduleData = allModules.find((m) => m.id === id)
      return moduleData?.level.toLowerCase() === "intermediate" && module.completed
    }).length

    const advancedCompleted = Object.entries(currentProgress.modules).filter(([id, module]) => {
      const allModules = Object.values(trainingModules).flat()
      const moduleData = allModules.find((m) => m.id === id)
      return moduleData?.level.toLowerCase() === "advanced" && module.completed
    }).length

    setProgress((prev) => ({
      ...prev,
      overallCompletion: newOverallCompletion,
      levelProgress: {
        beginner: {
          ...prev.levelProgress.beginner,
          completed: beginnerCompleted,
        },
        intermediate: {
          ...prev.levelProgress.intermediate,
          completed: intermediateCompleted,
        },
        advanced: {
          ...prev.levelProgress.advanced,
          completed: advancedCompleted,
        },
      },
    }))
  }

  // Start a module
  const startModule = (moduleId) => {
    setProgress((prev) => {
      const updatedModules = {
        ...prev.modules,
        [moduleId]: {
          ...prev.modules[moduleId],
          started: true,
          lastAccessed: new Date().toISOString(),
        },
      }

      return {
        ...prev,
        modules: updatedModules,
        lastAccessed: new Date().toISOString(),
      }
    })
  }

  // Update module progress
  const updateModuleProgress = (moduleId, percentComplete, currentTime = 0) => {
    setProgress((prev) => {
      const updatedModules = {
        ...prev.modules,
        [moduleId]: {
          ...prev.modules[moduleId],
          started: true,
          percentComplete: Math.min(100, Math.max(0, percentComplete)),
          lastAccessed: new Date().toISOString(),
          completed: percentComplete >= 100,
          currentTime,
        },
      }

      return {
        ...prev,
        modules: updatedModules,
        lastAccessed: new Date().toISOString(),
      }
    })

    // Recalculate overall progress
    calculateOverallProgress()
  }

  // Complete a module
  const completeModule = (moduleId) => {
    setProgress((prev) => {
      const updatedModules = {
        ...prev.modules,
        [moduleId]: {
          ...prev.modules[moduleId],
          started: true,
          completed: true,
          percentComplete: 100,
          lastAccessed: new Date().toISOString(),
        },
      }

      return {
        ...prev,
        modules: updatedModules,
        lastAccessed: new Date().toISOString(),
      }
    })

    // Recalculate overall progress
    calculateOverallProgress()
  }

  // Reset progress for a module
  const resetModuleProgress = (moduleId) => {
    setProgress((prev) => {
      const updatedModules = {
        ...prev.modules,
        [moduleId]: {
          started: false,
          completed: false,
          percentComplete: 0,
          lastAccessed: null,
        },
      }

      return {
        ...prev,
        modules: updatedModules,
        lastAccessed: new Date().toISOString(),
      }
    })

    // Recalculate overall progress
    calculateOverallProgress()
  }

  // Reset all progress
  const resetAllProgress = () => {
    setProgress(initialProgress)
  }

  // Get recently accessed modules
  const getRecentModules = (limit = 3) => {
    const moduleEntries = Object.entries(progress.modules)
      .filter(([_, data]) => data.lastAccessed)
      .sort((a, b) => new Date(b[1].lastAccessed) - new Date(a[1].lastAccessed))
      .slice(0, limit)

    return moduleEntries.map(([id]) => id)
  }

  return (
    <ProgressContext.Provider
      value={{
        progress,
        initializeModules,
        startModule,
        updateModuleProgress,
        completeModule,
        resetModuleProgress,
        resetAllProgress,
        getRecentModules,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

ProgressProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

// Custom hook to use the progress context
export const useProgress = () => {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider")
  }
  return context
}

// Mock training module data for the context
// This is a duplicate of the data in TrainingSection.jsx
// In a real app, this would be fetched from an API or centralized store
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

export { ProgressContext }
