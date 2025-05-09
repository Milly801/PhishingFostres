"use client"
import { useProgress } from "./ProgressContext"
import { Award, BookOpen, BarChart, Clock, RefreshCw } from "lucide-react"

const ProgressDashboard = ({ trainingModules }) => {
  const { progress, resetAllProgress } = useProgress()

  // Add formatProgress function
  const formatProgress = (progress) => {
    return Math.round(progress);
  };

  // Calculate total modules
  const totalModules = Object.values(trainingModules).flat().length

  // Calculate completed modules
  const completedModules = Object.values(progress.modules).filter((module) => module.completed).length

  // Calculate completion percentage
  const completionPercentage = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0

  // Get level progress
  const { beginner, intermediate, advanced } = progress.levelProgress

  // Get modules in progress
  const modulesInProgress = Object.entries(progress.modules).filter(
    ([_, data]) => data.started && !data.completed,
  ).length

  // Handle reset progress with confirmation
  const handleResetProgress = () => {
    if (window.confirm("Are you sure you want to reset all your progress? This cannot be undone.")) {
      resetAllProgress()
    }
  }

  return (
    <div className="bg-[#0a192f] border border-[#233554] rounded-lg p-6 mb-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-xl font-bold mb-2 md:mb-0 flex items-center">
          <Award className="h-5 w-5 text-[#64ffda] mr-2" />
          Your Training Progress
        </h2>
        <button
          onClick={handleResetProgress}
          className="text-xs flex items-center text-gray-400 hover:text-[#64ffda] transition-colors"
        >
          <RefreshCw className="h-3 w-3 mr-1" />
          Reset Progress
        </button>
      </div>

      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span>Overall Completion</span>
          <span className="text-[#64ffda]">{formatProgress(completionPercentage)}%</span>
        </div>
        <div className="h-2 bg-[#233554] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#64ffda] rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-400">
          <span>
            {completedModules} of {totalModules} modules completed
          </span>
          <span>{modulesInProgress} in progress</span>
        </div>
      </div>

      {/* Level Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#112240] p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm flex items-center">
              <BookOpen className="h-3 w-3 mr-1 text-[#64ffda]" />
              Beginner
            </span>
            <span className="text-xs text-[#64ffda]">
              {beginner.completed}/{beginner.total} completed
            </span>
          </div>
          <div className="h-1.5 bg-[#233554] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#64ffda] rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${beginner.total > 0 ? (beginner.completed / beginner.total) * 100 : 0}%` }}
            ></div>
          </div>
        </div>
        <div className="bg-[#112240] p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm flex items-center">
              <BarChart className="h-3 w-3 mr-1 text-[#64ffda]" />
              Intermediate
            </span>
            <span className="text-xs text-[#64ffda]">
              {intermediate.completed}/{intermediate.total} completed
            </span>
          </div>
          <div className="h-1.5 bg-[#233554] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#64ffda] rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${intermediate.total > 0 ? (intermediate.completed / intermediate.total) * 100 : 0}%` }}
            ></div>
          </div>
        </div>
        <div className="bg-[#112240] p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm flex items-center">
              <Award className="h-3 w-3 mr-1 text-[#64ffda]" />
              Advanced
            </span>
            <span className="text-xs text-[#64ffda]">
              {advanced.completed}/{advanced.total} completed
            </span>
          </div>
          <div className="h-1.5 bg-[#233554] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#64ffda] rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${advanced.total > 0 ? (advanced.completed / advanced.total) * 100 : 0}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Recently Accessed */}
      {Object.values(progress.modules).some((module) => module.lastAccessed) && (
        <div className="mt-6 pt-6 border-t border-[#233554]">
          <h3 className="text-sm font-medium mb-3 flex items-center">
            <Clock className="h-4 w-4 mr-1 text-[#64ffda]" />
            Recently Accessed
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {Object.entries(progress.modules)
              .filter(([_, data]) => data.lastAccessed)
              .sort((a, b) => new Date(b[1].lastAccessed) - new Date(a[1].lastAccessed))
              .slice(0, 3)
              .map(([id]) => {
                // Find the module data
                const moduleData = Object.values(trainingModules)
                  .flat()
                  .find((module) => module.id === id)

                if (!moduleData) return null

                return (
                  <div key={id} className="bg-[#0a192f] p-3 rounded border border-[#233554] flex items-center">
                    <div className="w-8 h-8 rounded bg-[#233554] flex items-center justify-center mr-3 text-[#64ffda]">
                      {moduleData.type === "video" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                      )}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-medium truncate">{moduleData.title}</p>
                      <div className="flex items-center mt-1">
                        <div className="h-1 bg-[#233554] rounded-full overflow-hidden flex-grow mr-2">
                          <div
                            className="h-full bg-[#64ffda] rounded-full"
                            style={{ width: `${progress.modules[id].percentComplete}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400">{formatProgress(progress.modules[id].percentComplete)}%</span>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProgressDashboard
