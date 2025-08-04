import { memo, useMemo } from 'react'

const ProgressBar = memo(({index, progress, barCount}) => {
  const bars = useMemo(() => {
    return new Array(barCount).fill({})
  }, [barCount])

  return (
    <div className="flex flex-1 gap-[10px] mt-1">
      {bars.map((_, key) => {
        return (
          <div className="flex-1 bg-gray-200" key={key}>
            {index === key ?
             <div 
              className={`
                bg-[#FFA409]
                flex h-[5px]
                rounded-r-md
                transition-[width] duration-100 ease
              `}
              style={{ 
                width: `${progress * 100}%`,
              }}
            ></div> : 
            <div 
              className={`
                ${index >= key ? "bg-[#FFA409]" : ""}
                flex
                h-[5px]
              `}
            ></div>}
          </div>
        )
      })}
    </div>
  )
})

export default ProgressBar