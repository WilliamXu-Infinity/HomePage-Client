import React, { useState } from "react"
import EditPage from "./EditPage"
import TablePage from "./TablePage"

const VisaCheck = () => {
    const [isEdit, setIsEdit] = useState(false)

	return (
		<>
            {
                isEdit ?
                <EditPage /> :
                <TablePage /> 
            }
        </>
	)
}

export default VisaCheck
