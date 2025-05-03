"use client"
import { useProgress } from "./ProgressContext"
import { Clock, CheckCircle, Play } from "lucide-react"

const RecentActivity = ({ trainingModules }) => {
  const { progress, startModule } = useProgress()

  // Get recently completed modules
  const recentlyCompleted = Object.entries(progress.modules)
    .filter(([_, data]) => data.completed)
    .sort((a, b) => new Date(b[1].lastAccessed) - new Date(a[1].lastAccessed))
    .slice(0, 3)
    .map(([id]) => {
      return Object.values(trainingModules)
        .flat()
        .find((module) => module.id === id)
    })
    .filter(Boolean)

  // Get modules in progress
  const inProgress = Object.entries(progress.modules)
    .filter(([_, data]) => data.started && !data.completed)
    .sort((a, b) => new Date(b[1].lastAccessed) - new Date(a[1].lastAccessed))
    .slice(0, 3)
    .map(([id]) => {
      const module = Object.values(trainingModules)
        .flat()
        .find((module) => module.id === id)
      if (module) {
        return {
          ...module,
          progress: progress.modules[id].percentComplete,
        }
      }
      return null
    })
    .filter(Boolean)

  const handleContinueModule = (moduleId) => {
    startModule(moduleId)
    // In a real app, this would navigate to the module content page
    alert(`Continuing module: ${moduleId}`)
  }

  if (recentlyCompleted.length === 0 && inProgress.length === 0) {
    return null
  }

  return (
    <div className="bg-[#112240] border border-[#233554] rounded-lg p-6 mb-8">
      <h2 className="text-lg font-bold mb-4 flex items-center">
        <Clock className="h-5 w-5 text-[#64ffda] mr-2" />
        Recent Activity
      </h2>

      {inProgress.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3 text-gray-300">Continue Learning</h3>
          <div className="space-y-3">
            {inProgress.map((module) => (
              <div key={module.id} className="bg-[#0a192f] rounded-lg p-3 flex items-center">
                <div className="w-12 h-12 bg-[#233554] rounded flex items-center justify-center mr-3 text-[#64ffda] flex-shrink-0">
                  {module.type === "video" ? (
                    <Play className="h-5 w-5" />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
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
                <div className="flex-grow mr-4">
                  <h4 className="text-sm font-medium">{module.title}</h4>
                  <div className="flex items-center mt-2">
                    <div className="h-1.5 bg-[#233554] rounded-full overflow-hidden flex-grow mr-2">
                      <div className="h-full bg-[#64ffda] rounded-full" style={{ width: `${module.progress}%` }}></div>
                    </div>
                    <span className="text-xs text-gray-400">{module.progress}%</span>
                  </div>
                </div>
                <button
                  onClick={() => handleContinueModule(module.id)}
                  className="px-3 py-1.5 bg-[#233554] hover:bg-[#2c4269] text-xs rounded-md text-white transition-colors flex-shrink-0"
                >
                  Continue
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {recentlyCompleted.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-3 text-gray-300">Recently Completed</h3>
          <div className="space-y-3">
            {recentlyCompleted.map((module) => (
              <div key={module.id} className="bg-[#0a192f] rounded-lg p-3 flex items-center">
                <div className="w-10 h-10 bg-green-600 rounded flex items-center justify-center mr-3 flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">{module.title}</h4>
                  <p className="text-xs text-gray-400 mt-1">
                    {module.type === "video" ? module.duration : module.readTime} • {module.level}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default RecentActivity
