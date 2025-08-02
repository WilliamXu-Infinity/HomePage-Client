import React from "react"
import "./index.sass"

const SectionHeader = ({ title, logoList }) => {
	return (
		<div className="headerContent">
			<p className="headerText">{title}</p>
			{logoList && (
				<>
					<div className="vLine"></div>
					<div className="logoList">
						{logoList &&
							logoList.map((logo, index) => {
								return (
									<img
                    key={index}
										className="logoImg"
										src={logo}
										alt='logos'
									/>
								)
							})}
					</div>
				</>
			)}
		</div>
	)
}

export default SectionHeader
