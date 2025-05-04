import { useContext } from "react"
import { ProgressContext } from "./ProgressContext"
import VideoModal from "./VideoModal"

const VideoModalWrapper = ({ selectedVideoModule, handleCloseModal }) => {
    const { progress, updateModuleProgress } = useContext(ProgressContext)
    if (!selectedVideoModule) return null
    return (
        <VideoModal
            module={selectedVideoModule}
            onClose={handleCloseModal}
            progress={progress}
            updateModuleProgress={updateModuleProgress}
        />
    )
}

export default VideoModalWrapper
