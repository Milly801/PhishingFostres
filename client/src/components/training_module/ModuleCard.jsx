"use client"
import PropTypes from "prop-types"
import { Play, Clock, ChevronRight, CheckCircle, Pause, BookOpen } from "lucide-react"
import { useProgress } from "./ProgressContext"

// Icons for text-based modules
const moduleIcons = {
  mail: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  alert: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  ),
  shield: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  ),
  lock: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  search: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  ),
}

const ModuleCard = ({ module, size = "large", onClick }) => {
  const { progress, startModule } = useProgress()
  const moduleProgress = progress.modules[module.id] || {
    started: false,
    completed: false,
    percentComplete: 0,
  }

  // Add a function to format the progress percentage
  const formatProgress = (progress) => {
    return Math.round(progress);
  };

  const handleStartModule = (e) => {
    e.stopPropagation();
    startModule(module.id);
    onClick && onClick(module);
  }

  const handleResumeModule = (e) => {
    e.stopPropagation();
    startModule(module.id);
    onClick && onClick(module);
  }

  return (
    <div
      className={`bg-[#112240] border border-[#233554] rounded-lg overflow-hidden hover:border-[#64ffda] transition-all duration-300 transform hover:-translate-y-1 group relative ${moduleProgress.completed ? "border-green-500 border-opacity-50" : ""
        } cursor-pointer`}
      onClick={onClick ? () => onClick(module) : undefined}
      tabIndex={0}
      role="button"
      aria-label={`Open module: ${module.title}`}
    >
      {/* Completion Badge */}
      {moduleProgress.completed && (
        <div className="absolute top-2 right-2 z-10 bg-green-500 rounded-full p-1">
          <CheckCircle className="h-5 w-5 text-white" />
        </div>
      )}

      {/* Progress Bar */}
      {moduleProgress.started && !moduleProgress.completed && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#233554] z-10">
          <div className="h-full bg-[#64ffda]" style={{ width: `${moduleProgress.percentComplete}%` }}></div>
        </div>
      )}

      {/* Thumbnail Section - Now for both video and text modules */}
      <div className={`relative ${size === "large" ? "h-48" : "h-36"}`}>
        {module.thumbnail ? (
          <>
            <img
              src={module.thumbnail}
              alt={module.title}
              className="w-full h-full object-cover bg-[#0a192f]"
            />
            {/* Play/Read button overlay */}
            <button
              className="absolute inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-30 rounded-md text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={e => {
                e.stopPropagation()
                onClick && onClick()
              }}
              aria-label={`Open ${module.type === "video" ? "video" : "guide"}: ${module.title}`}
              type="button"
            >
              <span className="w-14 h-14 rounded-full bg-[#64ffda]/90 flex items-center justify-center">
                {moduleProgress.started && !moduleProgress.completed ? (
                  <Pause className="h-7 w-7 text-[#0a192f]" />
                ) : module.type === "video" ? (
                  <Play className="h-7 w-7 text-[#0a192f] ml-1" />
                ) : (
                  <BookOpen className="h-7 w-7 text-[#0a192f]" />
                )}
              </span>
            </button>
          </>
        ) : (
          <div className="w-full h-full bg-[#0a192f] flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#233554] flex items-center justify-center text-[#64ffda]">
              {moduleIcons[module.icon]}
            </div>
          </div>
        )}
        <div className="absolute bottom-2 right-2 bg-[#0a192f]/80 text-xs px-2 py-1 rounded flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {module.type === "video" ? module.duration : module.readTime}
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold">{module.title}</h3>
          <span className="bg-[#233554] text-xs px-2 py-1 rounded-full text-[#64ffda]">{module.level}</span>
        </div>
        <p className="text-gray-400 text-sm mb-5">{module.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">{module.type === "video" ? module.duration : module.readTime}</span>
          {module.type === "video" ? (
            <button
              className={`px-4 py-2 text-sm rounded-md transition-colors flex items-center ${moduleProgress.completed
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-[#233554] hover:bg-[#2c4269] text-white"
                }`}
              onClick={e => {
                e.stopPropagation()
                onClick && onClick(module)
              }}
              type="button"
            >
              {moduleProgress.completed
                ? "Review Again"
                : moduleProgress.started
                  ? `Resume (${formatProgress(moduleProgress.percentComplete)}%)`
                  : "Watch Video"}
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          ) : (
            <button
              onClick={moduleProgress.started && !moduleProgress.completed ? handleResumeModule : handleStartModule}
              className={`px-4 py-2 text-sm rounded-md transition-colors flex items-center ${moduleProgress.completed
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-[#233554] hover:bg-[#2c4269] text-white"
                }`}
              type="button"
            >
              {moduleProgress.completed
                ? "Review Again"
                : moduleProgress.started
                  ? `Resume (${formatProgress(moduleProgress.percentComplete)}%)`
                  : "Read Guide"}
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

ModuleCard.propTypes = {
  module: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    duration: PropTypes.string,
    readTime: PropTypes.string,
    thumbnail: PropTypes.string,
    icon: PropTypes.string,
  }).isRequired,
  size: PropTypes.oneOf(["small", "large"]),
  onClick: PropTypes.func,
}

export default ModuleCard
