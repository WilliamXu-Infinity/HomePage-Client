import React, { useState, useEffect } from "react"
import EditPage from "./EditPage"
import TablePage from "./TablePage"
import axios from "axios"

const VisaCheck = () => {
	const [isEdit, setIsEdit] = useState(false)
	const [tableData, setTableData] = useState([])

	useEffect(() => {
        if (isEdit) return
		const fetchData = async () => {
			try {
				const response = await axios.get("https://william-xu-home-page-c5cbdc316c00.herokuapp.com/getlist")
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
