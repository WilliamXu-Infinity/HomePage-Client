import React, { useState } from "react"

const ToolsPage = () => {
	const [inputValue, setInputValue] = useState()
	const [jsonData, setJsonData] = useState()

	const handleApiCall = async () => {
		try {
			const response = await fetch("/api/translateDocToJson")
			const responseData = await response.json()
			setJsonData(responseData)
		} catch (error) {
			console.error("API调用错误：", error)
		}
	}

	const handleInputChange = (event) => {
		setInputValue(event.target.value)
	}

	return (
		<div className="P_ToolsPage">
			<div className="container-fluid">
				<div className="input-group pt-3 pb-3">
					<input
						type="text"
						className="form-control"
						placeholder="Recipient's username"
						aria-label="Recipient's username"
						aria-describedby="button-addon2"
						onChange={handleInputChange}
					/>
					<button
						className="btn btn-outline-success"
						type="button"
						id="button-addon2"
						onClick={() => handleApiCall()}
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	)
}

export default ToolsPage
