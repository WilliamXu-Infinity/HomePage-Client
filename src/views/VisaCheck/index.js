import React from "react"
import JsonData from "./data.json"
import MenuBar from "./MenuBar"
import TableContent from "./TableContent"

const VisaCheck = () => {
	console.log("\x1b[31m%s\x1b[0m", "WX - check - 0")
	return (
		<div>
			{/* <MenuBar /> */}
			<TableContent />
		</div>
	)
}

export default VisaCheck
