import { memo, useMemo } from 'react'

const ProgressBar = memo(({ index, progress, barCount, selectPhoto }) => {
  const bars = useMemo(() => {
    return new Array(barCount).fill({})
  }, [barCount])

  return (
<div className="flex flex-1 gap-[10px] mt-2">
  {bars.map((_, key) => {
    const isActive = index >= key
    const isCurrent = index === key
    return (
      <div className="flex-1 group bg-gray-200 transition-all duration-200 ease-in h-[6px] hover:scale-y-150 cursor-pointer" 
        key={key}
        onClick={() => selectPhoto(key)}
      >
        {isCurrent ? (
          <div 
            className={`
              bg-[#FFA409]
              flex rounded-r-md
              transition-all duration-200 ease-in-out
              h-full
            `}
            style={{ width: `${progress * 100}%` }}
          ></div>
        ) : (
          <div 
            className={`
              ${isActive ? "bg-[#FFA409]" : ""}
              flex
              h-full
            `}
          ></div>
        )}
      </div>
    )
  })}
</div>
  )
})

export default ProgressBar