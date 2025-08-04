import { useState, useEffect, useRef } from 'react'
import ProgressBar from '../ProgressBar'

const PAGE_URL = window.location.origin
const DURATION_MS = 3000
const DEFAULT_INTERVAL_MS = 100

const PhotoCarousel = ({ imgUrls }) => {
  const [photoIndex, setPhotoIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPause, setIsPause] = useState(false)

  const intervalRef = useRef(null)
  const startTimeRef = useRef(null)
  const pauseElapsedRef = useRef(0)

  const nextPhoto = () => setPhotoIndex(prev => (prev + 1) % imgUrls.length)
  const prevPhoto = () => setPhotoIndex(prev => (prev < 1 ? imgUrls.length - 1 : prev - 1))
  const selectPhoto = (index) => setPhotoIndex(index)

  const clearTimer = () => {
    clearInterval(intervalRef.current)
  }

  const startProgressLoop = (startFrom = 0) => {
    const startTime = Date.now() - startFrom
    startTimeRef.current = startTime
    clearTimer()

    intervalRef.current = setInterval(() => {
      const now = Date.now()
      const elapsed = now - startTime
      const progressRatio = Math.min(elapsed / DURATION_MS, 1)
      setProgress(progressRatio.toFixed(4))

      if (elapsed >= DURATION_MS) {
        clearTimer()
        setProgress(0)
        nextPhoto()
      }
    }, DEFAULT_INTERVAL_MS)
  }

  const handlePause = () => {
    clearTimer()
    const now = Date.now()
    pauseElapsedRef.current = now - startTimeRef.current
    setIsPause(true)
  }

  const handleResume = () => {
    startProgressLoop(pauseElapsedRef.current)
    setIsPause(false)
  }

  useEffect(() => {
    setProgress(0)
    setIsPause(false)
    pauseElapsedRef.current = 0
    startProgressLoop()
    return clearTimer
  }, [photoIndex])

  if (!imgUrls || !imgUrls.length) {
    return null
  }

  return (
    <div className="mr-[10px] mt-[8px]">
      <img 
        className="w-[600px] h-[360px] object-cover shadow-sm"
        src={PAGE_URL + imgUrls[photoIndex]}
        alt=""
        loading="lazy"
      />
      {imgUrls.length > 1 && (
        <ProgressBar 
          index={photoIndex} 
          progress={progress} 
          barCount={imgUrls.length}
          selectPhoto={selectPhoto}
        />
      )}
      {/* <div className="flex gap-2 mt-2">
        <button onClick={prevPhoto}>Prev</button>
        <button onClick={nextPhoto}>Next</button>
        {!isPause ? (
          <button onClick={handlePause}>Pause</button>
        ) : (
          <button onClick={handleResume}>Resume</button>
        )}
      </div> */}
    </div>
  )
}

export default PhotoCarousel