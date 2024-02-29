import React from "react"
import Table from "react-bootstrap/Table"
import jsonData from "../data.json"

const TableContent = () => {
	const data = jsonData

	return (
		<div>
			<Table striped bordered hover responsive>
				<thead>
					<tr>
						<th>Name</th>
						<th>Check Date</th>
						<th>Clear Date</th>
						<th>Location</th>
						<th>Degree</th>
						<th>Note</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item) => {
						const {
							email,
							name,
							checkDate,
							location,
							status,
							clearDate,
							degree,
						} = item
						return (
							<tr key={email}>
								<td>{name}</td>
								<td>{checkDate}</td>
								<td>{clearDate}</td>
								<td>{location}</td>
								<td>{degree}</td>
							</tr>
						)
					})}
				</tbody>
			</Table>
		</div>
	)
}

export default TableContent
