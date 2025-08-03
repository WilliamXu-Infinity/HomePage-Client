import { useState, useEffect, useRef } from 'react'
import ProgressBar from '../ProgressBar'

const PAGE_URL = window.location.origin
const DURATION_MS = 3000
const DEFAULT_INTERVAL_MS = 100

const PhotoCarousel = ({ imgUrls }) => {
  const [photoIndex, setPhotoIndex] = useState(0)
  const [remainTime, setRemainTime] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPause, setIsPause] = useState(false)
  const timerRef = new useRef(null)
  const intervalRef = new useRef(null)

  const nextPhoto = () => setPhotoIndex((prev) => (prev + 1) % imgUrls.length)
  const prevPhoto = () => setPhotoIndex(prev => (prev < 1) ? imgUrls.length - 1 : prev - 1)

  const clearTimer = () => {
    clearTimeout(timerRef.current)
    clearInterval(intervalRef.current)
  }

  const startTimer = (duretion) => {
    timerRef.current = setTimeout(() => {
      nextPhoto()
    }, duretion)
  }

  const startInterval = (duretion) => {
    setRemainTime(duretion)
    intervalRef.current = setInterval(() => {
      setRemainTime(prev => {
        if (prev - 100 > 0) {
          const nextProgress = (1 - (prev - 100) / duretion)
          setProgress(Math.min(nextProgress, 0.98).toFixed(4))
          return prev - 100
        } else {
          setProgress(0)
          return 0
        }
      })
    }, DEFAULT_INTERVAL_MS)
  }

  useEffect(() => {
    setIsPause(false)
    setProgress(0)
    startTimer(DURATION_MS)
    startInterval(DURATION_MS)
    return clearTimer
  }, [photoIndex])

  const handlePrevClick = () => prevPhoto()

  const handleNextClick = () => nextPhoto()

  const handlePause = () => {
    clearTimer()
    setIsPause(true)
  }

  const handleResume = () => {
    startTimer(remainTime)
    setIsPause(false)
  }

  if (!imgUrls || !imgUrls.length) {
    return null
  }

  return (
    <>
      <div className="mr-[10px] mt-[8px] w-[2500px]">
        <img 
          className="w-full max-w-[2500px] h-[360px] object-cover shadow-sm"
          src={PAGE_URL + imgUrls[photoIndex]}
          alt=""
          loading="lazy"
        />
        <ProgressBar index={photoIndex} progress={progress} barCount={imgUrls.length}/>
      </div>
    </>
  )
}

export default PhotoCarousel