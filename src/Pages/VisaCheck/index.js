import React, { useState, useEffect } from "react"
import EditPage from "./EditPage"
import TablePage from "./TablePage"
import axios from "axios"
import { API_URL } from '../Utils/constants'

const VisaCheck = () => {
	const [isEdit, setIsEdit] = useState(false)
	const [tableData, setTableData] = useState([])

	useEffect(() => {
        if (isEdit) return
		const fetchData = async () => {
			try {
				const response = await axios.get(API_URL + "/users")
				const data = await response.data
				setTableData(data)
			} catch (error) {
				console.log("\x1b[31m%s\x1b[0m", `WX - Error: ${error}`)
			}
		}

		fetchData()
	}, [isEdit])

	return <>{isEdit ? <EditPage setIsEdit={setIsEdit}/> : <TablePage tableData={tableData} setIsEdit={setIsEdit}/>}</>
}

export default VisaCheck
