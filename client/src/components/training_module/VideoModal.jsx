import YouTube from "react-youtube"
import { useEffect, useRef } from "react"

const VideoModal = ({
    module,
    onClose,
    progress,
    updateModuleProgress,
}) => {
    const playerRef = useRef(null)
    const intervalRef = useRef(null)

    // Get saved currentTime for this module
    const savedTime = progress?.modules?.[module.id]?.currentTime || 0

    // Extract YouTube video ID from the embed URL
    const videoId = module.videoUrl.split("/embed/")[1]?.split("?")[0]

    // When the player is ready, seek to the saved time
    const onPlayerReady = (event) => {
        playerRef.current = event.target
        if (savedTime > 0) {
            event.target.seekTo(savedTime, true)
        }
    }

    // Track progress as the video plays
    const onPlayerStateChange = (event) => {
        if (event.data === 1) { // playing
            intervalRef.current = setInterval(() => {
                const currentTime = playerRef.current.getCurrentTime()
                const duration = playerRef.current.getDuration()
                const percent = Math.round((currentTime / duration) * 100)
                updateModuleProgress(module.id, percent, currentTime)
            }, 1000)
        } else {
            clearInterval(intervalRef.current)
        }
    }

    // Clean up interval on unmount
    useEffect(() => {
        return () => clearInterval(intervalRef.current)
    }, [])

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
            <div className="bg-[#112240] p-4 rounded-lg relative max-w-2xl w-full">
                <button
                    className="absolute top-2 right-2 text-white text-xl"
                    onClick={onClose}
                    aria-label="Close"
                >
                    &times;
                </button>
                <h2 className="text-lg font-bold mb-4">{module.title}</h2>
                <YouTube
                    videoId={videoId}
                    opts={{ width: "100%", height: "400" }}
                    onReady={onPlayerReady}
                    onStateChange={onPlayerStateChange}
                />
            </div>
        </div>
    )
}

export default VideoModal
