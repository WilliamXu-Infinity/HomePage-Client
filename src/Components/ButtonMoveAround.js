import React, { useState, useEffect } from "react"

const ButtonMoveAround = (avoidClick) => {
	const [moveToLeft, setMoveToLeft] = useState(true)
    const [buttonStyle, setButtonStyle] = useState({ transform: "translateX(0)" })

	const handleMouseEnter = () => {
        if (!avoidClick) return
        if (moveToLeft) {
            setMoveToLeft(false)
            setButtonStyle({ transform: "translateX(100px)" })
        } else {
            setMoveToLeft(true)
            setButtonStyle({ transform: "translateX(-100px)" })
        }
        
	}

	useEffect(() => {
        if (!avoidClick) {
            setButtonStyle({ transform: "translateX(0px)" })
        }
    }, avoidClick)

	return (
		<div>
			<button
				className="button"
				style={buttonStyle}
				onMouseOver={() => {
					handleMouseEnter()
				}}
			>
				Submit
			</button>
		</div>
	)
}

export default ButtonMoveAround
