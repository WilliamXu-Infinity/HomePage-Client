import { useState } from 'react'

const PhotoCarousel = ({ imgUrls }) => {
  const url = window.location.origin

  return (
    <div className="flex flex-wrap">
      {/* {imgUrls.map((imgUrl) => (
        <img 
          className="flex self-start max-w-[600px] object-contain mr-[30px] mb-[30px]"
          src={url + imgUrl}
          alt=""
          key={imgUrl}  // 更好用 URL 作为 key
        />
      ))} */}
    </div>
  )
}

export default PhotoCarousel