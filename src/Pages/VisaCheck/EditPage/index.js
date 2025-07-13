import React, { useReducer } from "react"
import axios from "axios"
import "./index.sass"
import { API_URL } from "../../Utils/constants"

const initialState = {
	name: "",
	email: "",
	checkDate: "",
	visaType: "",
	visaEntry: "",
	location: "",
	major: "",
	status: "",
	clearDate: "",
	degree: "",
	Note: "",
}

const reducer = (state, action) => {
	switch (action.type) {
		case "UPDATE_INPUT":
			return { ...state, [action.field]: action.value }
		case "RESET_DATA":
			return initialState
		default:
			return state
	}
}

const EditPage = ({ setIsEdit }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	const handleSubmit = async () => {
		// e.preventDefault()
		try {
			const response = await axios.post(API_URL + "/add-user", state)
			dispatch({ type: "RESET_DATA" })
			setIsEdit(false)
		} catch (error) {
		}
	}

	const handleInputChange = (field, value) => {
		dispatch({ type: "UPDATE_INPUT", field, value })
	}

	return (
		<div className="content">
			<h2>Create your case</h2>
			<div className="input-content">
				{Object.entries(state).map(([field, value]) => (
					<div className="input-row" key={field}>
						<p className="input-text">{field}:</p>{" "}
						<input
							className="input-box"
							type="text"
							value={value}
							onChange={(e) =>
								handleInputChange(field, e.target.value)
							}
						/>
					</div>
				))}
			</div>
			<button className="submit-button" onClick={() => handleSubmit()}>
				Submit
			</button>
		</div>
	)
}

export default EditPage
