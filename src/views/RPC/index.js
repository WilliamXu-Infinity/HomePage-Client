import React from "react"
import { Newspaper, App, Scissors } from "react-bootstrap-icons"
import "./RPC.scss"
import useCustomHooks from './useCustomHooks'
import MenuBar from "./MenuBar"

const RPC = () => {
    const { iconStyle, positions, contentRef, clickStart, scores } = useCustomHooks()

	return (
		<div className="container-fluid" id="rpc">
			<div className="row">
				<div className="col-md-2 menu">
					<button className="start-button" onClick={() => clickStart()}>Start</button>
                    <p>{`Rock: ${scores[0]} | Paper: ${scores[1]} | Scissor: ${scores[2]}`}</p>
				</div>
				<div className="col-md-10 p-0 play-ground" ref={contentRef}>
					{positions.map((position) => {
						if (position.type === "r")
							return (
								<App
									key={position.id}
									style={iconStyle(position)}
								/>
							)
						if (position.type === "p")
							return (
								<Newspaper
									key={position.id}
									style={iconStyle(position)}
								/>
							)
						if (position.type === "c")
							return (
								<Scissors
									key={position.id}
									style={iconStyle(position)}
								/>
							)
					})}
				</div>
			</div>
		</div>
	)
}

export default RPC
